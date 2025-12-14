'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductQuickView from './ProductQuickView';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, 1);

        // Reset animation state
        setTimeout(() => setIsAdding(false), 600);
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        router.push('/checkout');
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="h-full"
            >
                <div className="group bg-premium-charcoal rounded-none shadow-sm hover:shadow-2xl hover:shadow-premium-gold/10 transition-all duration-500 overflow-hidden border border-gray-800 hover:border-premium-gold/30 h-full flex flex-col relative">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
                        {/* Badges */}
                        {product.isNew && (
                            <motion.span
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                                className="absolute top-3 left-3 bg-premium-black text-premium-gold text-xs font-bold px-3 py-1.5 z-10 shadow-lg border border-premium-gold/30 uppercase tracking-widest"
                            >
                                NEW
                            </motion.span>
                        )}
                        {product.originalPrice && product.originalPrice > product.price && (
                            <motion.span
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                                className="absolute top-3 right-3 bg-premium-gold text-premium-black text-xs font-bold px-3 py-1.5 z-10 shadow-lg"
                            >
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </motion.span>
                        )}

                        {/* Stock Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className={`absolute bottom-3 left-3 text-xs font-bold px-3 py-1.5 z-10 shadow-lg uppercase tracking-wide ${product.stockStatus === 'coming-soon' ? 'bg-blue-600 text-white' :
                                product.stockStatus === 'out-of-stock' || product.stock === 0 ? 'bg-red-600 text-white' :
                                    product.stock <= 10 ? 'bg-orange-500 text-white' :
                                        'bg-green-600 text-white'
                                }`}
                        >
                            {product.stockStatus === 'coming-soon' ? 'Coming Soon' :
                                product.stockStatus === 'out-of-stock' || product.stock === 0 ? 'Out of Stock' :
                                    product.stock <= 10 ? `Low Stock (${product.stock})` : 'In Stock'}
                        </motion.div>

                        {/* Image with Zoom Effect */}
                        <Link href={`/products/${product.id}`} className="block w-full h-full">
                            <motion.img
                                src={product.images[0]}
                                alt={product.name}
                                className="object-cover w-full h-full"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        </Link>

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleBuyNow}
                                disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                                className="bg-premium-gold text-premium-black p-3 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Buy Now"
                            >
                                <Zap className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsQuickViewOpen(true);
                                }}
                                className="bg-premium-charcoal text-premium-gold border border-premium-gold p-3 rounded-full shadow-lg hover:bg-premium-gold hover:text-premium-black transition-colors"
                            >
                                <Eye className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAddToCart}
                                disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                                className="bg-premium-black text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="h-5 w-5" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow bg-premium-charcoal">
                        <motion.div
                            className="text-xs text-premium-gold font-bold mb-2 uppercase tracking-wide"
                            whileHover={{ scale: 1.05 }}
                        >
                            {product.category}
                        </motion.div>

                        <Link href={`/products/${product.id}`}>
                            <motion.h3
                                className="text-white font-playfair font-bold text-lg mb-3 line-clamp-1 hover:text-premium-gold transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                {product.name}
                            </motion.h3>
                        </Link>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                                <motion.span
                                    className="text-xl font-bold text-gray-100"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    ৳{product.price.toLocaleString()}
                                </motion.span>
                                {product.originalPrice && (
                                    <motion.span
                                        className="text-sm text-gray-500 line-through"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        ৳{product.originalPrice.toLocaleString()}
                                    </motion.span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBuyNow}
                                disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                                className="flex-1 bg-premium-gold text-premium-black text-xs font-bold py-2 rounded shadow-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                                className="flex-1 bg-premium-black text-white text-xs font-bold py-2 rounded shadow-sm border border-gray-700 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Cart
                            </motion.button>
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
