'use client';

import { motion } from 'framer-motion';
import { Download, Search, Trash2, Mail, Users } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminSubscribersPage() {
    const { subscribers, deleteSubscriber } = useAdmin();

    const handleExport = () => {
        const headers = ['Email', 'Joined At', 'Status'];
        const csvContent = [
            headers.join(','),
            ...subscribers.map(s => `${s.email},${new Date(s.joinedAt).toLocaleDateString()}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'subscribers.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            deleteSubscriber(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Subscribers
                </motion.h1>
                <motion.button
                    onClick={handleExport}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                >
                    <Download className="h-5 w-5" />
                    Export CSV
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatsCard
                    label="Total Subscribers"
                    value={subscribers.length.toString()}
                    icon={Users}
                    color="bg-purple-900"
                    trend="+12%"
                    delay={0}
                />
                <StatsCard
                    label="New this Month"
                    value="5"
                    icon={Mail}
                    color="bg-blue-900"
                    trend="+5%"
                    delay={0.1}
                />
            </div>

            <motion.div
                className="bg-premium-charcoal rounded-xl shadow-md border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">Subscriber List</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search email..."
                            className="pl-9 pr-4 py-2 bg-black border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-premium-gold"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Joined Date</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {subscribers.map((subscriber, index) => (
                                <motion.tr
                                    key={subscriber.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-premium-charcoal hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 mr-3 border border-blue-500/30">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-white">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {new Date(subscriber.joinedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(subscriber.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                                        No subscribers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
