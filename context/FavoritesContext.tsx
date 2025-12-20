'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
    favorites: string[];
    addFavorite: (productId: string) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    getFavorites: () => string[];
    toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'blackstone_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Failed to save favorites:', error);
            }
        }
    }, [favorites, isInitialized]);

    const addFavorite = (productId: string) => {
        setFavorites(prev => {
            if (!prev.includes(productId)) {
                return [...prev, productId];
            }
            return prev;
        });
    };

    const removeFavorite = (productId: string) => {
        setFavorites(prev => prev.filter(id => id !== productId));
    };

    const isFavorite = (productId: string) => {
        return favorites.includes(productId);
    };

    const getFavorites = () => {
        return favorites;
    };

    const toggleFavorite = (productId: string) => {
        if (isFavorite(productId)) {
            removeFavorite(productId);
        } else {
            addFavorite(productId);
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            getFavorites,
            toggleFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
