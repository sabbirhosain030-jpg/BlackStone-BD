# MongoDB Schema Documentation

## Database: `blackstonebd`

This document describes the MongoDB collections and their schema for the BlackStone BD e-commerce application.

---

## Collections Overview

| Collection | Purpose | Documents (Approx) |
|------------|---------|-------------------|
| `products` | Product catalog | 50-500 |
| `categories` | Product categories | 10-30 |
| `orders` | Customer orders | Growing |
| `hot_offers` | Promotional offers | 5-20 |
| `settings` | Site configuration | 1 |

---

## Collection Schemas

### 1. **products**

Stores all product information for the e-commerce catalog.

```javascript
{
  _id: ObjectId("..."),           // MongoDB auto-generated ID
  id: "1",                         // String ID for compatibility
  name: "Premium Wireless Headphones",
  description: "High-quality wireless headphones with noise cancellation...",
  price: 5999,                     // Current selling price (in BDT)
  originalPrice: 7999,             // Original price (optional, for discounts)
  category: "Electronics",         // Category name (string reference)
  images: [
    "https://images.unsplash.com/photo-1505740420928.jpg",
    "https://images.unsplash.com/photo-1234567890123.jpg"
  ],
  stock: 45,                       // Available quantity
  rating: 4.5,                     // Average rating (0-5)
  reviews: 128,                    // Number of reviews
  isNew: true,                     // Is it a new product?
  isFeatured: false,               // Featured on homepage?
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-12-10T08:45:00Z")
}
```

**Indexes:**
- `{ id: 1 }` - Unique index on string ID
- `{ category: 1 }` - For category filtering
- `{ price: 1 }` - For price range queries
- `{ isFeatured: 1 }` - For featured products
- `{ createdAt: -1 }` - For sorting by newest

---

### 2. **categories**

Stores product category information.

```javascript
{
  _id: ObjectId("..."),
  id: "cat-1",
  name: "Electronics",
  slug: "electronics",              // URL-friendly name
  description: "Latest electronic gadgets and accessories",
  image: "https://images.unsplash.com/category-electronics.jpg",
  productCount: 45,                 // Number of products in this category
  isFeatured: true,                 // Show on homepage?
  isHot: false,                     // Show in Hot filter? (New)
  parentCategory: null,             // Parent category ID (New)
  subCategories: ["sub-1", "sub-2"], // IDs of subcategories (New)
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-12-10T08:45:00Z")
}
```

**Indexes:**
- `{ id: 1 }` - Unique index on string ID
- `{ slug: 1 }` - Unique index for URL routing
- `{ name: 1 }` - For category search
- `{ parentCategory: 1 }` - For fetching subcategories
- `{ isHot: 1 }` - For hot category filtering

---

### 3. **orders**

Stores customer orders with full order details.

```javascript
{
  _id: ObjectId("..."),
  id: "ORD-1702345678",              // Order ID (timestamp-based)
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+8801712345678",
  customerAddress: "123 Main Street, Dhaka 1212",
  deliveryLocation: "inside",        // "inside" or "outside" Dhaka
  deliveryCharge: 60,                // Delivery fee in BDT
  items: [
    {
      productId: "1",
      name: "Premium Wireless Headphones",
      price: 5999,
      quantity: 2,
      image: "https://images.unsplash.com/..."
    },
    {
      productId: "5",
      name: "Smart Watch",
      price: 3499,
      quantity: 1,
      image: "https://images.unsplash.com/..."
    }
  ],
  subtotal: 15497,                   // Sum of (price * quantity)
  total: 15557,                      // subtotal + deliveryCharge
  status: "pending",                 // pending | processing | shipped | delivered | cancelled
  paymentMethod: "cod",              // Cash on Delivery
  createdAt: ISODate("2024-12-10T12:30:45Z"),
  updatedAt: ISODate("2024-12-10T12:30:45Z")
}
```

**Indexes:**
- `{ id: 1 }` - Unique index on order ID
- `{ customerEmail: 1 }` - For customer order history
- `{ status: 1 }` - For filtering by status
- `{ createdAt: -1 }` - For sorting by date
- `{ customerPhone: 1 }` - For phone lookup

---

### 4. **hot_offers**

Stores promotional banners and special offers.

