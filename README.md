# BlackStone BD 🛒

A modern, feature-rich e-commerce platform built with Next.js 14, React, TypeScript, and Tailwind CSS. BlackStone BD provides a complete COD (Cash on Delivery) based online shopping experience with advanced admin controls and a premium UI/UX.

## ✨ Features

### Customer Features
- **Modern Product Catalog**: Browse products with beautiful animations and smooth transitions
- **Advanced Search**: Real-time search with category filtering
- **Smart Filtering**: Filter by price range and product categories
- **Shopping Cart**: Persistent cart with local storage
- **Easy Checkout**: Simple COD-based ordering system
- **Delivery Options**: Inside/Outside Dhaka delivery zones
- **Hot Offers**: Special promotional products with discounts
- **Responsive Design**: Works seamlessly on all devices

### Admin Panel Features
- **Secure Authentication**: Protected admin dashboard
- **Product Management**: Add, edit, delete products with image support
- **Category Management**: Organize products into categories
- **Hot Offers Management**: Create and manage promotional offers
- **Order Management**: View, track, and manage customer orders
- **Customer Management**: View customer details and order history
- **Invoice Generation**: Download printable invoices for orders
- **Company Settings**: Configure business information and delivery charges
- **Statistics Dashboard**: Real-time business metrics and analytics

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + html2canvas
- **State Management**: React Context API
- **Storage**: LocalStorage (for cart and products)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BlackStone-BD.git
   cd BlackStone-BD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and update the values as needed.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/BlackStone-BD.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your `BlackStone-BD` repository
   - Configure environment variables (copy from `.env.local`)
   - Click "Deploy"

3. **Environment Variables on Vercel**
   Add these in your Vercel project settings:
   - `NEXT_PUBLIC_APP_NAME`
   - `NEXT_PUBLIC_APP_URL` (use your Vercel URL)
   - `NEXT_PUBLIC_ADMIN_USERNAME`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Other variables from `.env.example`

## 📁 Project Structure

```
BlackStone-BD/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin panel pages
│   ├── about/               # About page
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── products/            # Product pages
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   ├── AnimatedSection.tsx # Animated wrapper
│   ├── Navbar.tsx          # Navigation
│   └── ...                 # Other components
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Admin authentication
│   └── CartContext.tsx     # Shopping cart state
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🔐 Admin Access

Default admin credentials (change after first login):
- **Username**: admin
- **Password**: admin (update in environment variables)

Access admin panel at: `/admin`

## 🛠️ Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Update Company Information
Edit the environment variables in `.env.local`:
- Company name, email, phone, address
- Delivery charges for different zones
- Application branding

### Modify Theme Colors
Edit `tailwind.config.ts` to customize the color scheme and design tokens.

### Add New Features
The codebase is modular and follows Next.js best practices:
1. Add new pages in the `app/` directory
2. Create reusable components in `components/`
3. Use context providers for global state
4. Follow TypeScript type safety

## 📱 Features in Detail

### Shopping Experience
- **Product Variations**: Support for different sizes, colors
- **Previous Price Display**: Show discounts with strikethrough pricing
- **Real-time Cart Updates**: Instant feedback on cart changes
- **Order Tracking**: Customers can view their order status

### Admin Controls
- **Bulk Operations**: Manage multiple products/orders
- **Rich Text Descriptions**: Detailed product descriptions
- **Image Management**: Upload and manage product images
- **Analytics Dashboard**: Track sales, orders, and inventory

## 🔄 Data Persistence

- **Product Data**: Stored in localStorage (can be migrated to database)
- **Cart Data**: Persisted across sessions using localStorage
- **Order Data**: Stored locally (ready for backend integration)

## 🚧 Future Enhancements

- [ ] Backend API integration (Node.js/Express or Firebase)
- [ ] Payment gateway integration (bKash, Nagad, SSL Commerce)
- [ ] Email notifications for orders
- [ ] SMS notifications
- [ ] Advanced analytics and reporting
- [ ] Multi-vendor support
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Image optimization with CDN

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**BlackStone BD Team**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

## 📞 Support

For support, email info@blackstonebd.com or create an issue in the repository.

---

**Made with ❤️ in Bangladesh**
# BlackStone-BD
