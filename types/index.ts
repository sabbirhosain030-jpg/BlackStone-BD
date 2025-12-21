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
    subCategory?: string;
    stockStatus?: 'in-stock' | 'out-of-stock' | 'coming-soon';
    views?: number; // NEW - Track product page views
    totalSales?: number; // NEW - Track number of sales
    isHotOffer?: boolean; // NEW - Mark as hot offer product
    isDiscountManual?: boolean; // NEW - Manual discount override flag
    createdAt?: string; // NEW - Creation date for New Arrivals
    isDeleted?: boolean; // NEW - Soft delete flag
    sizes?: string[]; // NEW - Available sizes for the product
    colors?: string[]; // NEW - Available colors for filtering
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string; // NEW - Selected size
    selectedColor?: string; // NEW - Selected color
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
    isHot?: boolean; // NEW - Mark as "Hot" category in filters
    parentCategory?: string; // NEW - ID of parent category (null for main categories)
    subCategories?: string[]; // NEW - IDs of subcategories
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
    timerEndDate?: string; // NEW - Countdown timer end date/time
    productIds?: string[]; // NEW - Associated product IDs
    pageTitle?: string; // NEW - Custom title for /hot-offers page
    pageDescription?: string; // NEW - Custom description for /hot-offers page
}

export interface SiteSettings {
    siteName: string;
    contact: {
        primaryPhone: string;
        secondaryPhone: string;
        supportEmail: string;
        infoEmail: string;
    };
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    currency: string;

    socialLinks: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
    };
    deliveryChargeInsideDhaka: number;
    deliveryChargeOutsideDhaka: number;
    location: {
        lat: number;
        lng: number;
    };
    businessHours: {
        [key: string]: {
            open: string;
            close: string;
            closed: boolean;
        };
    };
    contactFormEmail: string;
    marketingModal: {
        enabled: boolean;
        title: string;
        description: string;
        discountPercentage: number;
        imageUrl?: string;
    };
    appearance: {
        showBanner: boolean;
        bannerText: string;
        sections: {
            hero: boolean;
            hotOffers: boolean;
            categories: boolean;
            trending: boolean;
            newArrivals: boolean;
        };
    };
}

export interface TrendingItem {
    id: string;
    title: string;
    image: string;
    category: string;
    isActive: boolean;
}

export interface Subscriber {
    id: string;
    email: string;
    joinedAt: string;
}
