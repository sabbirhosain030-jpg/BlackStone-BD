import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");
        const isNew = searchParams.get("new");
        const hotOffer = searchParams.get("hotOffer");

        const query: any = {};
        if (category) query.category = category;
        if (featured === "true") query.isFeatured = true;
        if (isNew === "true") query.isNew = true;
        if (hotOffer === "true") query.isHotOffer = true;

        const db = await connectToDatabase();
        const products = await db.collection("products")
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error("API Products Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log('📝 POST /api/products - Starting product creation');
        const db = await connectToDatabase();
        const product = await request.json();

        console.log('📦 Product data received:', JSON.stringify(product, null, 2));

        // Generate a string ID if not provided
        if (!product.id) {
            product.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        }

        const result = await db.collection("products").insertOne({
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('✅ Product created successfully with ID:', result.insertedId);
        return NextResponse.json({
            ...product,
            _id: result.insertedId,
            id: product.id
        }, { status: 201 });
    } catch (error: any) {
        console.error('❌ POST /api/products Error:', error);
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json({
            error: "Failed to create product",
            details: error.message
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        console.log('✏️ PUT /api/products - Starting product update');
        const db = await connectToDatabase();
        const { id, _id, ...updateData } = await request.json();

        console.log('📦 Update data received - ID:', id, 'Data:', JSON.stringify(updateData, null, 2));

        if (!id) {
            console.error('❌ No ID provided for update');
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        // Update using the string 'id' field
        const result = await db.collection("products").updateOne(
            { id: id },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        console.log('✅ Update result:', result.matchedCount, 'matched,', result.modifiedCount, 'modified');

        if (result.matchedCount === 0) {
            console.warn('⚠️ No product found with id:', id);
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Product updated successfully",
            modified: result.modifiedCount > 0
        });
    } catch (error: any) {
        console.error('❌ PUT /api/products Error:', error);
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json({
            error: "Failed to update product",
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        console.log('🗑️ DELETE /api/products - Starting product deletion');
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        console.log('📦 Delete request for ID:', id);

        if (!id) {
            console.error('❌ No ID provided for delete');
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const result = await db.collection("products").deleteOne({ id: id });

        console.log('✅ Delete result:', result.deletedCount, 'deleted');

        if (result.deletedCount === 0) {
            console.warn('⚠️ No product found to delete with id:', id);
        }

        return NextResponse.json({
            message: "Product deleted",
            deleted: result.deletedCount > 0
        });
    } catch (error: any) {
        console.error('❌ DELETE /api/products Error:', error);
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json({
            error: "Failed to delete product",
            details: error.message
        }, { status: 500 });
    }
}
