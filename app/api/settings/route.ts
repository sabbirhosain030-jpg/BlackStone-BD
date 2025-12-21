import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const settings = await db.collection("settings").findOne({});

        if (!settings) {
            return NextResponse.json({ error: "Settings not found" }, { status: 404 });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("API Settings Error:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}
