'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Eye, MoreVertical, CheckCircle, XCircle, Clock, Truck, Package, Download } from 'lucide-react';
import { orders as initialOrders } from '@/lib/data';
import { Order } from '@/types';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30';
            case 'processing': return 'bg-blue-900/30 text-blue-400 border border-blue-500/30';
            case 'shipped': return 'bg-indigo-900/30 text-indigo-400 border border-indigo-500/30';
            case 'delivered': return 'bg-green-900/30 text-green-400 border border-green-500/30';
            case 'cancelled': return 'bg-red-900/30 text-red-400 border border-red-500/30';
            default: return 'bg-gray-800 text-gray-400 border border-gray-700';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <motion.h1
                        className="text-3xl font-bold text-white font-playfair"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Orders
                    </motion.h1>
                    <p className="text-gray-400 mt-1">Manage customer orders</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => alert('Export functionality coming soon!')}
                        className="bg-premium-charcoal border border-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 hover:text-white transition-colors shadow-sm"
                    >
                        <Download className="h-5 w-5 mr-2" />
                        Export
                    </button>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-premium-charcoal border border-gray-700 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-gold appearance-none pr-10 shadow-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                    </div>
                </div>
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
                            placeholder="Search by order ID or customer..."
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
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        className="bg-premium-charcoal hover:bg-gray-800 transition-colors cursor-pointer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 hover:text-blue-300">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-premium-gold">
                                            ৳{order.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 uppercase">
                                            {order.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedOrder(order);
                                                }}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between bg-premium-charcoal">
                    <div className="text-sm text-gray-400">
                        Showing <span className="font-medium text-white">{filteredOrders.length}</span> results
                    </div>
                </div>
            </motion.div>

            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
}
