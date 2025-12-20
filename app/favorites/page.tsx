'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useAdmin } from '@/context/AdminContext';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const { products } = useAdmin();

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
        <div className="min-h-screen flex flex-col bg-premium-black text-white">
            <Navbar />

            <main className="flex-grow">
                <div className="bg-gradient-to-b from-premium-charcoal to-premium-black py-16 border-b border-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full border border-red-500/30 mb-6">
                                <Heart className="h-12 w-12 text-red-500 fill-current" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-4">
                                Your <span className="text-red-500">Favorites</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                {favoriteProducts.length > 0
                                    ? `You have ${favoriteProducts.length} favorite ${favoriteProducts.length === 1 ? 'item' : 'items'}`
                                    : 'Start adding products to your favorites'}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {favoriteProducts.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {favoriteProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <ProductCard product={product} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 bg-premium-charcoal/30 rounded-2xl border border-gray-800"
                        >
                            <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-gray-400 mb-4">No Favorites Yet</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Start exploring our products and click the heart icon to save your favorites
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-8 py-4 bg-premium-gold hover:bg-white text-premium-black font-bold rounded-lg shadow-lg transition-colors"
                            >
                                Browse Products
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
