import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { currentPassword, newPassword } = await request.json();

        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        console.log("🔐 Change Password Request received");

        // Connect to DB
        const db = await connectToDatabase();
        if (!db) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const usersCollection = db.collection('users');

        // Check if admin user exists in DB
        let user = await usersCollection.findOne({
            $or: [{ username: 'admin' }, { email: 'admin@blackstonebd.com' }]
        });

        // If user doesn't exist in DB (using hardcoded until now), create them!
        if (!user) {
            console.log("⚠️ Admin user not found in DB - Creating for the first time...");

            // Verify current password against HARDCODED default
            if (currentPassword !== 'BlackStone2024!') {
                return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
            }

            // Create admin user
            await usersCollection.insertOne({
                username: 'admin',
                email: 'admin@blackstonebd.com',
                password: newPassword, // Note: In production, hash this!
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log("✅ Admin user created in DB with new password");
            return NextResponse.json({ success: true, message: 'Password changed successfully' });
        }

        // If user exists, verify current password
        if (user.password !== currentPassword) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
        }

        // Update password
        await usersCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: newPassword,
                    updatedAt: new Date()
                }
            }
        );

        console.log("✅ Admin password updated in DB");
        return NextResponse.json({ success: true, message: 'Password updated successfully' });

    } catch (error: any) {
        console.error("Change Password Error:", error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}
