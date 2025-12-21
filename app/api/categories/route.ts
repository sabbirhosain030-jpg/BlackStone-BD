import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection("categories")
            .find({})
            .toArray();

        return NextResponse.json(categories);
    } catch (error) {
        console.error("API Categories Error:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
