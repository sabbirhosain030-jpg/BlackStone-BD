# MongoDB Atlas Setup Guide

Complete guide to setting up MongoDB Atlas for your BlackStone BD e-commerce application.

---

## 📋 Prerequisites

- MongoDB Atlas account (free)
- Vercel project deployed (or ready to deploy)
- Node.js installed locally for testing

---

## Step 1: Create MongoDB Atlas Account

### 1.1 Sign Up

1. Visit [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Click **"Try Free"** or **"Start Free"**
3. Sign up with:
   - Email and password, OR
   - Google account, OR
   - GitHub account

### 1.2 Complete Organization Setup

1. Organization Name: `BlackStone BD` (or your company name)
2. Project Name: `blackstone-production`
3. Preferred Language: `JavaScript`
4. Goal: `Build a new application`

---

## Step 2: Create a New Cluster

### 2.1 Choose Cluster Tier

1. **Free Tier (M0)** - Recommended for development/staging
   - 512 MB storage
   - Shared RAM
   - Free forever
   - Perfect for testing

2. **Shared Tier (M2/M5)** - Recommended for production
   - 2GB-5GB storage
   - $9-$25/month
   - Better performance
   - Automated backups

**For now, select M0 FREE**

### 2.2 Choose Cloud Provider & Region

1. **Provider:** AWS (recommended)
2. **Region:** 
   - **Best:** Singapore (`ap-southeast-1`) - closest to Bangladesh
   - **Alternative:** Mumbai (`ap-south-1`)

### 2.3 Cluster Configuration

1. Cluster Name: `Cluster0` (or `blackstone-cluster`)
2. Click **"Create Cluster"**
3. Wait 3-5 minutes for cluster creation

---

## Step 3: Setup Database Access

### 3.1 Create Database User

1. In Atlas dashboard, click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Configure user:
   - **Authentication Method:** Password
   - **Username:** `blackstone_app`
   - **Password:** Click "Autogenerate Secure Password" and **SAVE IT**
   - **Database User Privileges:** `Read and write to any database`
4. Click **"Add User"**

**⚠️ IMPORTANT:** Save the username and password! You'll need them for the connection string.

---

## Step 4: Setup Network Access

### 4.1 Add IP Whitelist

For Vercel deployment, you need to allow access from anywhere:

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Description: `Vercel Serverless Functions`
4. Click **"Confirm"**

> **Note:** For production, you can restrict to Vercel IP ranges later for better security.

---

## Step 5: Get Connection String

### 5.1 Find Your Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js** / Version: **5.5 or later**
5. Copy the connection string:

```
mongodb+srv://blackstone_app:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5.2 Modify Connection String

Replace `<password>` with your actual database user password, and add database name:

**Before:**
```
mongodb+srv://blackstone_app:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After:**
```
mongodb+srv://blackstone_app:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/blackstonebd?retryWrites=true&w=majority
```

**Important changes:**
- Replace `<password>` with your saved password
- Add database name `blackstonebd` before the `?`

---

## Step 6: Add to Local Environment

### 6.1 Update .env.local

```bash
# Open your .env.local file
notepad .env.local
```

Add this line:
```env
MONGODB_URI=mongodb+srv://blackstone_app:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blackstonebd?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` with your database password
- `cluster0.xxxxx` with your actual cluster address

### 6.2 Update .env.example

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blackstonebd?retryWrites=true&w=majority
```

---

## Step 7: Install MongoDB Driver

```bash
cd "c:\Users\alamgir\OneDrive\Documents\BlackStone BD"
npm install mongodb
```

---

## Step 8: Test Connection Locally

### 8.1 Create Test Script

Create `test-mongodb.js`:

```javascript
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'your-connection-string-here';

async function testConnection() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('✅ Successfully connected to MongoDB Atlas!');
        
        const db = client.db('blackstonebd');
        const collections = await db.listCollections().toArray();
        console.log('📦 Collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    } finally {
        await client.close();
    }
}

