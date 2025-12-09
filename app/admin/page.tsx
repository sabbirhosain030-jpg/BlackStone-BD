'use client';

import { motion } from 'framer-motion';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { products, orders, customers } from '@/lib/data';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminDashboard() {
    // Calculate real stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;

    const stats = [
        { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+12%' },
        { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, color: 'bg-blue-500', trend: '+8%' },
        { label: 'Products', value: totalProducts.toString(), icon: Package, color: 'bg-purple-500', trend: '+2%' },
        { label: 'Customers', value: totalCustomers.toString(), icon: Users, color: 'bg-orange-500', trend: '+15%' },
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Overview
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={stat.label}
                        {...stat}
                        delay={index * 0.1}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.slice(0, 5).map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        whileHover={{ backgroundColor: '#f9fafb', scale: 1.01 }}
                                        className="cursor-pointer"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <motion.span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </motion.span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">৳{order.total.toLocaleString()}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
                    <div className="space-y-4">
                        {products.slice(0, 4).map((product, index) => (
                            <motion.div
                                key={product.id}
                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ x: 5, scale: 1.02 }}
                            >
                                <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{product.reviews} Sales</p>
                                    <p className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
