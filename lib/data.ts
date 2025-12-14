import { Product, TrendingItem } from '@/types';

export const products: Product[] = [
    // Men's Collection
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
        isFeatured: true,
        stockStatus: 'in-stock'
    },
    {
        id: 'm2',
        name: 'Slim Fit Chino Pants',
        description: 'Modern slim fit chinos suitable for both casual and semi-formal wear.',
        price: 1850,
        originalPrice: 2200,
        category: "Men's",
        images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop'],
        stock: 45,
        colors: ['Beige', 'Black', 'Olive'],
        sizes: ['30', '32', '34', '36'],
        rating: 4.6,
        reviews: 18,
        isNew: true,
        stockStatus: 'in-stock'
    },
    {
        id: 'm3',
        name: 'Classic Leather Jacket',
        description: 'Genuine leather jacket with a timeline design. A must-have for winter.',
        price: 8500,
        originalPrice: 10000,
        category: "Men's",
        images: ['https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop'],
        stock: 15,
        colors: ['Black', 'Brown'],
        sizes: ['M', 'L', 'XL'],
        rating: 4.9,
        reviews: 42,
        stockStatus: 'coming-soon'  // Changed from low-stock which is invalid
    },
    {
        id: 'm4',
        name: 'Casual Denim Shirt',
        description: 'Rugged and stylish denim shirt for everyday wear.',
        price: 2200,
        category: "Men's",
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop'],
        stock: 60,
        colors: ['Blue', 'Black'],
        sizes: ['M', 'L', 'XL'],
        rating: 4.5,
        reviews: 12,
        stockStatus: 'in-stock'
    },

    // Women's Collection
    {
        id: 'w1',
        name: 'Elegant Silk Saree',
        description: 'Exquisite silk saree with intricate embroidery. Includes matching blouse piece.',
        price: 12500,
        originalPrice: 15000,
        category: "Women's",
        images: ['https://images.unsplash.com/photo-1610189012906-4022a104085e?q=80&w=1000&auto=format&fit=crop'],
        stock: 20,
        colors: ['Red', 'Blue', 'Gold'],
        rating: 4.9,
        reviews: 56,
        isFeatured: true,
        stockStatus: 'in-stock'
    },
    {
        id: 'w2',
        name: 'Designer Kurti Set',
        description: 'Modern kurti with palazzo pants. Comfortable and stylish.',
        price: 3200,
        originalPrice: 3800,
        category: "Women's",
        images: ['https://images.unsplash.com/photo-1583391733956-6c782764724c?q=80&w=1000&auto=format&fit=crop'],
        stock: 35,
        colors: ['Pink', 'Green', 'Yellow'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7,
        reviews: 32,
        isNew: true,
        stockStatus: 'in-stock'
    },
    {
        id: 'w3',
        name: 'Floral Summer Dress',
        description: 'Lightweight floral print dress perfect for summer days.',
        price: 2500,
        category: "Women's",
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'],
        stock: 40,
        colors: ['Floral White', 'Floral Blue'],
        sizes: ['S', 'M', 'L'],
        rating: 4.6,
        reviews: 15,
        stockStatus: 'in-stock'
    },

    // Boys
    {
        id: 'b1',
        name: 'Boys Graphic T-Shirt',
        description: 'Cool graphic tee for active boys. 100% cotton.',
        price: 850,
        originalPrice: 1000,
        category: 'Boys',
        images: ['https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1000&auto=format&fit=crop'],
        stock: 100,
        colors: ['White', 'Black', 'Red'],
        sizes: ['4Y', '6Y', '8Y', '10Y'],
        rating: 4.5,
        reviews: 8,
        stockStatus: 'in-stock'
    },

    // Girls
    {
        id: 'g1',
        name: 'Girls Party Frocck',
        description: 'Beautiful party dress with sequins and tulle.',
        price: 2800,
        originalPrice: 3500,
        category: 'Girls',
        images: ['https://images.unsplash.com/photo-1621452773781-0f992ee61c67?q=80&w=1000&auto=format&fit=crop'],
        stock: 25,
        colors: ['Pink', 'Purple'],
        sizes: ['4Y', '6Y', '8Y', '10Y'],
        rating: 4.8,
        reviews: 12,
        stockStatus: 'in-stock'
    },

    // Accessories
    {
        id: 'a1',
        name: 'Premium Leather Wallet',
        description: 'Handcrafted genuine leather wallet with RFID protection.',
        price: 1250,
        originalPrice: 1500,
        category: 'Accessories',
        subCategory: 'Bags',
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'],
        stock: 50,
        colors: ['Brown', 'Black'],
        rating: 4.8,
        reviews: 124,
        isFeatured: true,
        stockStatus: 'in-stock'
    },
    // New Seed Data
    {
        id: 'b2',
        name: 'Slim Fit Boys Jeans',
        description: 'Durable and comfortable denim jeans for active boys.',
        price: 1200,
        originalPrice: 1500,
        category: 'Boys',
        subCategory: 'Jeans',
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop'],
        stock: 30,
        colors: ['Blue', 'Black'],
        sizes: ['4Y', '6Y', '8Y', '10Y'],
        rating: 4.6,
        reviews: 15,
        stockStatus: 'in-stock'
    },
    {
        id: 'g2',
        name: 'Floral Print Top',
        description: 'Cute floral print top with comfortable fabric.',
        price: 950,
        originalPrice: 1100,
        category: 'Girls',
        subCategory: 'Tops',
        images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop'],
        stock: 20,
        colors: ['Pink', 'White'],
        sizes: ['4Y', '6Y', '8Y'],
        rating: 4.7,
        reviews: 10,
        stockStatus: 'in-stock'
    },
    {
        id: 'a2',
        name: 'Luxury Rose Gold Watch',
        description: 'Elegant rose gold watch with stainless steel strap.',
        price: 4500,
        originalPrice: 5500,
        category: 'Accessories',
        subCategory: 'Watches',
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop'],
        stock: 12,
        colors: ['Rose Gold', 'Silver'],
        rating: 4.9,
        reviews: 35,
        isFeatured: true,
        stockStatus: 'in-stock'
    },
    {
        id: 'a3',
        name: 'Classic Leather Handbag',
        description: 'Spacious and stylish leather handbag for daily use.',
        price: 3200,
        originalPrice: 4000,
        category: 'Accessories',
        subCategory: 'Bags',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'],
        stock: 15,
        colors: ['Black', 'Tan'],
        rating: 4.8,
        reviews: 22,
        stockStatus: 'in-stock'
    },
    {
        id: 'a4',
        name: 'Gold Plated Necklace',
        description: 'Minimalist gold plated necklace with pendant.',
        price: 1500,
        originalPrice: 1800,
        category: 'Accessories',
        subCategory: 'Jewelry',
        images: ['https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop'],
        stock: 25,
        colors: ['Gold'],
        rating: 4.7,
        reviews: 18,
        stockStatus: 'in-stock'
    }
];

