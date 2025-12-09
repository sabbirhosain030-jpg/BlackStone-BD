'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import HotOffersBanner from '@/components/HotOffersBanner';
import { getFeaturedProducts, getNewArrivals } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, RefreshCw, Award, Play } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const featuredProducts = getFeaturedProducts();
    const newArrivals = getNewArrivals();
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
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                BlackStone<span className="text-blue-500">BD</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide"
                        >
                            Redefining Premium E-Commerce
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 flex justify-center gap-4"
                        >
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
                        </motion.div>
                    </div>
                </AnimatedSection>

                {/* Features Section */}
                <AnimatedSection className="py-16 bg-white border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="text-center group"
                                >
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4 shadow-lg shadow-blue-500/30"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <feature.icon className="h-8 w-8" />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </AnimatedSection>

                {/* Featured Products Section */}
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <motion.h2
                                    className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    Featured Collection
                                </motion.h2>
                                <motion.p
                                    className="text-gray-600 mt-3 text-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Handpicked favorites just for you
                                </motion.p>
                            </div>
                            <motion.div whileHover={{ x: 5 }}>
                                <Link
                                    href="/products"
                                    className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group"
                                >
                                    View All
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </div>
                    </AnimatedSection>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-10 md:hidden text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/products" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </motion.div>
                </section>

                {/* Banner Section */}
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

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative z-10 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-20 sm:px-16 sm:py-28">
                                <div className="text-center">
                                    <motion.h2
                                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        Experience Premium Shopping
                                    </motion.h2>
                                    <motion.p
                                        className="mx-auto max-w-3xl text-xl text-blue-100"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Join thousands of satisfied customers who trust BlackStone BD for quality, reliability, and exceptional service.
                                    </motion.p>
                                    <motion.div
                                        className="mt-10 flex justify-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href="/products"
                                                className="rounded-full bg-white px-10 py-4 text-base font-bold text-blue-600 shadow-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Start Shopping
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* New Arrivals Section */}
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <motion.h2
                                    className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
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
                        </div>
                    </AnimatedSection>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        {newArrivals.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>
                </section>

                {/* Electronics Category Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Best in Electronics</h2>
                                    <p className="text-gray-600 mt-2">Latest gadgets and devices</p>
                                </div>
                                <Link href="/products?category=Electronics" className="text-blue-600 font-bold hover:text-blue-700 flex items-center">
                                    View All <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.filter(p => p.category === 'Electronics').slice(0, 4).map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fashion Category Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Trending Fashion</h2>
                                    <p className="text-gray-600 mt-2">Upgrade your style</p>
                                </div>
                                <Link href="/products?category=Fashion" className="text-blue-600 font-bold hover:text-blue-700 flex items-center">
                                    View All <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.filter(p => p.category === 'Clothing' || p.category === 'Accessories').slice(0, 4).map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