testConnection();
```

### 8.2 Run Test

```bash
node test-mongodb.js
```

**Expected output:**
```
✅ Successfully connected to MongoDB Atlas!
📦 Collections: []
```

---

## Step 9: Configure Vercel

### 9.1 Add Environment Variable

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **BlackStone BD** project
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your full connection string
   - **Environments:** Check all (Production, Preview, Development)
5. Click **"Save"**

### 9.2 Redeploy

After adding the environment variable:

```bash
git add .
git commit -m "Add MongoDB configuration"
git push
```

Vercel will automatically redeploy with the new environment variable.

---

## Step 10: Seed Database

### 10.1 Create Collections

MongoDB will auto-create collections when you insert first document, but you can create them manually:

1. In Atlas dashboard, click **"Browse Collections"**
2. Click **"Create Database"**
   - Database name: `blackstonebd`
   - Collection name: `products`
3. Repeat for other collections: `categories`, `orders`, `hot_offers`, `settings`

### 10.2 Insert Sample Data (Optional)

In Atlas dashboard → **Browse Collections** → select collection → **Insert Document**

**Sample Product:**
```json
{
  "id": "1",
  "name": "Wireless Headphones",
  "description": "Premium wireless headphones with noise cancellation",
  "price": 5999,
  "originalPrice": 7999,
  "category": "Electronics",
  "images": ["https://images.unsplash.com/photo-1505740420928.jpg"],
  "stock": 50,
  "rating": 4.5,
  "reviews": 120,
  "isNew": true,
  "isFeatured": false,
  "createdAt": {"$date": "2024-12-10T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-10T00:00:00.000Z"}
}
```

---

## Troubleshooting

### Issue: "MongoServerError: bad auth"

**Solution:**
- Verify username and password in connection string
- Check that database user exists in Database Access
- Ensure password doesn't contain special characters (or URL-encode them)

### Issue: "Error: querySrv ENOTFOUND"

**Solution:**
- Check your internet connection
- Verify connection string format
- Ensure you copied the full connection string

### Issue: "MongoServerError: IP address not allowed"

**Solution:**
- Go to Network Access in Atlas
- Add your IP address or allow 0.0.0.0/0
- Wait 1-2 minutes for changes to propagate

### Issue: "Database not created"

**Solution:**
- MongoDB creates databases and collections automatically when you insert first document
- No need to manually create them
- Database name must be in connection string: `/blackstonebd?`

---

## Security Checklist

- [ ] Strong password for database user
- [ ] Connection string in `.env.local` (not in code)
- [ ] `.env.local` in `.gitignore`
- [ ] Environment variable added to Vercel
- [ ] Network access configured
- [ ] Database user has minimal required permissions

---

## Next Steps

1. ✅ MongoDB Atlas cluster created
2. ✅ Database user configured
3. ✅ Connection string obtained
4. ✅ Environment variables set
5. ⏭️ Create API routes (next phase)
6. ⏭️ Integrate with frontend
7. ⏭️ Deploy to Vercel

---

## Monitoring & Maintenance

### View Database Activity

1. Atlas Dashboard → **Metrics** tab
2. Monitor:
   - Connections
   - Operation execution time
   - Network traffic
   - Storage used

### Setup Alerts

1. Atlas Dashboard → **Alerts** (left sidebar)
2. Configure alerts for:
   - High connection count
   - Low storage space
   - Slow queries
   - High CPU usage

### Backup Your Data

For M0 (Free tier):
```bash
# Export all collections
mongoexport --uri="YOUR_CONNECTION_STRING" --collection=products --out=products.json
mongoexport --uri="YOUR_CONNECTION_STRING" --collection=orders --out=orders.json
```

For M2+ (Paid tiers):
- Automatic daily backups enabled
- 7-day retention
- Point-in-time recovery available

---

## Cost Estimates

### Free Tier (M0)
- **Cost:** $0/month
- **Storage:** 512 MB
- **Good for:** Development, staging, small projects

### Shared Tier (M2)
- **Cost:** ~$9/month
- **Storage:** 2 GB
- **Good for:** Small production apps (< 1000 orders/month)

### Dedicated Tier (M10)
- **Cost:** ~$57/month
- **Storage:** 10 GB
- **Good for:** Growing production apps (1000+ orders/month)

---

## Support Resources

- **MongoDB University:** Free courses at [university.mongodb.com](https://university.mongodb.com)
- **Documentation:** [docs.mongodb.com](https://docs.mongodb.com)
- **Community Forums:** [community.mongodb.com](https://community.mongodb.com)
- **Atlas Support:** Available in Atlas dashboard

---

**Your MongoDB Atlas is now ready!** 🎉

Next, follow the main implementation plan to create API routes and integrate with your application.
