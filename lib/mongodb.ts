// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI environment variable not set");
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
    if (db) return db;
    client = new MongoClient(uri!, { autoSelectFamily: false });
    await client.connect();
    // The database name can be part of the URI or provided via MONGODB_DB_NAME
    const dbName = process.env.MONGODB_DB_NAME || client.db().databaseName;
    db = client.db(dbName);
    console.log(`✅ Connected to MongoDB database: ${dbName}`);
    return db;
}

export function getDb(): Db {
    if (!db) {
        throw new Error("Database not connected. Call connectToDatabase() first.");
    }
    return db;
}

export async function closeDatabase(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log("🔌 MongoDB connection closed");
    }
}
