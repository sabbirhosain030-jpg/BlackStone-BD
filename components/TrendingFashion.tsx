'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useAdmin } from '@/context/AdminContext';

export default function TrendingFashion() {
    const { trendingItems } = useAdmin();
    const hasItems = trendingItems.length > 0;

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-4xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Trending Fashion
                    </motion.h2>
                    <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Curated styles just for you
                    </motion.p>
                </div>

                {!hasItems ? (
                    <motion.div
                        className="max-w-md mx-auto text-center p-10 bg-white rounded-2xl shadow-sm border border-gray-100"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block mb-4"
                        >
                            <Sparkles className="h-12 w-12 text-blue-500" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon...</h3>
                        <p className="text-gray-500">
                            Our stylists are curation the best looks for you. Stay tuned!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {trendingItems.filter(item => item.isActive).map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="group relative rounded-2xl overflow-hidden shadow-lg h-[400px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm self-start px-3 py-1 rounded-full mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                        <Link href={`/products?category=${item.category}`} className="inline-flex items-center text-sm font-medium mt-2 hover:text-blue-300">
                                            Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
