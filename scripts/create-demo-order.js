// Demo Order Creation Script for Testing Invoices
// Run with: node scripts/create-demo-order.js (after compiling with ts-node or setting up Node.js)

const demoOrder = {
    orderNumber: "ORD-" + Date.now(),
    orderDate: new Date().toISOString(),
    status: "pending",
    customerInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+880 1712-345678",
        address: "123 Main Street, Apartment 4B",
        city: "Dhaka",
        district: "Dhaka",
        postalCode: "1205"
    },
    items: [
        {
            id: "prod-001",
            name: "Premium Leather Jacket",
            price: 4500,
            quantity: 1,
            images: ["https://via.placeholder.com/400"]
        },
        {
            id: "prod-002",
            name: "Classic Denim Jeans",
            price: 2200,
            quantity: 2,
            images: ["https://via.placeholder.com/400"]
        }
    ],
    subtotal: 8900,
    shipping: 100,
    discount: 0,
    total: 9000,
    paymentMethod: "cash_on_delivery",
    shippingMethod: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
};

console.log("Demo Order Data:");
console.log(JSON.stringify(demoOrder, null, 2));
console.log("\n✅ Copy the above JSON and:");
console.log("1. Go to http://localhost:3000/admin/orders");
console.log("2. Or manually insert into MongoDB 'orders' collection");
console.log("3. Then test invoice download functionality");

// If you want to directly create this order via API
// You can uncomment and run this:
/*
async function createDemoOrder() {
    const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoOrder)
    });
    
    const result = await response.json();
    console.log("Order created:", result);
}

createDemoOrder();
*/

module.exports = demoOrder;
