// scripts/add-demo-order.ts
import { connectToDatabase, closeDatabase } from "../lib/mongodb";

async function addDemoOrder() {
    try {
        console.log("📦 Keeping database connected...");
        const db = await connectToDatabase();
        const ordersColl = db.collection("orders");

        const demoOrder = {
            userId: "1", // Linking to admin/demo user ID if possible, otherwise just a string
            customerName: 'Demo User',
            customerEmail: 'demo@example.com',
            customerPhone: '+880 1712-345678',
            customerAddress: 'House 123, Road 12, Dhanmondi, Dhaka',
            items: [
                {
                    id: 'm1',
                    name: 'Premium Cotton Panjabi',
                    description: 'Traditional Panjabi crafted from high-quality cotton. Perfect for festive occasions.',
                    price: 3500,
                    originalPrice: 4200,
                    category: "Men's",
                    images: ['https://images.unsplash.com/photo-1632204797047-9b2742969b74?q=80&w=1000&auto=format&fit=crop'],
                    stock: 50,
                    colors: ['White', 'Navy', 'Maroon'],
                    sizes: ['M', 'L', 'XL', 'XXL'],
                    rating: 4.8,
                    reviews: 24,
                    quantity: 1,
                    selectedSize: 'L',
                    selectedColor: 'White'
                }
            ],
            total: 3560,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await ordersColl.insertOne(demoOrder);
        console.log(`✅ Demo order added with ID: ${result.insertedId}`);

    } catch (error) {
        console.error("❌ Failed to add demo order:", error);
    } finally {
        await closeDatabase();
        process.exit(0);
    }
}

addDemoOrder();
