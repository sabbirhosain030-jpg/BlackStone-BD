'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Product, Order, Customer, HotOffer, SiteSettings, TrendingItem, Subscriber } from '@/types';
import {
    categories as initialCategories,
    products as initialProducts,
    orders as initialOrders,
    customers as initialCustomers,
    hotOffers as initialHotOffers,
    siteSettings as initialSettings,
    trendingItems as initialTrendingItems,
    initialSubscribers as mockSubscribers
} from '@/lib/data';

interface AdminContextType {
    categories: Category[];
    products: Product[];
    orders: Order[];
    customers: Customer[];
    hotOffers: HotOffer[];
    settings: SiteSettings;
    trendingItems: TrendingItem[];
    subscribers: Subscriber[];
    addCategory: (category: Category) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    restoreProduct: (id: string) => void;
    updateSettings: (settings: SiteSettings) => void;
    addTrendingItem: (item: TrendingItem) => void;
    updateTrendingItem: (item: TrendingItem) => void;
    deleteTrendingItem: (id: string) => void;
    addSubscriber: (email: string) => void;
    deleteSubscriber: (id: string) => void;
    addHotOffer: (offer: HotOffer) => void;
    updateHotOffer: (offer: HotOffer) => void;
    deleteHotOffer: (id: string) => void;
    toggleHotOfferStatus: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [hotOffers, setHotOffers] = useState<HotOffer[]>(initialHotOffers);
    const [settings, setSettings] = useState<SiteSettings>(initialSettings);
    const [trendingItems, setTrendingItems] = useState<TrendingItem[]>(initialTrendingItems);
    const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);

    const addCategory = (category: Category) => {
        setCategories([...categories, category]);
    };

    const updateCategory = (updatedCategory: Category) => {
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    };

    const deleteCategory = (id: string) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const addProduct = (product: Product) => {
        setProducts([...products, product]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id: string) => {
        // Soft delete
        setProducts(products.map(p => p.id === id ? { ...p, isDeleted: true } : p));
    };

    const restoreProduct = (id: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, isDeleted: false } : p));
    };

    const updateSettings = (newSettings: SiteSettings) => {
        setSettings(newSettings);
    };

    const addTrendingItem = (item: TrendingItem) => {
        setTrendingItems([...trendingItems, item]);
    };

    const updateTrendingItem = (updatedItem: TrendingItem) => {
        setTrendingItems(trendingItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deleteTrendingItem = (id: string) => {
        setTrendingItems(trendingItems.filter(item => item.id !== id));
    };

    const addSubscriber = (email: string) => {
        const newSubscriber: Subscriber = {
            id: Date.now().toString(),
            email,
            joinedAt: new Date().toISOString()
        };
        setSubscribers([newSubscriber, ...subscribers]);
    };

    const deleteSubscriber = (id: string) => {
        setSubscribers(subscribers.filter(s => s.id !== id));
    };

    return (
        <AdminContext.Provider value={{
            categories,
            products,
            orders,
            customers,
            hotOffers,
            settings,
            trendingItems,
            subscribers,
            addCategory,
            updateCategory,
            deleteCategory,
            addProduct,
            updateProduct,
            deleteProduct,
            restoreProduct,
            updateSettings,
            addTrendingItem,
            updateTrendingItem,
            deleteTrendingItem,
            addSubscriber,
            deleteSubscriber,
            addHotOffer: (offer: HotOffer) => {
                setHotOffers([...hotOffers, offer]);
            },
            updateHotOffer: (updatedOffer: HotOffer) => {
                setHotOffers(hotOffers.map(o => o.id === updatedOffer.id ? updatedOffer : o));
            },
            deleteHotOffer: (id: string) => {
                setHotOffers(hotOffers.filter(o => o.id !== id));
            },
            toggleHotOfferStatus: (id: string) => {
                setHotOffers(hotOffers.map(o => o.id === id ? { ...o, isActive: !o.isActive } : o));
            }
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
