'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Mail, Package, Calendar, Edit2, Save, X } from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profileImage?: string;
    createdAt: string;
}

interface Order {
    id: string;
    createdAt: string;
    total: number;
    status: string;
    items: any[];
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }
        fetchProfile();
        fetchOrders();
    }, [status]);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setFormData({
                    name: data.name,
                    phone: data.phone || '',
                    address: data.address || ''
                });
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders/user');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchProfile();
                setEditing(false);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-premium-black flex items-center justify-center">
                <div className="text-premium-gold text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-premium-black pt-32 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-premium-charcoal rounded-2xl p-4 sm:p-8 mb-8 border border-gray-800"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-premium-gold/10 border-2 border-premium-gold flex items-center justify-center flex-shrink-0">
                                <User className="h-10 w-10 sm:h-12 sm:w-12 text-premium-gold" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{profile?.name}</h1>
                                <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                                    <Mail className="h-4 w-4" />
                                    {profile?.email}
                                </p>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center justify-center sm:justify-start gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-premium-gold text-premium-black rounded-lg hover:bg-premium-gold/90 transition-colors"
                            >
                                <Edit2 className="h-4 w-4" />
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-premium-gold"
                                    />
                                ) : (
                                    <p className="text-white">{profile?.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm mb-1 block flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Phone Number
                                </label>
                                {editing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-premium-gold"
                                        placeholder="Enter phone number"
                                    />
                                ) : (
                                    <p className="text-white">{profile?.phone || 'Not provided'}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm mb-1 block flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Address
                            </label>
                            {editing ? (
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-premium-gold resize-none"
                                    rows={3}
                                    placeholder="Enter your address"
                                />
                            ) : (
                                <p className="text-white">{profile?.address || 'Not provided'}</p>
                            )}
                        </div>
                    </div>

                    {editing && (
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-premium-gold text-premium-black rounded-lg hover:bg-premium-gold/90 transition-colors"
                            >
                                <Save className="h-4 w-4" />
                                Save Changes
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setFormData({
                                        name: profile?.name || '',
                                        phone: profile?.phone || '',
                                        address: profile?.address || ''
                                    });
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Order History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-premium-charcoal rounded-2xl p-8 border border-gray-800"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Package className="h-6 w-6 text-premium-gold" />
                        Order History
                    </h2>

                    {orders.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No orders yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 text-gray-400 font-medium">Order ID</th>
                                        <th className="text-left py-3 text-gray-400 font-medium">Date</th>
                                        <th className="text-left py-3 text-gray-400 font-medium">Items</th>
                                        <th className="text-left py-3 text-gray-400 font-medium">Total</th>
                                        <th className="text-left py-3 text-gray-400 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                                            <td className="py-4 text-white">#{order.id.slice(-8)}</td>
                                            <td className="py-4 text-gray-300">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-gray-300">{order.items.length} items</td>
                                            <td className="py-4 text-premium-gold font-semibold">৳{order.total.toLocaleString()}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered' ? 'bg-green-900/30 text-green-400' :
                                                    order.status === 'processing' ? 'bg-blue-900/30 text-blue-400' :
                                                        order.status === 'shipped' ? 'bg-purple-900/30 text-purple-400' :
                                                            'bg-yellow-900/30 text-yellow-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
