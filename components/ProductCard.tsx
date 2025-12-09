'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, 1);

        // Reset animation state
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col">
                <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {/* Badges */}
                    {product.isNew && (
                        <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                            className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg"
                        >
                            NEW
                        </motion.span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <motion.span
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                            className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg"
                        >
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </motion.span>
                    )}

                    {/* Stock Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`absolute bottom-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg ${product.stock === 0
                            ? 'bg-red-500 text-white'
                            : product.stock <= 10
                                ? 'bg-yellow-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}
                    >
                        {product.stock === 0 ? 'Out of Stock' : product.stock <= 10 ? `Low Stock (${product.stock})` : 'In Stock'}
                    </motion.div>

                    {/* Image with Zoom Effect */}
                    <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />

                    {/* Overlay on Hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                    <motion.div
                        className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wide"
                        whileHover={{ scale: 1.05 }}
                    >
                        {product.category}
                    </motion.div>

                    <Link href={`/products/${product.id}`}>
                        <motion.h3
                            className="text-gray-900 font-bold text-lg mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors"
                            whileHover={{ x: 5 }}
                        >
                            {product.name}
                        </motion.h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            <motion.span
                                className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.1 }}
                            >
                                ৳{product.price.toLocaleString()}
                            </motion.span>
                            {product.originalPrice && (
                                <motion.span
                                    className="text-sm text-gray-400 line-through"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    ৳{product.originalPrice.toLocaleString()}
                                </motion.span>
                            )}
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            whileHover={product.stock > 0 ? { scale: 1.1, rotate: 5 } : {}}
                            whileTap={product.stock > 0 ? { scale: 0.9 } : {}}
                            animate={isAdding ? { scale: [1, 1.3, 1] } : {}}
                            className={`p-3 rounded-full transition-all duration-300 shadow-lg ${product.stock === 0
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-600/30 hover:shadow-blue-600/50'
                                }`}
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
