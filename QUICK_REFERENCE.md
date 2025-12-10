# 📝 Quick Reference - Git & Vercel Deployment

## Git Commands

### Initial Setup
```bash
# Initialize Git repository
git init

# Check status
git status

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: BlackStone BD e-commerce platform"

# Set main branch
git branch -M main

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/BlackStone-BD.git

# Push to GitHub
git push -u origin main
```

### Regular Updates
```bash
# Check current status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your descriptive message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/old-feature

# Merge branch
git checkout main
git merge feature/new-feature
```

---

## Vercel CLI Commands (Optional)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy from Terminal
```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## Environment Setup

### Create Local Environment File
```bash
# Windows (PowerShell)
Copy-Item .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

### Edit Environment File
```bash
# Windows
notepad .env.local

# macOS
open .env.local

# Linux
nano .env.local
```

---

## NPM Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Check for updates
npm outdated

# Update dependencies
npm update
```

### Troubleshooting
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Windows version
rmdir /s /q node_modules
del package-lock.json
npm install

# Fix audit issues
npm audit fix

# Check TypeScript errors
npx tsc --noEmit
```

---

## Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Test production build: `npm run build && npm start`
- [ ] Create `.env.local` from `.env.example`
- [ ] Update admin credentials in `.env.local`
- [ ] Update company information
- [ ] Git repository initialized
- [ ] All changes committed
- [ ] Pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Environment variables configured in Vercel
- [ ] Deployment successful
- [ ] Tested live site

---

## Useful GitHub URLs

Replace `YOUR_USERNAME` and `REPO_NAME` with your values:

- **Repository**: `https://github.com/YOUR_USERNAME/REPO_NAME`
- **Clone URL**: `https://github.com/YOUR_USERNAME/REPO_NAME.git`
- **Issues**: `https://github.com/YOUR_USERNAME/REPO_NAME/issues`
- **Settings**: `https://github.com/YOUR_USERNAME/REPO_NAME/settings`

---

## Common Issues & Solutions

### 1. Git Push Rejected
```bash
# Force push (use carefully)
git push -f origin main

# Or pull first, then push
git pull origin main
git push origin main
```

### 2. Merge Conflicts
```bash
# Check conflicting files
git status

# Edit files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git commit -m "Resolved merge conflicts"
git push
```

### 3. Vercel Build Fails
- Check build logs in Vercel dashboard
- Run `npm run build` locally
- Ensure all dependencies are in `package.json`
- Check environment variables are set

### 4. Environment Variables Not Working
- Prefix client-side variables with `NEXT_PUBLIC_`
- Redeploy after adding new variables
- Check variable names match exactly

---

## Next Steps After Deployment

1. **Test Everything**
   - Browse all pages
   - Test admin panel
   - Try cart and checkout
   - Verify responsive design

2. **Monitor Performance**
   - Vercel Analytics dashboard
   - Check load times
   - Review error logs

3. **Regular Maintenance**
   - Update dependencies monthly: `npm update`
   - Security updates: `npm audit fix`
   - Backup critical data regularly

4. **Scale Your App**
   - Add database integration
   - Implement payment gateway
   - Set up email notifications
   - Add analytics tracking

---

For detailed instructions, see [DEPLOYMENT.md](file:///c:/Users/alamgir/OneDrive/Documents/BlackStone%20BD/DEPLOYMENT.md)
