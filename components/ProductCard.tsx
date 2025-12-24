'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Zap, Heart, Tag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductQuickView from './ProductQuickView';

interface ProductCardProps {
    product: Product;
    index?: number;
    viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, index = 0, viewMode = 'grid' }: ProductCardProps) {
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const favorited = isFavorite(product.id);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product.id);
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 600);
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        router.push('/checkout');
    };

    const discountPercent = product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // List View Layout
    if (viewMode === 'list') {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="h-full"
                >
                    <div className="group bg-transparent overflow-hidden h-full flex flex-col sm:flex-row relative gap-4">
                        {/* Image Section - Left Side */}
                        <div className="relative w-full sm:w-48 h-64 sm:h-auto overflow-hidden bg-gray-900 flex-shrink-0">
                            {/* New Badge - Top Left */}
                            {product.isNew && (
                                <div className="absolute top-2 left-2 z-10 bg-white text-black text-[10px] font-bold px-2 py-1 leading-none uppercase tracking-wider shadow-sm">
                                    New in
                                </div>
                            )}

                            {/* Discount Badge - Stacked */}
                            {discountPercent > 0 && (
                                <div className={`absolute left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 leading-none shadow-sm ${product.isNew ? 'top-8' : 'top-2'}`}>
                                    -{discountPercent}%
                                </div>
                            )}

                            <Link href={`/products/${product.id}`} className="block w-full h-full">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>
                        </div>

                        {/* Content Section - Right Side */}
                        <div className="flex flex-col flex-grow py-2 sm:pr-12">
                            {/* Action Buttons - Absolute Top Right of Container */}
                            <div className="absolute top-0 right-0 z-20 flex flex-col gap-3">
                                {/* Add to Cart Button (+) */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding || product.stockStatus === 'out-of-stock' || product.stock === 0}
                                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-xl disabled:opacity-50"
                                    title="Add to Cart"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>

                                {/* Favorite Button (Heart) */}
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xl ${favorited
                                        ? 'bg-white text-red-500'
                                        : 'bg-white text-black hover:bg-gray-100'
                                        }`}
                                    aria-label="Add to favorites"
                                >
                                    <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="text-xs text-premium-gold font-semibold mb-1 uppercase tracking-wide">
                                {product.category}
                            </div>

                            <Link href={`/products/${product.id}`}>
                                <h3 className="text-white font-semibold text-xl mb-2 hover:text-premium-gold transition-colors leading-tight">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl font-bold text-white">
                                    ৳{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ৳{product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Product Features / Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-2">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Available Sizes:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {product.sizes.map((size) => (
                                            <span key={size} className="text-[10px] font-medium text-gray-300 border border-gray-700 px-1.5 py-0.5 rounded hover:border-premium-gold transition-colors">
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description removed as per request to simplify "order details" */}
                        </div>
                    </div>
                </motion.div>
                <ProductQuickView isOpen={isQuickViewOpen} closeModal={() => setIsQuickViewOpen(false)} product={product} />
            </>
        );
    }

    // Grid View Layout - Dark Theme, Compact
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="h-full"
            >
                <div className="group bg-transparent overflow-hidden h-full flex flex-col relative w-[160px] sm:w-[220px] md:w-full mx-auto">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 leading-none mb-3">
                        {/* Badges Container - Top Left */}
                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2 items-start">
                            {/* New Badge */}
                            {product.isNew && (
                                <div className="bg-white text-black text-[10px] font-bold px-2 py-1 leading-none uppercase tracking-wider shadow-sm">
                                    New in
                                </div>
                            )}
                            {/* Discount Badge */}
                            {discountPercent > 0 && (
                                <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 leading-none shadow-sm">
                                    -{discountPercent}%
                                </div>
                            )}
                        </div>

                        {/* Action Buttons - Top Right Column */}
                        <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
                            {/* Add to Cart Button (+) */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || product.stockStatus === 'out-of-stock' || product.stock === 0}
                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Add to Cart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>

                            {/* Favorite Button (Heart) */}
                            <button
                                onClick={handleToggleFavorite}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${favorited
                                    ? 'bg-white text-red-500'
                                    : 'bg-white text-black hover:bg-gray-100'
                                    }`}
                                aria-label="Add to favorites"
                            >
                                <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Product Image */}
                        <Link href={`/products/${product.id}`} className="block w-full h-full">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    {/* Content Section - Minimal */}
                    <div className="flex flex-col px-1">
                        <Link href={`/products/${product.id}`} className="block mb-1 group-hover:text-premium-gold transition-colors">
                            <h3 className="text-white font-medium text-sm line-clamp-1 leading-tight">
                                {product.name}
                            </h3>
                        </Link>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                                ${product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-500 line-through">
                                    ${product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
            <ProductQuickView
                isOpen={isQuickViewOpen}
                closeModal={() => setIsQuickViewOpen(false)}
                product={product}
            />
        </>
    );
}
