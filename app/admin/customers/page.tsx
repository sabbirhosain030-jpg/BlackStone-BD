'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, Calendar, ShoppingBag, Users, UserCheck, DollarSign, UserPlus } from 'lucide-react';
import { customers as initialCustomers } from '@/lib/data';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    // Calculate stats
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const newCustomers = customers.filter(c => {
        const joinDate = new Date(c.joinDate);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length;

    const stats = [
        { label: 'Total Customers', value: totalCustomers.toString(), icon: Users, color: 'bg-blue-500', trend: '+12%' },
        { label: 'Active Customers', value: activeCustomers.toString(), icon: UserCheck, color: 'bg-green-500', trend: '+5%' },
        { label: 'Total Spent', value: `৳${totalSpent.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500', trend: '+8%' },
        { label: 'New This Month', value: newCustomers.toString(), icon: UserPlus, color: 'bg-orange-500', trend: '+2%' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Customers
                </motion.h1>
                <div className="flex gap-4">
                    <button className="bg-premium-charcoal border border-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 hover:text-white transition-colors shadow-sm">
                        <Filter className="h-5 w-5 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={stat.label}
                        {...stat}
                        delay={index * 0.1}
                    />
                ))}
            </div>

            <motion.div
                className="bg-premium-charcoal rounded-xl shadow-md border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="p-4 border-b border-gray-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer, index) => (
                                    <motion.tr
                                        key={customer.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-premium-charcoal hover:bg-gray-800 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center text-white font-bold">
                                                    {customer.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">{customer.name}</div>
                                                    <div className="text-sm text-gray-400 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {customer.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-300 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                {customer.email}
                                            </div>
                                            <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                {customer.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag className="h-4 w-4 text-premium-gold" />
                                                <span className="text-sm text-white">{customer.totalOrders} Orders</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-premium-gold">
                                            ৳{customer.totalSpent.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${customer.status === 'active'
                                                ? 'bg-green-900/30 text-green-400 border-green-500/30'
                                                : 'bg-red-900/30 text-red-400 border-red-500/30'
                                                }`}>
                                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                {new Date(customer.joinDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
