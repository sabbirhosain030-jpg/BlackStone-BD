'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
    trend?: string;
    trendUp?: boolean;
    delay?: number;
}

export default function StatsCard({ label, value, icon: Icon, color, trend, trendUp = true, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <div className="flex items-center justify-between mb-4">
                <motion.div
                    className={`p-3 rounded-lg ${color} bg-opacity-10`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
                </motion.div>
                {trend && (
                    <motion.span
                        className={`text-sm font-medium flex items-center px-2 py-1 rounded-full ${trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                            }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: delay + 0.3, type: 'spring' }}
                    >
                        {trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {trend}
                    </motion.span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
            <motion.p
                className="text-2xl font-bold text-gray-900 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
            >
                {value}
            </motion.p>
        </motion.div>
    );
}
