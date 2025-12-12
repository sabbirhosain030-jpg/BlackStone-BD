'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';
import { HotOffer, Product } from '@/types';
import ProductCard from './ProductCard';

interface HotOffersSectionProps {
    offers: HotOffer[];
    products: Product[];
}

export default function HotOffersSection({ offers, products }: HotOffersSectionProps) {
    // Filter for active offers only
    const activeOffers = offers.filter(offer => offer.isActive);

    // Check if we have any active offers
    const hasActiveOffers = activeOffers.length > 0;

    // Get products that match hot offer criteria (could be enhanced with specific product IDs in offers)
    const hotOfferProducts = hasActiveOffers
        ? products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4)
        : [];

    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-orange-400/10 rounded-full blur-xl"
                        style={{
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 50 - 25],
                            x: [0, Math.random() * 50 - 25],
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Flame className="h-12 w-12 text-orange-600" />
                        </motion.div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        🔥 Hot Offers
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {hasActiveOffers
                            ? "Don't miss out on these exclusive deals - limited time only!"
                            : "Exciting offers are on the way!"}
                    </p>
                </motion.div>

                {hasActiveOffers && hotOfferProducts.length > 0 ? (
                    <>
                        {/* Active Offers Display */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {hotOfferProducts.map((product, index) => (
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

                        {/* View All Button */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-orange-500/30 transition-all"
                                >
                                    View All Hot Offers
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </>
                ) : (
                    /* Coming Soon State */
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center border-2 border-dashed border-orange-300 shadow-xl">
                            <motion.div
                                className="mb-6"
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Sparkles className="h-20 w-20 text-orange-500 mx-auto" />
                            </motion.div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Coming Soon!
                            </h3>

                            <p className="text-gray-600 text-lg mb-8">
                                Amazing deals are being prepared just for you. Stay tuned for exclusive hot offers!
                            </p>

                            <div className="flex items-center justify-center gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-3 w-3 bg-orange-500 rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-6 -right-6 bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform rotate-12"
                            animate={{
                                rotate: [12, 18, 12],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            🎁 Soon
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
