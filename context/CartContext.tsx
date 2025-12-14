'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
    removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
    updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('blackstone-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('blackstone-cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
        setItems(currentItems => {
            // Find existing item with same ID, same Size AND same Color
            const existingItem = currentItems.find(
                item => item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItem) {
                return currentItems.map(item =>
                    item.id === product.id &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
        setItems(currentItems =>
            currentItems.filter(item =>
                !(item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor)
            )
        );
    };

    const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
        if (quantity <= 0) {
            removeFromCart(productId, selectedSize, selectedColor);
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
