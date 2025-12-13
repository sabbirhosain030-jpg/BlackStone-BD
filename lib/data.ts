import { Product, TrendingItem } from '@/types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Premium Leather Wallet',
        description: 'Handcrafted genuine leather wallet with RFID protection. Features multiple card slots and a sleek design.',
        price: 1250,
        originalPrice: 1500,
        category: 'Accessories',
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'],
        stock: 50,
        rating: 4.8,
        reviews: 124,
        isFeatured: true,
        stockStatus: 'in-stock'
    },
    {
        id: '11',
        name: "Men's Classic Polo - Navy",
        description: 'Premium cotton polo shirt in classic navy. Essential wardrobe staple.',
        price: 1800,
        originalPrice: 2200,
        category: "Men's",
        images: ['https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?q=80&w=1000&auto=format&fit=crop'],
        stock: 0,
        rating: 4.8,
        reviews: 45,
        isNew: true,
        stockStatus: 'coming-soon'
    }
];

// Logic Update: Featured (No Hot Offers)
export const getFeaturedProducts = () => products.filter(p => p.isFeatured && !(p.originalPrice && p.originalPrice > p.price));
export const getNewArrivals = () => products.filter(p => p.isNew).slice(0, 8); // Limit to 8
export const getHotProducts = () => products.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getProductById = (id: string) => products.find(p => p.id === id);

export const getBestSellingProducts = () => {
    const productSales: { [key: string]: number } = {};

    // Calculate sales from orders
    orders.forEach(order => {
        order.items.forEach(item => {
            productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
        });
    });

    // Sort products by sales count
    // Logic Update: Best Selling based on Sales/Visits (Sales for now)
    return [...products]
        .sort((a, b) => {
            const salesA = productSales[a.id] || 0;
            const salesB = productSales[b.id] || 0;
            return salesB - salesA;
        })
        .slice(0, 8); // Return top 8
};

import { Category, Customer, HotOffer, SiteSettings } from '@/types';

export const categories: Category[] = [
    {
        id: '1',
        name: "Men's",
        slug: 'mens',
        description: "Premium men's clothing and fashion",
        productCount: 0,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Pants', 'Shirts', 'T-Shirts', 'Panjabi', 'Suits', 'Jackets']
    },
    {
        id: '2',
        name: "Women's",
        slug: 'womens',
        description: "Elegant women's clothing collection",
        productCount: 0,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Dresses', 'Kurtis', 'Sarees', 'Tops', 'Pants']
    },
    {
        id: '3',
        name: 'Boys',
        slug: 'boys',
        description: "Stylish boys' clothing",
        productCount: 0,
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['T-Shirts', 'Jeans', 'Shorts', 'Sets']
    },
    {
        id: '4',
        name: 'Girls',
        slug: 'girls',
        description: "Beautiful girls' clothing",
        productCount: 0,
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
        subCategories: ['Dresses', 'Tops', 'Skirts', 'Sets']
    },
    {
        id: '5',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Watches, bags, jewelry, and more',
        productCount: 0,
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
        totalOrders: 5,
        totalSpent: 12500,
        joinDate: '2024-01-15',
        status: 'active'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+8801812345678',
        address: '456 Park Ave, Chittagong',
        totalOrders: 3,
        totalSpent: 8500,
        joinDate: '2024-02-20',
        status: 'active'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+8801912345678',
        address: '789 Lake Rd, Sylhet',
        totalOrders: 1,
        totalSpent: 3200,
        joinDate: '2024-03-10',
        status: 'blocked'
    }
];

export const hotOffers: HotOffer[] = [
    {
        id: '1',
        title: 'Summer Sale',
        description: 'Get up to 50% off on all summer collections',
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1000&auto=format&fit=crop',
        discount: '50% OFF',
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        isActive: true,
        link: '/category/fashion'
    },
    {
        id: '2',
        title: 'New Arrival Deal',
        description: 'Special launch price for new electronics',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
        discount: '20% OFF',
        startDate: '2024-04-15',
        endDate: '2024-05-15',
        isActive: true,
        link: '/category/electronics'
    }
];

export const siteSettings: SiteSettings = {
    siteName: 'BlackStone BD',
    contactEmail: 'support@blackstonebd.com',
    contactPhone: '+880 1234-567890',
    address: 'Level 4, Gulshan 1, Dhaka 1212, Bangladesh',
    currency: '৳',
    socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
    },
    deliveryChargeInsideDhaka: 60,
    deliveryChargeOutsideDhaka: 120
};

export const trendingItems: TrendingItem[] = [
    {
        id: '1',
        title: 'Summer Vibes',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop',
        category: "Men's",
        isActive: true
    },
    {
        id: '2',
        title: 'Urban Chic',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        category: "Women's",
        isActive: true
    },
    {
        id: '3',
        title: 'Casual Comfort',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop',
        category: "Men's",
        isActive: true
    }
];

import { Order } from '@/types';

export const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+8801712345678',
        customerAddress: '123 Main St, Dhaka',
        items: [
            { ...products[0], quantity: 1 },
            { ...products[2], quantity: 1 }
        ],
        total: 4450,
        status: 'pending',
        paymentMethod: 'cod',
        createdAt: '2024-03-10T10:00:00Z'
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        customerPhone: '+8801812345678',
        customerAddress: '456 Park Ave, Chittagong',
        items: [
            { ...products[1], quantity: 1 }
        ],
        total: 4500,
        status: 'processing',
        paymentMethod: 'cod',
        createdAt: '2024-03-09T14:30:00Z'
    },
    {
        id: 'ORD-003',
        customerName: 'Mike Johnson',
        customerEmail: 'mike@example.com',
        customerPhone: '+8801912345678',
        customerAddress: '789 Lake Rd, Sylhet',
        items: [
            { ...products[3], quantity: 2 }
        ],
        total: 5600,
        status: 'delivered',
        paymentMethod: 'cod',
        createdAt: '2024-03-08T09:15:00Z'
    },
    {
        id: 'ORD-004',
        customerName: 'Sarah Williams',
        customerEmail: 'sarah@example.com',
        customerPhone: '+8801612345678',
        customerAddress: '321 River Side, Rajshahi',
        items: [
            { ...products[5], quantity: 3 }
        ],
        total: 1650,
        status: 'cancelled',
        paymentMethod: 'cod',
        createdAt: '2024-03-08T16:45:00Z'
    },
    {
        id: 'ORD-005',
        customerName: 'David Brown',
        customerEmail: 'david@example.com',
        customerPhone: '+8801512345678',
        customerAddress: '654 Hill View, Khulna',
        items: [
            { ...products[4], quantity: 1 },
            { ...products[0], quantity: 1 }
        ],
        total: 3050,
        status: 'shipped',
        paymentMethod: 'cod',
        createdAt: '2024-03-07T11:20:00Z'
    }
];

export const initialSubscribers = [
    { id: '1', email: 'john.doe@example.com', joinedAt: '2023-11-15T10:30:00Z' },
    { id: '2', email: 'jane.smith@test.com', joinedAt: '2023-11-16T14:20:00Z' },
];
