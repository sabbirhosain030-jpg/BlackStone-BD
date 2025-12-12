import { Product } from '@/types';

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
    },
    {
        id: '2',
        name: 'Wireless Noise Cancelling Headphones',
        description: 'Immersive sound quality with active noise cancellation. 30-hour battery life and comfortable ear cushions.',
        price: 4500,
        originalPrice: 5500,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'],
        stock: 25,
        rating: 4.9,
        reviews: 89,
        isFeatured: true,
        isNew: true,
    },
    {
        id: '3',
        name: 'Men\'s Classic Watch',
        description: 'Elegant stainless steel watch with water resistance. Perfect for formal and casual occasions.',
        price: 3200,
        category: 'Watches',
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop'],
        stock: 15,
        rating: 4.7,
        reviews: 56,
    },
    {
        id: '4',
        name: 'Running Shoes',
        description: 'Lightweight and breathable running shoes with superior cushioning for maximum comfort.',
        price: 2800,
        originalPrice: 3500,
        category: 'Footwear',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'],
        stock: 40,
        rating: 4.6,
        reviews: 210,
        isFeatured: true,
    },
    {
        id: '5',
        name: 'Smart Fitness Tracker',
        description: 'Track your steps, heart rate, and sleep patterns. Water-resistant and long battery life.',
        price: 1800,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop'],
        stock: 60,
        rating: 4.5,
        reviews: 150,
    },
    {
        id: '6',
        name: 'Cotton T-Shirt',
        description: 'Premium quality cotton t-shirt. Breathable fabric and comfortable fit.',
        price: 550,
        category: 'Clothing',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'],
        stock: 100,
        rating: 4.4,
        reviews: 320,
    }
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewArrivals = () => products.filter(p => p.isNew);
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
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        productCount: 150,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '2',
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        productCount: 320,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture, decor, and home essentials',
        productCount: 85,
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Jewelry, watches, and bags',
        productCount: 120,
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
