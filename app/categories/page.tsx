'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { User, Heart, UserCircle, Users, Gem, ArrowRight } from 'lucide-react';

const categories = [
    {
        name: "Men's",
        description: "Premium men's clothing and fashion",
        icon: User,
        productCount: 24,
        href: "/products?category=Men's",
        gradient: 'bg-premium-charcoal border border-gray-700 hover:border-premium-gold',
    },
    {
        name: "Women's",
        description: "Elegant women's clothing collection",
        icon: Heart,
        productCount: 32,
        href: "/products?category=Women's",
        gradient: 'bg-premium-charcoal border border-gray-700 hover:border-premium-gold',
    },
    {
        name: 'Boys',
        description: "Stylish clothing for boys",
        icon: UserCircle,
        productCount: 18,
        href: '/products?category=Boys',
        gradient: 'bg-premium-charcoal border border-gray-700 hover:border-premium-gold',
    },
    {
        name: 'Girls',
        description: "Beautiful clothing for girls",
        icon: Users,
        productCount: 22,
        href: '/products?category=Girls',
        gradient: 'bg-premium-charcoal border border-gray-700 hover:border-premium-gold',
    },
    {
        name: 'Accessories',
        description: 'Watches, bags, jewelry, and more',
        icon: Gem,
        productCount: 28,
        href: '/products?category=Accessories',
        gradient: 'bg-premium-charcoal border border-gray-700 hover:border-premium-gold',
    },
];


export default function CategoriesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-premium-black text-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-black via-premium-charcoal to-black text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjR6bS0yIDMyYzAtMiAyLTQgNC00cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold mb-6 font-playfair"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                {/* Mobile-friendly Back Button */}
                                <div className="flex items-center justify-center gap-4 mb-4 md:mb-0">
                                    <Link
                                        href="/products"
                                        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white border border-white/20 group text-base md:text-lg font-medium"
                                    >
                                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                        <span className="hidden sm:inline">Back to Products</span>
                                        <span className="sm:hidden">Back</span>
                                    </Link>
                                </div>
                                <div>
                                    Explore Our <span className="text-premium-gold">Categories</span>
                                </div>
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-400 max-w-2xl mx-auto"
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
                            <h2 className="text-4xl font-bold text-white mb-4 font-playfair">
                                Browse by Category
                            </h2>
                            <p className="text-gray-400 text-lg">
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
                    <section className="py-20 bg-premium-charcoal border-t border-gray-800">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                whileInView={{ scale: [0.9, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-white mb-6 font-playfair">
                                    Can&apos;t Find What You&apos;re Looking For?
                                </h2>
                                <p className="text-xl text-gray-400 mb-8">
                                    Browse our entire collection or contact our support team
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.a
                                        href="/products"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-premium-gold text-premium-black rounded-full font-bold shadow-lg hover:bg-white transition-colors"
                                    >
                                        View All Products
                                    </motion.a>
                                    <motion.a
                                        href="/contact"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 border-2 border-premium-gold text-premium-gold rounded-full font-bold hover:bg-premium-gold hover:text-premium-black transition-colors"
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
