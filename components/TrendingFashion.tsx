'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TrendingFashionProps {
    items?: any[]; // Replace with proper type when admin integration is ready
}

export default function TrendingFashion({ items = [] }: TrendingFashionProps) {
    const hasItems = items.length > 0;

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
                            Our stylists are minimizing the best looks for you. Stay tuned!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Implemented when items structure is defined */}
                        {items.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg shadow">
                                <p>Trending Item {idx + 1}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
