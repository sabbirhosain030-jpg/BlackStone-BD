import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const { code, cartTotal, userId, email, isFirstOrder } = await request.json();
        let db;
        try {
            db = await connectToDatabase();
        } catch (dbError) {
            console.error("Coupon API DB Connection Error:", dbError);
            return NextResponse.json({ valid: false, message: "System error: Database unavailable." }, { status: 500 });
        }

        const coupon = await db.collection('coupons').findOne({ code: code, isActive: true });

        if (!coupon) {
            return NextResponse.json({ valid: false, message: "Invalid or inactive coupon code." }, { status: 404 });
        }

        const now = new Date();
        const startDate = new Date(coupon.startDate);
        const endDate = new Date(coupon.endDate);

        if (now < startDate || now > endDate) {
            return NextResponse.json({ valid: false, message: "Coupon is expired." }, { status: 400 });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return NextResponse.json({ valid: false, message: "Coupon usage limit reached." }, { status: 400 });
        }

        if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
            return NextResponse.json({ valid: false, message: `Minimum order amount is ${coupon.minOrderAmount}.` }, { status: 400 });
        }

        // First Order Logic
        if (coupon.applicableTo === 'first-order') {
            // Check if user has orders
            if (!userId && !email) {
                return NextResponse.json({ valid: false, message: "Must be logged in for this coupon." }, { status: 400 });
            }

            // If we rely on passed 'isFirstOrder' flag or check DB
            if (isFirstOrder === false) { // Explicitly false means known repeat customer
                return NextResponse.json({ valid: false, message: "This coupon is for first-time customers only." }, { status: 400 });
            }

            // In a real app, I'd query the orders collection here to verify.
        }

        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
                discountAmount = coupon.maxDiscountAmount;
            }
        } else {
            discountAmount = coupon.discountValue;
        }

        return NextResponse.json({
            valid: true,
            discountAmount,
            couponcode: code,
            message: "Coupon applied successfully!"
        });

    } catch (error) {
        console.error("Coupon validation error:", error);
        return NextResponse.json({ error: "Validation failed" }, { status: 500 });
    }
}
