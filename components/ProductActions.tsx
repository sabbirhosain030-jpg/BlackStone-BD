'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, ShoppingCart, Ruler, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import TrustBadges from './TrustBadges';
import SizeGuide from './SizeGuide';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const router = useRouter();
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    // Default sizes if none provided (temporary fallback or could be empty)
    const availableSizes = product.sizes && product.sizes.length > 0
        ? product.sizes
        : ['S', 'M', 'L', 'XL', 'XXL']; // Fallback for demo

    const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0]);
    const [selectedColor, setSelectedColor] = useState<string | null>(product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const [error, setError] = useState('');

    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError('Please select a size');
            return;
        }
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            setError('Please select a color');
            return;
        }
        addToCart(product, quantity, selectedSize, selectedColor || undefined);
        setQuantity(1);
        setError('');

        // Visual feedback could be added here
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            setError('Please select a size');
            return;
        }
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            setError('Please select a color');
            return;
        }
        addToCart(product, quantity, selectedSize, selectedColor || undefined);
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="mb-6">
                <span className="text-premium-gold font-bold text-sm uppercase tracking-wide">
                    {product.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold font-playfair text-white mt-2 mb-4">
                    {product.name}
                </h1>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="flex text-premium-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-700'}`} />
                            ))}
                        </div>
                        <span className="ml-2 text-gray-400 text-sm">({product.reviews} reviews)</span>
                    </div>
                </div>

                <div className="flex flex-col mb-8 bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                    <div className="flex items-end gap-4 mb-2">
                        <span className="text-4xl font-bold text-white">
                            ৳{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-500 line-through mb-1">
                                ৳{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="bg-premium-gold/10 text-premium-gold text-xs font-bold px-3 py-1 rounded-full mb-2 border border-premium-gold/20">
                                Save ৳{(product.originalPrice - product.price).toLocaleString()}
                            </span>
                        )}
                    </div>
                    {/* Size Guide Link */}
                    <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="flex items-center text-sm font-medium text-gray-400 hover:text-premium-gold transition-colors w-fit gap-2 mt-2 underline decoration-dotted"
                    >
                        <Ruler className="h-4 w-4" />
                        View Size Guide
                    </button>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
                    {product.description}
                </p>

                {/* Size Selector */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-bold">Select Size</span>
                        {error && <span className="text-red-500 text-sm animate-pulse">{error}</span>}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {availableSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => {
                                    setSelectedSize(size);
                                    setError('');
                                }}
                                className={`
                                    w-12 h-12 rounded-lg font-bold transition-all duration-200 border-2 flex items-center justify-center relative
                                    ${selectedSize === size
                                        ? 'bg-premium-gold text-premium-black border-premium-gold scale-110 shadow-lg shadow-premium-gold/20'
                                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                    }
                                `}
                            >
                                {size}
                                {selectedSize === size && (
                                    <motion.div
                                        layoutId="size-check"
                                        className="absolute -top-2 -right-2 bg-white text-black rounded-full p-0.5"
                                    >
                                        <Check className="h-3 w-3" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-white font-bold">Select Color</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        setError('');
                                    }}
                                    className={`
                                        px-4 py-2 rounded-lg font-bold transition-all duration-200 border-2 flex items-center justify-center relative capitalize
                                        ${selectedColor === color
                                            ? 'bg-premium-gold text-premium-black border-premium-gold scale-105 shadow-lg shadow-premium-gold/20'
                                            : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                        }
                                    `}
                                >
                                    {color}
                                    {selectedColor === color && (
                                        <motion.div
                                            layoutId="color-check"
                                            className="absolute -top-2 -right-2 bg-white text-black rounded-full p-0.5"
                                        >
                                            <Check className="h-3 w-3" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-700 rounded-lg bg-gray-900">
                            <button
                                onClick={decrementQuantity}
                                className="p-4 hover:bg-gray-800 transition-colors text-white"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 font-bold text-xl text-white w-12 text-center">{quantity}</span>
                            <button
                                onClick={incrementQuantity}
                                className="p-4 hover:bg-gray-800 transition-colors text-white"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="text-sm text-gray-500">
                            {product.stockStatus === 'in-stock' ? (
                                <span className="text-green-500 font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500" /> In Stock
                                </span>
                            ) : (
                                <span className="text-red-500 font-medium">
                                    {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Low Stock'}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Buy Now Button */}
                        <button
                            onClick={handleBuyNow}
                            disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                            className={`flex-1 font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all uppercase tracking-widest text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ${product.stockStatus === 'coming-soon' || product.stockStatus === 'out-of-stock' || product.stock === 0
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed hidden'
                                : 'bg-premium-gold text-premium-black hover:bg-white hover:text-premium-black border border-premium-gold'
                                }`}
                        >
                            Buy Now
                        </button>

                        <button
                            id="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                            className={`flex-1 font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all uppercase tracking-widest text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ${product.stockStatus === 'coming-soon' || product.stockStatus === 'out-of-stock' || product.stock === 0
                                ? 'bg-gray-800 cursor-not-allowed text-gray-500'
                                : 'bg-transparent text-premium-gold hover:bg-premium-gold hover:text-premium-black border border-premium-gold'
                                }`}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Trust Badges */}
                <TrustBadges />
            </div>

            <SizeGuide isOpen={isSizeGuideOpen} closeModal={() => setIsSizeGuideOpen(false)} />
        </div>
    );
}
