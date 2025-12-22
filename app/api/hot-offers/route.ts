import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        console.log('📋 GET /api/hot-offers - Fetching hot offers');
        const db = await connectToDatabase();
        const hotOffers = await db.collection('hotOffers').find({}).toArray();
        console.log('✅ Found', hotOffers.length, 'hot offers');
        return NextResponse.json(hotOffers.map(offer => ({
            ...offer,
            id: offer._id.toString()
        })));
    } catch (error: any) {
        console.error('❌ GET /api/hot-offers Error:', error);
        return NextResponse.json({ error: "Failed to fetch hot offers", details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log('📝 POST /api/hot-offers - Creating hot offer');
        const db = await connectToDatabase();
        const data = await request.json();
        console.log('📦 Hot offer data:', JSON.stringify(data, null, 2));

        const newOffer = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('hotOffers').insertOne(newOffer);
        console.log('✅ Hot offer created with ID:', result.insertedId);

        return NextResponse.json({ ...newOffer, _id: result.insertedId, id: result.insertedId.toString() }, { status: 201 });
    } catch (error: any) {
        console.error('❌ POST /api/hot-offers Error:', error);
        return NextResponse.json({ error: "Failed to create hot offer", details: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        console.log('✏️ PUT /api/hot-offers - Updating hot offer');
        const db = await connectToDatabase();
        const { id, _id, ...data } = await request.json();
        console.log('📦 Update data - ID:', id, 'Data:', JSON.stringify(data, null, 2));

        if (!id) {
            console.error('❌ No ID provided');
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const result = await db.collection('hotOffers').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...data, updatedAt: new Date() } }
        );

        console.log('✅ Update result:', result.matchedCount, 'matched,', result.modifiedCount, 'modified');

        if (result.matchedCount === 0) {
            console.warn('⚠️ No hot offer found with id:', id);
            return NextResponse.json({ error: "Hot offer not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Hot offer updated successfully", modified: result.modifiedCount > 0 });
    } catch (error: any) {
        console.error('❌ PUT /api/hot-offers Error:', error);
        return NextResponse.json({ error: "Failed to update hot offer", details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        console.log('🗑️ DELETE /api/hot-offers - Deleting hot offer');
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        console.log('📦 Delete request for ID:', id);

        if (!id) {
            console.error('❌ No ID provided');
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const result = await db.collection('hotOffers').deleteOne({ _id: new ObjectId(id) });
        console.log('✅ Delete result:', result.deletedCount, 'deleted');

        if (result.deletedCount === 0) {
            console.warn('⚠️ No hot offer found to delete');
        }

        return NextResponse.json({ message: "Hot offer deleted", deleted: result.deletedCount > 0 });
    } catch (error: any) {
        console.error('❌ DELETE /api/hot-offers Error:', error);
        return NextResponse.json({ error: "Failed to delete hot offer", details: error.message }, { status: 500 });
    }
}
