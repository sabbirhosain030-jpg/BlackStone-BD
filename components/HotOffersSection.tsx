'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Flame, ArrowRight, Sparkles, Clock, Crown, ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAdmin } from '@/context/AdminContext';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    endDate: string;
}

function CountdownTimer({ endDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(endDate).getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className="flex justify-center gap-4 sm:gap-6">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds },
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <motion.div
                        className="bg-gradient-to-b from-red-900/40 to-black border border-orange-500/30 rounded-lg p-4 sm:p-5 min-w-[70px] sm:min-w-[90px] shadow-[0_0_15px_rgba(255,69,0,0.2)] relative overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-orange-500/10"
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="relative z-10 text-3xl sm:text-4xl font-bold font-serif text-white block text-center drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">
                            {String(item.value).padStart(2, '0')}
                        </span>
                    </motion.div>
                    <span className="text-xs sm:text-sm text-orange-500 uppercase tracking-widest mt-2 font-bold">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function HotOffersSection() {
    const { hotOffers, products } = useAdmin();

    // Filter for active offers only
    const activeOffers = hotOffers.filter(offer => offer.isActive);
    const hasActiveOffers = activeOffers.length > 0;
    const currentOffer = activeOffers[0];

    // Get products that match hot offer criteria (products with original price > price)
    const hotOfferProducts = hasActiveOffers
        ? products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4)
        : [];

    return (
        <section className="py-24 bg-premium-black relative overflow-hidden border-y border-premium-gold/20">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-premium-gold/10 via-premium-charcoal/30 to-transparent opacity-60" />
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-premium-gold/5 rounded-full blur-3xl"
                        style={{
                            width: Math.random() * 400 + 100,
                            height: Math.random() * 400 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.1, 1],
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
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-premium-gold" />
                        <Crown className="h-8 w-8 text-premium-gold" />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-premium-gold" />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
                        <span className="text-premium-gold">Exclusive</span> Offers
                    </h2>
                    <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto font-sans">
                        {hasActiveOffers
                            ? "Discover our premium selection at exceptional value."
                            : "New exclusive collections arriving soon."}
                    </p>
                </motion.div>

                {hasActiveOffers && hotOfferProducts.length > 0 ? (
                    <>
                        {/* Countdown Timer */}
                        {currentOffer && (
                            <motion.div
                                className="mb-20"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-center mb-8">
                                    <span className="inline-block px-6 py-2 border border-premium-gold/30 rounded-full bg-premium-gold/10 text-premium-gold font-medium tracking-widest text-sm uppercase">
                                        Time Limited Offer
                                    </span>
                                </div>
                                <CountdownTimer endDate={currentOffer.timerEndDate || currentOffer.endDate} />
                            </motion.div>
                        )}

                        {/* Active Offers Display */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15,
                                    },
                                },
                            }}
                        >
                            {hotOfferProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
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
                            <Link href="/hot-offers">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-4 bg-premium-gold text-premium-black font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-white transition-all border border-premium-gold"
                                >
                                    View All Offers
                                </motion.button>
                            </Link>
                        </motion.div>
                    </>
                ) : (
                    /* Coming Soon State */
                    <motion.div
                        className="relative max-w-3xl mx-auto text-center py-20 bg-premium-charcoal/50 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Crown className="h-16 w-16 text-premium-gold mx-auto mb-6 opacity-80" />
                        <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                            Preparing Exclusive Deals
                        </h3>
                        <p className="text-gray-400 font-light text-lg">
                            Curating the finest selection for our upcoming showcase.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
