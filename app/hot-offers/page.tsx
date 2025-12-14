'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAdmin } from '@/context/AdminContext';
import { Crown, ArrowRight, Flame } from 'lucide-react';
import Link from 'next/link';

export default function HotOffersPage() {
    const { hotOffers, products } = useAdmin();

    // Get all products that are discounted OR featured in active hot offers
    const activeHotOffers = hotOffers.filter(offer => offer.isActive);
    const activeOfferIds = activeHotOffers.flatMap(offer => offer.productIds || []);

    // Explicitly find hot offer products: 
    // 1. Discounted products (Original > Price)
    // 2. Products flagged in active Hot Offers
    const hotProducts = products.filter(p =>
        (p.originalPrice && p.price < p.originalPrice) ||
        activeOfferIds.includes(p.id) ||
        p.isHotOffer
    );

    return (
        <div className="min-h-screen flex flex-col bg-premium-black text-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero / Header */}
                <div className="bg-gradient-to-b from-premium-charcoal to-premium-black py-16 border-b border-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute top-8 left-8">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-black/50 hover:bg-premium-gold text-white hover:text-black p-3 rounded-full border border-gray-700 hover:border-premium-gold transition-all backdrop-blur-sm group"
                            >
                                <ArrowRight className="h-6 w-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block p-4 rounded-full bg-premium-gold/10 border border-premium-gold/30 mb-6"
                        >
                            <Crown className="h-12 w-12 text-premium-gold" />
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
                            <span className="text-premium-gold">Exclusive</span> Hot Offers
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Limited time deals and premium collection discounts. Grab them while they last.
                        </p>
                    </div>
                </div>

                {/* Offer Banners / Categories if any (Simplified to Grid for now) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {hotProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {hotProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-premium-charcoal/30 rounded-2xl border border-gray-800">
                            <Flame className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-400">No Active Offers Currently</h2>
                            <p className="text-gray-500 mt-2">Check back soon for exclusive deals.</p>
                            <Link href="/products" className="inline-block mt-6 text-premium-gold hover:underline">
                                Browse All Products
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
