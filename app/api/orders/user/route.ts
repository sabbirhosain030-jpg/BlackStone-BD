import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
    try {
        console.log('📋 GET /api/orders/user - Fetching user orders');
        const session = await getServerSession();

        if (!session || !session.user?.id) {
            console.error('❌ Unauthorized - No session found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = await connectToDatabase();
        const orders = await db.collection('orders')
            .find({ userId: session.user.id })
            .sort({ createdAt: -1 })
            .toArray();

        console.log('✅ Found', orders.length, 'orders for user');

        return NextResponse.json(orders.map(order => ({
            ...order,
            id: order._id.toString(),
            _id: order._id.toString()
        })));
    } catch (error: any) {
        console.error('❌ GET /api/orders/user Error:', error);
        return NextResponse.json({
            error: 'Failed to fetch orders',
            details: error.message
        }, { status: 500 });
    }
}
