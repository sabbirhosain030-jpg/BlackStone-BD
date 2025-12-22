'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Calendar, User, ShoppingBag, X, Check, XCircle } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Coupon } from '@/types';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminCouponsPage() {
    const { coupons, addCoupon, updateCoupon, deleteCoupon, settings, updateSettings } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [formData, setFormData] = useState<Partial<Coupon>>({});

    const handleAddNew = () => {
        setEditingCoupon(null);
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: 10,
            isActive: true,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            applicableTo: 'all'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setFormData(coupon);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            deleteCoupon(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCoupon) {
            updateCoupon({ ...editingCoupon, ...formData } as Coupon);
        } else {
            addCoupon(formData as Coupon);
        }
        setIsModalOpen(false);
    };

    // Stats
    const totalCoupons = coupons.length;
    const activeCoupons = coupons.filter(c => c.isActive).length;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Coupons & Discounts
                </motion.h1>
                <div className="flex gap-3">
                    <motion.button
                        onClick={handleAddNew}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add New Coupon
                    </motion.button>
                </div>
            </div>

            {/* Subscription Coupon Config - NEW Feature requested by user */}
            <div className="mb-8 p-6 bg-premium-charcoal/50 border border-premium-gold/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-premium-gold font-playfair mb-1">
                        Subscription Welcome Offer
                    </h3>
                    <p className="text-gray-400 text-sm">
                        This code will be shown to new subscribers in the popup modal.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-black border border-gray-700 rounded-lg px-4 py-2 text-white font-mono tracking-wider">
                        {settings.marketingModal.couponCode || 'WELCOME10'}
                    </div>
                    <button
                        onClick={() => {
                            const newCode = prompt("Enter the Coupon Code for subscribers:", settings.marketingModal.couponCode || 'WELCOME10');
                            if (newCode) {
                                updateSettings({
                                    ...settings,
                                    marketingModal: {
                                        ...settings.marketingModal,
                                        couponCode: newCode
                                    }
                                });
                            }
                        }}
                        className="text-premium-gold hover:text-white underline text-sm font-medium"
                    >
                        Change Code
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatsCard
                    label="Total Coupons"
                    value={totalCoupons.toString()}
                    icon={Tag}
                    color="bg-purple-500"
                    delay={0}
                />
                <StatsCard
                    label="Active Coupons"
                    value={activeCoupons.toString()}
                    icon={Check}
                    color="bg-green-500"
                    delay={0.1}
                />
            </div>

            <motion.div
                className="bg-premium-charcoal rounded-xl shadow-md border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Code</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Discount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Usage</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {coupons.map((coupon, index) => (
                                <motion.tr
                                    key={coupon.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-premium-charcoal hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-6 py-4 font-mono font-bold text-white tracking-wider">
                                        {coupon.code}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {coupon.discountValue}
                                        {coupon.discountType === 'percentage' ? '%' : ' Tk'} OFF
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-400">
                                        From: {new Date(coupon.startDate).toLocaleDateString()}<br />
                                        To: {new Date(coupon.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {coupon.applicableTo === 'first-order' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-500/30">
                                                <User className="h-3 w-3" /> First Order
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/30">
                                                <ShoppingBag className="h-3 w-3" /> All Orders
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {coupon.usedCount} / {coupon.usageLimit || '∞'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {coupon.isActive ? (
                                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 border border-green-500/30">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400 border border-red-500/30">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onClick={() => handleEdit(coupon)} className="text-blue-400 hover:text-blue-300">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(coupon.id)} className="text-red-400 hover:text-red-300">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-premium-charcoal border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-playfair">
                                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Coupon Code</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-mono uppercase tracking-widest focus:ring-2 focus:ring-premium-gold"
                                        placeholder="SUMMER2025"
                                        required
                                    />
                                </div>
                                <div className="flex items-end mb-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-5 h-5 accent-premium-gold"
                                        />
                                        <span className="text-white">Is Active?</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Discount Type</label>
                                    <select
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (Tk)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Discount Value</label>
                                    <input
                                        type="number"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Applicable To</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 p-3 bg-black border border-gray-800 rounded-lg cursor-pointer flex-1">
                                        <input
                                            type="radio"
                                            name="applicableTo"
                                            checked={formData.applicableTo === 'all'}
                                            onChange={() => setFormData({ ...formData, applicableTo: 'all' })}
                                        />
                                        <span className="text-gray-300">All Customers</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 bg-black border border-gray-800 rounded-lg cursor-pointer flex-1">
                                        <input
                                            type="radio"
                                            name="applicableTo"
                                            checked={formData.applicableTo === 'first-order'}
                                            onChange={() => setFormData({ ...formData, applicableTo: 'first-order' })}
                                        />
                                        <span className="text-gray-300">First Order Only</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Usage Limit (Optional)</label>
                                    <input
                                        type="number"
                                        value={formData.usageLimit || ''}
                                        onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                        placeholder="∞"
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Min Order Amount</label>
                                    <input
                                        type="number"
                                        value={formData.minOrderAmount || ''}
                                        onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                                        placeholder="0"
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 justify-end pt-4 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-700 rounded-lg font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-premium-gold hover:bg-white text-premium-black font-bold rounded-lg transition-colors"
                                >
                                    {editingCoupon ? 'Save Changes' : 'Create Coupon'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
