'use client';

import { motion } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import { useState } from 'react';

const offers = [
    "🔥 Hot Deal: 50% OFF on Fashion Items - Limited Time!",
    "⚡ Flash Sale: Buy 2 Get 1 FREE on Accessories",
    "🎁 New Arrivals: Premium Watches Now Available",
    "💰 Special Offer: Free Shipping on Orders Above ৳5000",
    "🌟 Weekend Special: Extra 20% OFF on All Categories",
];

export default function HotOffersBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="relative bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-900 text-white overflow-hidden border-b border-cyan-500/30 shadow-lg shadow-cyan-500/20"
        >
            <div className="relative h-12 sm:h-10 flex items-center">
                {/* Scrolling Text */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -2000],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...offers, ...offers, ...offers].map((offer, index) => (
                        <div key={index} className="flex items-center mx-4 sm:mx-8">
                            <Flame className="h-4 w-4 sm:h-4 sm:w-4 mr-2 flex-shrink-0 text-white fill-cyan-400" />
                            <span className="font-bold text-xs sm:text-sm text-white drop-shadow-lg">{offer}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close banner"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