// Logic Update: Featured (No Hot Offers)
export const getFeaturedProducts = () => products.filter(p => p.isFeatured && !(p.originalPrice && p.originalPrice > p.price));
export const getNewArrivals = () => products.filter(p => p.isNew).slice(0, 8); // Limit to 8
export const getHotProducts = () => products.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getProductById = (id: string) => products.find(p => p.id === id);

export const getBestSellingProducts = () => {
    // Return Featured as Best Selling for Demo purposes if no orders
    return products.slice(0, 4);
};

import { Category, Customer, HotOffer, SiteSettings } from '@/types';

export const categories: Category[] = [
    {
        id: '1',
        name: "Men's",
        slug: 'mens',
        description: "Premium men's clothing and fashion",
        productCount: 4,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Panjabi', 'Pants', 'Jackets', 'Shirts']
    },
    {
        id: '2',
        name: "Women's",
        slug: 'womens',
        description: "Elegant women's clothing collection",
        productCount: 3,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Sarees', 'Kurtis', 'Dresses']
    },
    {
        id: '3',
        name: 'Boys',
        slug: 'boys',
        description: "Stylish boys' clothing",
        productCount: 1,
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['T-Shirts', 'Jeans']
    },
    {
        id: '4',
        name: 'Girls',
        slug: 'girls',
        description: "Beautiful girls' clothing",
        productCount: 1,
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Dresses', 'Tops']
    },
    {
        id: '5',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Watches, bags, jewelry, and more',
        productCount: 1,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop'
    }
];

export const customers: Customer[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+8801712345678',
        address: '123 Main St, Dhaka',
        totalOrders: 0,
        totalSpent: 0,
        joinDate: '2024-01-15',
        status: 'active'
    }
];

export const hotOffers: HotOffer[] = [
    {
        id: '1',
        title: 'Winter Clearance',
        description: 'Hot prices for cool days. Grab them before they melt.',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop',
        discount: 'FLAT 50% OFF',
        startDate: '2025-12-01',
        endDate: '2025-12-31',
        isActive: true,
        link: '/category/mens'
    }
];

export const siteSettings: SiteSettings = {
    siteName: 'BlackStone BD',
    contact: {
        primaryPhone: '+880 1234-567890',
        secondaryPhone: '+880 9876-543210',
        supportEmail: 'support@blackstonebd.com',
        infoEmail: 'info@blackstonebd.com'
    },
    address: {
        street: 'Level 4, Gulshan 1',
        city: 'Dhaka',
        postalCode: '1212',
        country: 'Bangladesh'
    },
    currency: '৳',
    socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
    },
    deliveryChargeInsideDhaka: 60,
    deliveryChargeOutsideDhaka: 120,
    location: {
        lat: 23.8103,
        lng: 90.4125
    },
    businessHours: {
        saturday: { open: '09:00', close: '21:00', closed: false },
        sunday: { open: '09:00', close: '21:00', closed: false },
        monday: { open: '09:00', close: '21:00', closed: false },
        tuesday: { open: '09:00', close: '21:00', closed: false },
        wednesday: { open: '09:00', close: '21:00', closed: false },
        thursday: { open: '09:00', close: '21:00', closed: false },
        friday: { open: '00:00', close: '00:00', closed: true }
    },
    contactFormEmail: 'support@blackstonebd.com'
};

export const trendingItems: TrendingItem[] = [
    {
        id: '1',
        title: 'Winter Vibes',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop',
        category: "Men's",
        isActive: true
    },
    {
        id: '2',
        title: 'Party Season',
        image: 'https://images.unsplash.com/photo-1610189012906-4022a104085e?q=80&w=1000&auto=format&fit=crop',
        category: "Women's",
        isActive: true
    }
];

import { Order } from '@/types';

// Reset Orders for Fresh Start
export const orders: Order[] = [];

export const initialSubscribers = [
    { id: '1', email: 'john.doe@example.com', joinedAt: '2023-11-15T10:30:00Z' }
];
