'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import HotOffersBanner from '@/components/HotOffersBanner';
import HotOffersSection from '@/components/HotOffersSection';
import TrendingFashion from '@/components/TrendingFashion';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, RefreshCw, Award, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const { hotOffers, products, settings } = useAdmin();
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Smart Product Sections Logic
    // 1. Filter out Hot Offers from other sections (Exclusivity)
    const regularProducts = products.filter(p => !p.isHotOffer);

    // 2. New Arrivals (Sorted by date, newest first)
    const newArrivals = [...regularProducts]
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 8);

    // 3. Featured Collection (Manually marked as featured)
    const featuredProducts = regularProducts
        .filter(p => p.isFeatured)
        .slice(0, 8);

    // 4. Best Selling (Sorted by totalSales, highest first)
    const bestSellingProducts = [...regularProducts]
        .sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))
        .slice(0, 8);

    const features = [
        {
            icon: Shield,
            title: 'Secure Payment',
            description: 'Cash on Delivery',
        },
        {
            icon: Truck,
            title: 'Fast Shipping',
            description: 'Nationwide Delivery',
        },
        {
            icon: RefreshCw,
            title: 'Easy Returns',
            description: '7 Day Return Policy',
        },
        {
            icon: Award,
            title: 'Premium Quality',
            description: '100% Authentic',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-premium-black">
            {/* Hot Offers Banner */}
            <HotOffersBanner />

            <Navbar />

            <main className="flex-grow">
                <Hero />

                {/* BlackStone BD Animation Section */}
                <AnimatedSection className="py-24 bg-gradient-to-br from-black via-premium-charcoal to-black relative overflow-hidden border-y border-gray-900">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-premium-gold/5 rounded-full blur-xl"
                                style={{
                                    width: Math.random() * 300 + 50,
                                    height: Math.random() * 300 + 50,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, Math.random() * 100 - 50],
                                    x: [0, Math.random() * 100 - 50],
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                        >
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-premium-gold via-white to-premium-gold mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                BlackStone<span className="text-premium-gold">BD</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light tracking-wide px-4 font-playfair"
                        >
                            Redefining Premium E-Commerce
                        </motion.p>
                    </div>
                </AnimatedSection>

                {/* 1. New Arrivals Section */}
                {settings.appearance?.sections?.newArrivals !== false && (
                    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="text-center mb-12">
                                <motion.h2
                                    className="text-4xl font-bold font-playfair text-white"
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    New Arrivals
                                </motion.h2>
                                <motion.p
                                    className="text-gray-400 mt-3 text-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    The latest additions to our store
                                </motion.p>
                            </div>
                        </AnimatedSection>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {newArrivals.map((product, index) => (
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

                        <div className="mt-12 text-center">
                            <Link href="/products?sort=newest">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-premium-gold text-premium-black font-bold rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                                >
                                    View New Arrivals only
                                </motion.button>
                            </Link>
                        </div>
                    </section>
                )}

                {/* 2. Featured Collection */}
                {settings.appearance?.sections?.categories !== false && (
                    <section className="py-20 bg-premium-charcoal border-y border-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <AnimatedSection>
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold font-playfair text-premium-gold">Featured Collection</h2>
                                    <p className="text-gray-400 mt-3 text-lg">Handpicked favorites just for you</p>
                                </div>
                            </AnimatedSection>

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {featuredProducts.map((product, index) => (
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

                            <div className="mt-12 text-center">
                                <Link href="/products">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-premium-black text-premium-gold border border-premium-gold font-bold rounded-full hover:bg-premium-gold hover:text-premium-black transition-colors shadow-lg"
                                    >
                                        View All Products
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. Hot Offer Section with Timer (Admin Controlled) */}
                {settings.appearance?.sections?.hotOffers !== false && (
                    <HotOffersSection />
                )}

                {/* 4. Best Selling Products */}
                <section className="py-20 bg-premium-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="text-center mb-12">
                                <motion.h2
                                    className="text-4xl font-bold font-playfair text-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    Best Selling Products
                                </motion.h2>
                                <p className="text-gray-400 mt-3 text-lg">
                                    Our most popular items loved by customers
                                </p>
                            </div>
                        </AnimatedSection>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {bestSellingProducts.map((product, index) => (
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

                        <div className="mt-12 text-center">
                            <Link href="/products?sort=best-selling">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gradient-to-r from-premium-gold via-yellow-500 to-premium-gold text-premium-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all shadow-lg"
                                >
                                    View Best Selling Products
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 5. Trending Fashion */}
                {settings.appearance?.sections?.trending !== false && (
                    <TrendingFashion />
                )}

                {/* Features Section */}
                <AnimatedSection className="py-16 bg-premium-charcoal border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="text-center group p-6 rounded-xl hover:bg-premium-black/50 transition-colors">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-black text-premium-gold mb-4 group-hover:bg-premium-gold group-hover:text-premium-black transition-colors border border-gray-800 group-hover:border-premium-gold">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 font-playfair">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </main>

            <Footer />
        </div>
    );
}
