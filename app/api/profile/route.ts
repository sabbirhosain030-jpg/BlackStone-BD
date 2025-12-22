import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        console.log('📋 GET /api/profile - Fetching user profile');
        const session = await getServerSession();

        if (!session || !session.user?.id) {
            console.error('❌ Unauthorized - No session found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = await connectToDatabase();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(session.user.id) },
            { projection: { password: 0 } } // Exclude password
        );

        if (!user) {
            console.error('❌ User not found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('✅ Profile fetched successfully');
        return NextResponse.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            address: user.address || '',
            profileImage: user.profileImage || '',
            role: user.role,
            createdAt: user.createdAt
        });
    } catch (error: any) {
        console.error('❌ GET /api/profile Error:', error);
        return NextResponse.json({
            error: 'Failed to fetch profile',
            details: error.message
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        console.log('✏️ PUT /api/profile - Updating user profile');
        const session = await getServerSession();

        if (!session || !session.user?.id) {
            console.error('❌ Unauthorized - No session found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, phone, address, profileImage } = await request.json();
        console.log('📦 Update data:', { name, phone, address });

        const db = await connectToDatabase();
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(session.user.id) },
            {
                $set: {
                    name,
                    phone: phone || '',
                    address: address || '',
                    profileImage: profileImage || '',
                    updatedAt: new Date()
                }
            }
        );

        console.log('✅ Profile updated:', result.modifiedCount, 'modified');

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Profile updated successfully',
            modified: result.modifiedCount > 0
        });
    } catch (error: any) {
        console.error('❌ PUT /api/profile Error:', error);
        return NextResponse.json({
            error: 'Failed to update profile',
            details: error.message
        }, { status: 500 });
    }
}