```javascript
{
  _id: ObjectId("..."),
  id: "offer-1",
  title: "Winter Sale - Up to 50% Off",
  description: "Get amazing discounts on all winter collection items",
  image: "https://images.unsplash.com/winter-sale.jpg",
  discount: "50%",                   // Discount text (display only)
  startDate: "2024-12-01",           // Start date (YYYY-MM-DD)
  endDate: "2024-12-31",             // End date (YYYY-MM-DD)
  isActive: true,                    // Is offer currently active?
  link: "/products?category=winter", // Optional link to products
  createdAt: ISODate("2024-11-25T00:00:00Z"),
  updatedAt: ISODate("2024-12-10T08:45:00Z")
}
```

**Indexes:**
- `{ id: 1 }` - Unique index
- `{ isActive: 1 }` - For filtering active offers
- `{ startDate: 1, endDate: 1 }` - For date range queries

---

### 5. **settings**

Stores site-wide configuration (only one document).

```javascript
{
  _id: ObjectId("..."),
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
  updatedAt: ISODate("2024-12-10T08:45:00Z")
}
```

**Note:** This collection should only have one document. Upsert operations update the same document.

---

## Data Relationships

### Product ↔ Category
- **Type:** Reference (denormalized)
- **Implementation:** `product.category` stores category name as string
- **Rationale:** Faster reads, acceptable for small category list

### Order ↔ Product
- **Type:** Embedded
- **Implementation:** Order documents embed product details in `items` array
- **Rationale:** Order captures product state at purchase time, independent of future product changes

### Order ↔ Customer
- **Type:** Embedded
- **Implementation:** Customer details embedded in each order
- **Rationale:** Simple COD ordering without user accounts (for now)

---

## Sample Data Counts

**Development/Staging:**
- Products: ~20-50
- Categories: ~10
- Orders: ~10-100
- Hot Offers: ~5
- Settings: 1

**Production (Expected):**
- Products: 500-5000
- Categories: 10-30
- Orders: Growing (10,000+)
- Hot Offers: 5-20
- Settings: 1

---

## MongoDB Atlas Configuration

### Cluster Tier
- **Development:** M0 (Free tier - 512MB)
- **Production:** M2 or higher (Shared tier - 2GB+)

### Region
- **Recommended:** Singapore (ap-southeast-1) - closest to Bangladesh
- **Alternative:** Mumbai (ap-south-1)

### Connection String Format
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/blackstonebd?retryWrites=true&w=majority
```

---

## Backup Strategy

### Automated Backups (M2+)
- Daily snapshots
- 7-day retention
- Point-in-time recovery

### Manual Backups (M0 Free Tier)
- Use `mongoexport` for collection backups
- Schedule weekly exports
- Store in cloud storage (Google Drive, Dropbox)

```bash
# Export all collections
mongoexport --uri="mongodb+srv://..." --collection=products --out=products.json
mongoexport --uri="mongodb+srv://..." --collection=categories --out=categories.json
mongoexport --uri="mongodb+srv://..." --collection=orders --out=orders.json
```

---

## Performance Optimization

### Indexes
All recommended indexes are listed in each collection section above.

### Query Optimization
- Use projection to limit returned fields
- Implement pagination for large result sets
- Cache frequently accessed data (categories, settings)

### Connection Pooling
```javascript
// lib/mongodb.ts handles connection pooling
// Reuses connections across Vercel serverless function invocations
```

---

## Security Best Practices

1. **Network Access**
   - Whitelist Vercel IP ranges
   - Enable "Allow access from anywhere"  (0.0.0.0/0) for serverless

2. **Database Users**
   - Create separate user for application
   - Grant minimal required permissions (readWrite on blackstonebd database)
   - Use strong passwords

3. **Connection String**
   - Store in environment variables (never commit to Git)
   - Use Vercel Environment Variables for production

4. **Data Validation**
   - Validate input on API routes
   - Sanitize user inputs to prevent injection

---

## Migration Notes

### From localStorage/Context to MongoDB
1. Export existing data from browser (if any)
2. Format as JSON matching schema above
3. Run seed script to import into MongoDB
4. Deploy updated application
5. Verify data appears correctly

### Future Enhancements
- Add `users` collection for customer accounts
- Add `reviews` collection for product reviews
- Add `analytics` collection for tracking
- Implement full-text search with Atlas Search

---

## Monitoring

### MongoDB Atlas Dashboard
- Monitor query performance
- Track slow queries
- View connection metrics
- Set up alerts for issues

### Vercel Logs
- Monitor API route execution time
- Track database connection errors
- Debug failed requests

---

## Support Resources

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **MongoDB Node.js Driver:** https://mongodb.github.io/node-mongodb-native/
- **Vercel MongoDB Integration:** https://vercel.com/docs/storage/vercel-mongodb
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
