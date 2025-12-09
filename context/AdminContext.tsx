'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Product, Order, Customer, HotOffer, SiteSettings } from '@/types';
import {
    categories as initialCategories,
    products as initialProducts,
    orders as initialOrders,
    customers as initialCustomers,
    hotOffers as initialHotOffers,
    siteSettings as initialSettings
} from '@/lib/data';

interface AdminContextType {
    categories: Category[];
    products: Product[];
    orders: Order[];
    customers: Customer[];
    hotOffers: HotOffer[];
    settings: SiteSettings;
    addCategory: (category: Category) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    updateSettings: (settings: SiteSettings) => void;
    // Add other methods as needed
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [hotOffers, setHotOffers] = useState<HotOffer[]>(initialHotOffers);
    const [settings, setSettings] = useState<SiteSettings>(initialSettings);

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
        setProducts(products.filter(p => p.id !== id));
    };

    const updateSettings = (newSettings: SiteSettings) => {
        setSettings(newSettings);
    };

    return (
        <AdminContext.Provider value={{
            categories,
            products,
            orders,
            customers,
            hotOffers,
            settings,
            addCategory,
            updateCategory,
            deleteCategory,
            addProduct,
            updateProduct,
            deleteProduct,
            updateSettings
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
