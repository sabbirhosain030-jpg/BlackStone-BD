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
import { getFeaturedProducts, getNewArrivals, getBestSellingProducts } from '@/lib/data';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, RefreshCw, Award, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const featuredProducts = getFeaturedProducts();
    const newArrivals = getNewArrivals();
    const bestSellingProducts = getBestSellingProducts();
    const { hotOffers, products } = useAdmin();
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            {/* Hot Offers Banner */}
            <HotOffersBanner />

            <Navbar />

            <main className="flex-grow">
                <Hero />

                {/* BlackStone BD Animation Section */}
                <AnimatedSection className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-blue-500/10 rounded-full blur-xl"
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
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                BlackStone<span className="text-blue-500">BD</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl sm:text-2xl md:text-3xl text-blue-200 font-light tracking-wide px-4"
                        >
                            Redefining Premium E-Commerce
                        </motion.p>
                    </div>
                </AnimatedSection>

                {/* i. New Arrivals Section (Moved to Top) */}
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                New Arrivals
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 mt-3 text-lg"
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

                    {/* Animated Button for New Arrivals */}
                    <div className="mt-12 text-center">
                        <Link href="/products?sort=newest">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                            >
                                View New Arrivals only
                            </motion.button>
                        </Link>
                    </div>
                </section>

                {/* ii. Best Selling Products */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="text-center mb-12">
                                <motion.h2
                                    className="text-4xl font-bold text-gray-900"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    Best Selling Products
                                </motion.h2>
                                <p className="text-gray-600 mt-3 text-lg">
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
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
                                >
                                    View Best Selling Products
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* iii. Trending Fashion */}
                <TrendingFashion />

                {/* Hot Offer Page Link Section */}
                <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Flame className="h-16 w-16 text-yellow-300 mx-auto mb-4 animate-bounce" />
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't Miss Out on Hot Offers!</h2>
                            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                                Exclusive deals and limited-time discounts are waiting for you. Grab them before they're gone!
                            </p>
                            <Link href="/products?filter=hot-offers">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-white text-orange-600 font-bold text-lg rounded-full shadow-2xl hover:bg-gray-100 transition-colors"
                                >
                                    View All Hot Offers
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Products Section (Retained but updated) */}
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">Featured Collection</h2>
                            <p className="text-gray-600 mt-3 text-lg">Handpicked favorites just for you</p>
                        </div>
                    </AnimatedSection>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>

                    <div className="mt-12 text-center">
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                View All Products
                            </motion.button>
                        </Link>
                    </div>
                </section>

                {/* Categories Banner */}
                <AnimatedSection>
                    <section className="py-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%]">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ backgroundSize: '200% 200%' }}
                            />
                        </div>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-4xl font-bold text-white mb-8 relative z-10">Shop by Category</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                <Link href="/products?category=Electronics" className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group">
                                    <h3 className="text-2xl font-bold text-white mb-2">Electronics</h3>
                                    <p className="text-blue-100 group-hover:text-white">Latest Gadgets &rarr;</p>
                                </Link>
                                <Link href="/products?category=Fashion" className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group">
                                    <h3 className="text-2xl font-bold text-white mb-2">Fashion</h3>
                                    <p className="text-blue-100 group-hover:text-white">Trendy Styles &rarr;</p>
                                </Link>
                                <Link href="/products?category=Accessories" className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group">
                                    <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                                    <p className="text-blue-100 group-hover:text-white">Premium Items &rarr;</p>
                                </Link>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Features Section */}
                <AnimatedSection className="py-16 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
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
