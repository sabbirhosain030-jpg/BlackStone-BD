// scripts/seed-database.ts
import { connectToDatabase, closeDatabase } from "../lib/mongodb.ts";
import { products } from "../lib/data.ts"; // Import products to seed

const categories = [
    {
        id: "cat-electronics",
        name: "Electronics",
        slug: "electronics",
        description: "Latest electronic gadgets and accessories",
        image: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80",
        productCount: 0,
        isFeatured: true,
        isHot: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-fashion",
        name: "Fashion",
        slug: "fashion",
        description: "Trendy fashion for men and women",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80",
        productCount: 0,
        isFeatured: true,
        isHot: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-home",
        name: "Home & Living",
        slug: "home-living",
        description: "Decor and essentials for your home",
        image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80",
        productCount: 0,
        isFeatured: false,
        isHot: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

const settings = {
    siteName: "BlackStone BD",
    contactEmail: "info@blackstonebd.com",
    contactPhone: "+880 1712-345678",
    address: "House 123, Road 12, Dhanmondi, Dhaka 1205, Bangladesh",
    currency: "BDT",
    socialLinks: {
        facebook: "https://facebook.com/blackstonebd",
        instagram: "https://instagram.com/blackstonebd",
        twitter: "https://twitter.com/blackstonebd",
        youtube: "https://youtube.com/@blackstonebd"
    },
    deliveryChargeInsideDhaka: 60,
    deliveryChargeOutsideDhaka: 120,
    updatedAt: new Date()
};

async function seed() {
    try {
        console.log("🌱 Starting database seeding...");
        const db = await connectToDatabase();

        // 1. Seed Categories
        const categoriesColl = db.collection("categories");
        for (const cat of categories) {
            await categoriesColl.updateOne(
                { id: cat.id },
                { $setOnInsert: cat },
                { upsert: true }
            );
        }
        console.log("✅ Categories seeded");

        // 2. Seed Settings
        const settingsColl = db.collection("settings");
        const existingSettings = await settingsColl.findOne({});
        if (!existingSettings) {
            await settingsColl.insertOne(settings);
            console.log("✅ Settings initialized");
        } else {
            console.log("ℹ️ Settings already exist, skipping");
        }

        // 3. Seed Products (Correcting the demo data issue)
        const productsColl = db.collection("products");
        if (products && products.length > 0) {
            let seededCount = 0;
            for (const prod of products) {
                // Ensure ID is string
                const productWithStringId = { ...prod, id: prod.id.toString() };

                const result = await productsColl.updateOne(
                    { id: productWithStringId.id },
                    { $setOnInsert: { ...productWithStringId, createdAt: new Date(), updatedAt: new Date() } },
                    { upsert: true }
                );
                if (result.upsertedCount > 0) seededCount++;
            }
            console.log(`✅ Products seeded: ${seededCount} new products added`);
        } else {
            console.warn("⚠️ No products found in lib/data to seed");
        }

        // 4. Create Indexes
        await db.collection("products").createIndex({ id: 1 }, { unique: true });
        await db.collection("products").createIndex({ category: 1 });
        await db.collection("categories").createIndex({ slug: 1 }, { unique: true });
        await db.collection("orders").createIndex({ id: 1 }, { unique: true });

        console.log("✅ Collections and indexes verified");

    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await closeDatabase();
        process.exit(0);
    }
}

seed();
