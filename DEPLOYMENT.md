# 🚀 Deployment Guide - BlackStone BD

This guide will walk you through deploying your BlackStone BD e-commerce platform to Git and Vercel.

## 📋 Prerequisites

Before you begin, make sure you have:
- [x] Node.js installed (v18 or higher)
- [x] Git installed
- [ ] GitHub or GitLab account
- [ ] Vercel account (free tier is sufficient)

---

## 🔧 Step 1: Prepare Your Local Environment

### 1.1 Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local
```

### 1.2 Configure Environment Variables

Open `.env.local` and update these critical values:

```env
# Update with your production URL (will be provided by Vercel)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# IMPORTANT: Change default admin credentials
NEXT_PUBLIC_ADMIN_USERNAME=your_secure_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

# Update company information
NEXT_PUBLIC_COMPANY_NAME=Your Company Name
NEXT_PUBLIC_COMPANY_EMAIL=your@email.com
NEXT_PUBLIC_COMPANY_PHONE=your-phone-number
NEXT_PUBLIC_COMPANY_ADDRESS=Your Address
```

### 1.3 Test Locally

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` and verify everything works.

### 1.4 Build for Production

```bash
# Test production build
npm run build
npm start
```

Ensure there are no build errors.

---

## 📦 Step 2: Set Up Git Repository

### 2.1 Initialize Git (if not already done)

```bash
# Check if git is already initialized
git status

# If not initialized, run:
git init
```

### 2.2 Review Files to Commit

```bash
# Check what files will be committed
git status

# Review that .env files are NOT listed (should be in .gitignore)
```

### 2.3 Create Initial Commit

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: BlackStone BD e-commerce platform"
```

---

## 🌐 Step 3: Push to GitHub

### 3.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Repository name: `BlackStone-BD` (or your preferred name)
4. Keep it **Public** or **Private** as you prefer
5. **DO NOT** initialize with README (you already have one)
6. Click **Create repository**

### 3.2 Link Local Repository to GitHub

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/BlackStone-BD.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3.3 Verify Upload

Visit your GitHub repository URL and verify all files are present.

---

## ☁️ Step 4: Deploy to Vercel

### 4.1 Sign Up / Log In to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **Sign Up** or **Log In**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### 4.2 Import Your Repository

1. From Vercel dashboard, click **Add New** → **Project**
2. Select your GitHub account
3. Find and import **BlackStone-BD** repository
4. Click **Import**

### 4.3 Configure Project Settings

Vercel will auto-detect Next.js. You should see:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

Leave these as default.

### 4.4 Add Environment Variables

Click **Environment Variables** section and add these one by one:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_APP_NAME` | `BlackStone BD` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` (use your Vercel URL) | Production |
| `NEXT_PUBLIC_ADMIN_USERNAME` | Your secure username | Production, Preview, Development |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Your secure password | Production, Preview, Development |
| `NEXT_PUBLIC_COMPANY_NAME` | Your company name | Production, Preview, Development |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Your email | Production, Preview, Development |
| `NEXT_PUBLIC_COMPANY_PHONE` | Your phone | Production, Preview, Development |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Your address | Production, Preview, Development |
| `NEXT_PUBLIC_DELIVERY_INSIDE_DHAKA` | `60` | Production, Preview, Development |
| `NEXT_PUBLIC_DELIVERY_OUTSIDE_DHAKA` | `120` | Production, Preview, Development |

> 💡 **Tip**: Copy values from your `.env.local` file

### 4.5 Deploy

1. Click **Deploy**
2. Wait for deployment to complete (usually 1-3 minutes)
3. Vercel will show a success screen with your deployment URL

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Your Live Site

1. Click **Visit** on the Vercel success screen
2. Your site should load at `https://your-project.vercel.app`
3. Test key features:
   - Browse products
   - Search functionality
   - Cart operations
   - Admin login (`/admin`)
   - Product management

### 5.2 Common Issues & Fixes

#### Issue: "Module not found" errors
**Solution**: Ensure all dependencies are in `package.json`, not `devDependencies` if used in runtime

#### Issue: Images not loading
**Solution**: Check `next.config.mjs` has proper `remotePatterns` configured

#### Issue: Environment variables not working
**Solution**: 
- Verify variable names start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables in Vercel dashboard

#### Issue: Build fails
**Solution**: 
- Check build logs in Vercel dashboard
- Run `npm run build` locally to reproduce the issue
- Fix TypeScript errors or missing imports

---

## 🔄 Step 6: Continuous Deployment

### 6.1 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
# Commit and push
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Provide a preview URL

### 6.2 Production vs Preview

- **Production**: Deploys from `main` branch → `your-project.vercel.app`
- **Preview**: Deploys from other branches → `your-project-branch.vercel.app`

---

## 🌍 Step 7: Custom Domain (Optional)

### 7.1 Add Your Domain

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `blackstonebd.com`)
4. Follow Vercel's DNS configuration instructions

### 7.2 Update Environment Variables

After adding custom domain:
1. Go to **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` to your custom domain
3. Redeploy the project

---

## 🔒 Security Recommendations

### Production Checklist

- [ ] Change default admin credentials
- [ ] Use strong passwords (16+ characters, mixed case, numbers, symbols)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Consider implementing proper backend authentication
- [ ] Add rate limiting for admin endpoints
- [ ] Regular security updates: `npm audit fix`
- [ ] Monitor Vercel deployment logs for unusual activity

### Future Enhancements

For production-grade deployment, consider:

1. **Database Integration**
   - Replace localStorage with MongoDB, PostgreSQL, or Supabase
   - Store products, orders, and user data securely

2. **Authentication**
   - Implement JWT or NextAuth.js
   - Add role-based access control
   - Enable 2FA for admin

3. **Payment Gateway**
   - Integrate bKash, Nagad, or SSL Commerce
   - Add payment verification webhooks

4. **Email Notifications**
   - Order confirmations
   - Admin notifications
   - Use SendGrid, Mailgun, or Resend

5. **Analytics**
   - Google Analytics
   - Facebook Pixel
   - Vercel Analytics

---

## 📞 Support & Resources

### Helpful Links

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Documentation**: [docs.github.com](https://docs.github.com)

### Troubleshooting

If you encounter issues:

1. Check Vercel deployment logs
2. Review GitHub Actions (if configured)
3. Test locally with `npm run build && npm start`
4. Check environment variables are set correctly
5. Verify all dependencies are installed

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: Vercel Discord, GitHub Discussions

---

## 🎉 Congratulations!

Your BlackStone BD e-commerce platform is now live! 

**Next Steps:**
- Share your site URL
- Test all features thoroughly
- Monitor performance in Vercel dashboard
- Plan your next features
- Scale as your business grows

**Your Deployment URLs:**
- Production: `https://your-project.vercel.app`
- Admin Panel: `https://your-project.vercel.app/admin`

---

**Made with ❤️ in Bangladesh** 🇧🇩
