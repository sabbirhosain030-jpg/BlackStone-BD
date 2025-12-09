'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCarousel from './ProductCarousel';
import { getHotProducts, getNewArrivals } from '@/lib/data';

export default function Hero() {
    const hotProducts = getHotProducts();
    const newArrivals = getNewArrivals();
    const showCarousel = hotProducts.length > 0 || newArrivals.length > 0;

    return (
        <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-blue-900/90 to-gray-900/95"></div>

                {/* Animated Floating Elements */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-6"
                            >
                                <Sparkles className="h-4 w-4 text-blue-400" />
                                <span className="text-blue-300 text-sm font-medium">Premium Quality Products</span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                Elevate Your{' '}
                                <br />
                                <motion.span
                                    className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    Lifestyle
                                </motion.span>{' '}
                                Today
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="text-lg text-gray-300 mb-8 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Discover a curated collection of premium products designed to enhance your everyday life.
                                Quality, style, and performance - delivered to your door.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 border border-transparent text-base font-bold rounded-full text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all md:text-lg group"
                                    >
                                        Shop Now
                                        <motion.span
                                            className="ml-2"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.span>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/categories"
                                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-base font-bold rounded-full text-white hover:bg-white/10 transition-all md:text-lg"
                                    >
                                        Explore Categories
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side - Product Carousel */}
                    {showCarousel && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="hidden lg:block h-[500px]"
                        >
                            {hotProducts.length > 0 ? (
                                <ProductCarousel
                                    products={hotProducts}
                                    title="🔥 Hot Deals"
                                    autoPlayInterval={5000}
                                />
                            ) : (
                                <ProductCarousel
                                    products={newArrivals}
                                    title="✨ New Arrivals"
                                    autoPlayInterval={5000}
                                />
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Bottom Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)" />
                </svg>
            </div>
        </div>
    );
}
