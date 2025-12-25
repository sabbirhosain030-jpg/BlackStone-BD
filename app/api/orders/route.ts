import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

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
