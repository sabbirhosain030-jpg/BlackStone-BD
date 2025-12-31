
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId for correct ID handling if needed

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const db = await connectToDatabase();
        if (id) {
            const order = await db.collection('orders').findOne({ id: id });
            return NextResponse.json(order);
        }

        const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const orderData = await request.json();
        const db = await connectToDatabase();

        // Ensure ID is unique
        const orderId = orderData.id || `ORD-${Date.now()}`;

        const newOrder = {
            ...orderData,
            id: orderId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection('orders').insertOne(newOrder);

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json({
            error: 'Failed to create order',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updateData = await request.json();
        const { id, ...updates } = updateData;

        if (!id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const db = await connectToDatabase();

        // Update createdAt/updatedAt if not handled by client, but usually client sends full object or partial
        // Let's just update the fields provided
        const result = await db.collection('orders').updateOne(
            { id: id },
            { $set: { ...updates, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        console.error('Failed to update order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const db = await connectToDatabase();
        const result = await db.collection('orders').deleteOne({ id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Failed to delete order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
