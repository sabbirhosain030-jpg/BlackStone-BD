'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
    name: string;
    description: string;
    icon: LucideIcon;
    productCount: number;
    href: string;
    gradient: string;
}

export default function CategoryCard({ name, description, icon: Icon, productCount, href, gradient }: CategoryCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${gradient}`}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="absolute -right-4 -top-4 opacity-10"
                >
                    <Icon className="h-32 w-32" />
                </motion.div>

                <div className="relative z-10">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-4"
                    >
                        <Icon className="h-12 w-12 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-white/90 text-sm mb-4">{description}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm font-medium">
                            {productCount} Products
                        </span>
                        <motion.span
                            whileHover={{ x: 5 }}
                            className="text-white font-semibold"
                        >
                            Explore →
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
