'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Shirt, Watch, Footprints, Briefcase, Sparkles, Home as HomeIcon } from 'lucide-react';

const categories = [
    {
        name: 'Electronics',
        description: 'Latest gadgets and electronic devices',
        icon: Sparkles,
        productCount: 24,
        href: '/products?category=Electronics',
        gradient: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    },
    {
        name: 'Watches',
        description: 'Premium timepieces for the modern professional',
        icon: Watch,
        productCount: 18,
        href: '/products?category=Watches',
        gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
        name: 'Footwear',
        description: 'Step up your style with our collection',
        icon: Footprints,
        productCount: 32,
        href: '/products?category=Footwear',
        gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
        name: 'Accessories',
        description: 'Complete your look with our accessories',
        icon: Briefcase,
        productCount: 28,
        href: '/products?category=Accessories',
        gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
    },
    {
        name: 'Clothing',
        description: 'Trendy clothing for every style',
        icon: Shirt,
        productCount: 15,
        href: '/products?category=Clothing',
        gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
        name: 'Home & Living',
        description: 'Elevate your living space',
        icon: HomeIcon,
        productCount: 21,
        href: '/products?category=Home',
        gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    },
];


export default function CategoriesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjR6bS0yIDMyYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Explore Our <span className="text-blue-400">Categories</span>
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-300 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Discover premium products across our carefully curated collections
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Browse by Category
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Find exactly what you&apos;re looking for
                            </p>
                        </div>
                    </AnimatedSection>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <CategoryCard {...category} />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* CTA Section */}
                <AnimatedSection>
                    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                whileInView={{ scale: [0.9, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-white mb-6">
                                    Can&apos;t Find What You&apos;re Looking For?
                                </h2>
                                <p className="text-xl text-blue-100 mb-8">
                                    Browse our entire collection or contact our support team
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.a
                                        href="/products"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        View All Products
                                    </motion.a>
                                    <motion.a
                                        href="/contact"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
                                    >
                                        Contact Us
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            <Footer />
        </div>
    );
}
