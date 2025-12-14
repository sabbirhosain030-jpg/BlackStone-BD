'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

import { useAdmin } from '@/context/AdminContext';

export default function TrendingFashion() {
    const { trendingItems } = useAdmin();
    const hasItems = trendingItems.length > 0;

    return (
        <section className="py-24 bg-gradient-to-b from-premium-charcoal to-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-premium-gold/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-premium-gold/30 bg-premium-gold/5 text-premium-gold text-sm font-medium mb-6 uppercase tracking-widest"
                    >
                        <Star className="h-4 w-4" />
                        <span>Curated Selections</span>
                        <Star className="h-4 w-4" />
                    </motion.div>

                    <motion.h2
                        className="text-5xl font-bold font-playfair text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Trending Fashion
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg max-w-2xl mx-auto font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Define your style with our most sought-after collections, curated for the modern connoisseur.
                    </motion.p>
                </div>

                {!hasItems ? (
                    <motion.div
                        className="max-w-md mx-auto text-center p-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block mb-6"
                        >
                            <Sparkles className="h-12 w-12 text-premium-gold" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-3">Coming Soon...</h3>
                        <p className="text-gray-400">
                            Our stylists are curating the best looks for you. Stay tuned!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {trendingItems.filter(item => item.isActive).map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="group relative rounded-xl overflow-hidden h-[500px] border border-gray-800"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                    >
                                        <span className="inline-block px-3 py-1 bg-premium-gold text-black text-xs font-bold uppercase tracking-wider mb-3">
                                            {item.category}
                                        </span>
                                        <h3 className="text-3xl font-playfair font-bold text-white mb-2">{item.title}</h3>

                                        <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 ease-out">
                                            <Link href={`/products?category=${item.category}`} className="inline-flex items-center text-premium-gold hover:text-white transition-colors mt-4 font-medium uppercase tracking-wide text-sm border-b border-premium-gold pb-1">
                                                Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
