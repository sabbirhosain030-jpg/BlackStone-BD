'use client';

import { motion } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function HotOffersBanner() {
    const { settings } = useAdmin();
    const [isVisible, setIsVisible] = useState(true);

    // Initial check for visibility from settings (safe access)
    const showBanner = settings?.appearance?.showBanner ?? true;
    const bannerText = settings?.appearance?.bannerText || "Exclusive offers available now!";

    if (!isVisible) return null;
    if (!showBanner) return null;

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="relative bg-gradient-to-r from-black via-premium-charcoal to-black text-premium-gold overflow-hidden border-b border-premium-gold/30 shadow-lg shadow-premium-gold/10"
        >
            <div className="relative h-12 sm:h-10 flex items-center">
                {/* Scrolling Text */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Repeat text multiple times for continuous scroll effect */}
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4 sm:mx-8">
                            <Flame className="h-4 w-4 sm:h-4 sm:w-4 mr-2 flex-shrink-0 text-premium-gold fill-premium-gold/20" />
                            <span className="font-bold text-xs sm:text-sm text-premium-gold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {bannerText}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-premium-gold/10 rounded-full p-1 transition-colors text-premium-gold/70 hover:text-premium-gold"
                aria-label="Close banner"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
