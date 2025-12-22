import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const coupons = await db.collection('coupons').find({}).toArray();
        return NextResponse.json(coupons.map(c => ({
            ...c,
            id: c._id.toString()
        })));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const db = await connectToDatabase();
        const data = await request.json();

        // Basic validation
        if (!data.code || !data.discountValue) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newCoupon = {
            ...data,
            usedCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('coupons').insertOne(newCoupon);

        return NextResponse.json({ ...newCoupon, id: result.insertedId.toString() }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const db = await connectToDatabase();
        const { id, ...data } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        delete data._id; // Prevent updating _id

        await db.collection('coupons').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...data, updatedAt: new Date() } }
        );

        return NextResponse.json({ message: "Coupon updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        await db.collection('coupons').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: "Coupon deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 });
    }
}
