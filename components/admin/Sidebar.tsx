'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/categories', label: 'Categories', icon: Package },
        { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
        { href: '/admin/customers', label: 'Customers', icon: Users },
        { href: '/admin/hot-offers', label: 'Hot Offers', icon: TrendingUp },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.div
            className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen text-white flex flex-col shadow-2xl"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div
                className="p-6 border-b border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Link href="/admin" className="text-2xl font-bold tracking-tight">
                    BlackStone<span className="text-blue-500">BD</span>
                </Link>
                <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
            </motion.div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index + 0.4 }}
                        >
                            <Link href={item.href}>
                                <motion.div
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        animate={isActive ? { rotate: 360 } : {}}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Icon className="h-5 w-5 mr-3" />
                                    </motion.div>
                                    {item.label}
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            <motion.div
                className="p-4 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <motion.button
                    className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
