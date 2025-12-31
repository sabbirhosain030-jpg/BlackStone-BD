'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Category, Product, Order, Customer, HotOffer, SiteSettings, TrendingItem, Subscriber, Coupon } from '@/types';
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
    coupons: Coupon[];
    loading: boolean;
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
    addCoupon: (coupon: Coupon) => void;
    updateCoupon: (coupon: Coupon) => void;
    deleteCoupon: (id: string) => void;
    updateOrder: (order: Order) => void;
    deleteOrder: (id: string) => void;
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
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [catsRes, prodsRes, settingsRes, couponsRes, offersRes, ordersRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/products'),
                    fetch('/api/settings'),
                    fetch('/api/coupons'),
                    fetch('/api/hot-offers'),
                    fetch('/api/orders')
                ]);

                if (catsRes.ok) {
                    const catsData = await catsRes.json();
                    if (catsData.length > 0) setCategories(catsData);
                }
                if (prodsRes.ok) {
                    const prodsData = await prodsRes.json();
                    if (prodsData.length > 0) setProducts(prodsData);
                }
                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    if (Array.isArray(ordersData)) setOrders(ordersData);
                }
                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    if (settingsData) setSettings(settingsData);
                }
                if (couponsRes.ok) {
                    const couponsData = await couponsRes.json();
                    if (Array.isArray(couponsData)) setCoupons(couponsData);
                }
                if (offersRes.ok) {
                    const offersData = await offersRes.json();
                    if (Array.isArray(offersData) && offersData.length > 0) {
                        setHotOffers(offersData);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addCategory = (category: Category) => {
        setCategories([...categories, category]);
    };

    const updateCategory = (updatedCategory: Category) => {
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    };

    const deleteCategory = (id: string) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const addProduct = async (product: Product) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts([...products, newProduct]);
            }
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            await fetch('/api/products', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            // Check if we want soft delete or hard delete. 
            // The UI seems to have 'trash' view, suggesting soft delete.
            // But if we want to PERSIST the soft delete, we typically update 'isDeleted: true'.
            // Let's assume soft delete via PUT first.
            const product = products.find(p => p.id === id);
            if (product) {
                const updated = { ...product, isDeleted: true };
                await updateProduct(updated); // Reuse update logic which calls API
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const restoreProduct = async (id: string) => {
        const product = products.find(p => p.id === id);
        if (product) {
            const updated = { ...product, isDeleted: false };
            await updateProduct(updated);
        }
    };

    const updateSettings = async (newSettings: SiteSettings) => {
        setSettings(newSettings);
        try {
            await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings),
            });
        } catch (error) {
            console.error("Failed to persist settings:", error);
        }
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

    const addCoupon = async (coupon: Coupon) => {
        try {
            const res = await fetch('/api/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(coupon),
            });
            if (res.ok) {
                const newCoupon = await res.json();
                setCoupons([...coupons, newCoupon]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateCoupon = async (updatedCoupon: Coupon) => {
        try {
            await fetch('/api/coupons', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCoupon),
            });
            setCoupons(coupons.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCoupon = async (id: string) => {
        try {
            await fetch(`/api/coupons?id=${id}`, {
                method: 'DELETE',
            });
            setCoupons(coupons.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const updateOrder = async (updatedOrder: Order) => {
        try {
            await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder),
            });
            setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        } catch (error) {
            console.error("Failed to update order:", error);
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            await fetch(`/api/orders?id=${id}`, {
                method: 'DELETE',
            });
            setOrders(orders.filter(o => o.id !== id));
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
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
            coupons,
            loading,
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
            addCoupon,
            updateCoupon,
            deleteCoupon,
            updateOrder,
            deleteOrder,

            addHotOffer: async (offer: HotOffer) => {
                try {
                    const res = await fetch('/api/hot-offers', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(offer),
                    });
                    if (res.ok) {
                        const newOffer = await res.json();
                        setHotOffers([...hotOffers, newOffer]);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            updateHotOffer: async (updatedOffer: HotOffer) => {
                try {
                    await fetch('/api/hot-offers', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedOffer),
                    });
                    setHotOffers(hotOffers.map(o => o.id === updatedOffer.id ? updatedOffer : o));
                } catch (error) {
                    console.error(error);
                }
            },
            deleteHotOffer: async (id: string) => {
                try {
                    await fetch(`/api/hot-offers?id=${id}`, { method: 'DELETE' });
                    setHotOffers(hotOffers.filter(o => o.id !== id));
                } catch (error) {
                    console.error(error);
                }
            },
            toggleHotOfferStatus: async (id: string) => {
                const offer = hotOffers.find(o => o.id === id);
                if (offer) {
                    const updated = { ...offer, isActive: !offer.isActive };
                    try {
                        await fetch('/api/hot-offers', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updated),
                        });
                        setHotOffers(hotOffers.map(o => o.id === id ? updated : o));
                    } catch (error) {
                        console.error(error);
                    }
                }
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
