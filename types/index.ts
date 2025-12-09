export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string[];
    stock: number;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isFeatured?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: 'cod';
    createdAt: string;
}

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'customer';
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    productCount: number;
    isFeatured?: boolean;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    joinDate: string;
    status: 'active' | 'blocked';
}

export interface HotOffer {
    id: string;
    title: string;
    description: string;
    image: string;
    discount: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    link?: string;
}

export interface SiteSettings {
    siteName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    currency: string;
    socialLinks: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
    };
    deliveryChargeInsideDhaka: number;
    deliveryChargeOutsideDhaka: number;
}
