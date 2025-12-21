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
