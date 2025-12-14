'use client';

import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustBadges() {
    const badges = [
        { icon: ShieldCheck, title: 'Premium Quality', desc: 'Certified authentic products' },
        { icon: Truck, title: 'Express Delivery', desc: 'Fast shipping nationwide' },
        { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
        { icon: CreditCard, title: 'Secure Payment', desc: 'Cash on delivery available' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-gray-800 my-8">
            {badges.map((badge, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-gray-900/50 rounded-xl hover:bg-gray-800 hover:shadow-md transition-all border border-transparent hover:border-premium-gold/20 group"
                >
                    <div className="p-3 bg-gray-800 rounded-full shadow-sm mb-3 group-hover:bg-premium-black transition-colors">
                        <badge.icon className="h-6 w-6 text-premium-gold" />
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1 font-playfair">{badge.title}</h4>
                    <p className="text-xs text-gray-400">{badge.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
