'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Globe, Target, Heart } from 'lucide-react';

export default function AboutPage() {
    const values = [
        {
            icon: Shield,
            title: 'Trust & Security',
            description: 'We prioritize your data security and ensure secure transactions',
        },
        {
            icon: Award,
            title: 'Quality Assurance',
            description: '100% authentic products with quality guarantee',
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Dedicated support team available to assist you 24/7',
        },
        {
            icon: Globe,
            title: 'Nationwide Delivery',
            description: 'Fast and reliable delivery across Bangladesh',
        },
    ];

    const team = [
        { name: 'Sabbir Hosain', role: 'Founder & Developer', image: '/team/sabbir.jpg' },
        { name: 'Team Member 2', role: 'Operations Manager', image: '/team/member2.jpg' },
        { name: 'Team Member 3', role: 'Customer Support', image: '/team/member3.jpg' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjR6bS0yIDMyYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                About <span className="text-blue-400">BlackStone BD</span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Your trusted partner in premium e-commerce, delivering quality products across Bangladesh
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <AnimatedSection className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Target className="h-8 w-8 text-blue-600" />
                                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                At BlackStone BD, we&apos;re committed to revolutionizing online shopping in Bangladesh by providing authentic, high-quality products with exceptional customer service.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We believe in building lasting relationships with our customers through trust, transparency, and dedication to excellence.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
                        >
                            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Heart className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                                    <span>Premium quality products from trusted brands</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                                    <span>Secure cash on delivery payment option</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                                    <span>Fast and reliable nationwide delivery</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Heart className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                                    <span>Dedicated customer support team</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </AnimatedSection>

                {/* Values Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-xl text-gray-600">Principles that guide everything we do</p>
                        </AnimatedSection>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg text-center"
                                >
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <value.icon className="h-8 w-8" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <AnimatedSection>
                    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-white mb-6">
                                    Ready to Experience Premium Shopping?
                                </h2>
                                <p className="text-xl text-blue-100 mb-8">
                                    Join thousands of satisfied customers across Bangladesh
                                </p>
                                <motion.a
                                    href="/products"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all"
                                >
                                    Start Shopping Now
                                </motion.a>
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            <Footer />
        </div >
    );
}
