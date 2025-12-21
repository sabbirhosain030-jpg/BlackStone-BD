'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Check, X, Percent, DollarSign, Calendar, Users, Tag } from 'lucide-react';

interface Coupon {
    id: string;
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue: number;
    expirationDate: string;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
    createdAt: string;
}

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([
        {
            id: '1',
            code: 'WELCOME10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 500,
            expirationDate: '2025-12-31',
            usageLimit: 100,
            usedCount: 23,
            isActive: true,
            createdAt: '2025-01-15',
        },
        {
            id: '2',
            code: 'NEWYEAR2025',
            discountType: 'fixed',
            discountValue: 200,
            minOrderValue: 1000,
            expirationDate: '2025-01-31',
            usageLimit: 50,
            usedCount: 45,
            isActive: true,
            createdAt: '2025-01-01',
        },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage' as 'percentage' | 'fixed',
        discountValue: 0,
        minOrderValue: 0,
        expirationDate: '',
        usageLimit: 0,
    });

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleToggleActive = (id: string) => {
        setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            setCoupons(coupons.filter(c => c.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCoupon) {
            // Update existing coupon
            setCoupons(coupons.map(c => c.id === editingCoupon.id ? {
                ...c,
                ...formData,
            } : c));
        } else {
            // Add new coupon
            const newCoupon: Coupon = {
                id: Date.now().toString(),
                ...formData,
                usedCount: 0,
                isActive: true,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setCoupons([...coupons, newCoupon]);
        }

        // Reset form
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: 0,
            minOrderValue: 0,
            expirationDate: '',
            usageLimit: 0,
        });
        setEditingCoupon(null);
        setIsAddModalOpen(false);
    };

    const openEditModal = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            minOrderValue: coupon.minOrderValue,
            expirationDate: coupon.expirationDate,
            usageLimit: coupon.usageLimit,
        });
        setIsAddModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Coupon Management
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setEditingCoupon(null);
                        setFormData({
                            code: '',
                            discountType: 'percentage',
                            discountValue: 0,
                            minOrderValue: 0,
                            expirationDate: '',
                            usageLimit: 0,
                        });
                        setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg shadow-premium-gold/20 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Coupon
                </motion.button>
            </div>

            {/* Coupons Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {coupons.map((coupon) => (
                    <motion.div
                        key={coupon.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className={`bg-premium-charcoal border-2 rounded-xl p-6 shadow-lg transition-all ${coupon.isActive
                                ? 'border-premium-gold/30'
                                : 'border-gray-800 opacity-60'
                            }`}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="h-5 w-5 text-premium-gold" />
                                    <h3 className="text-xl font-bold text-white font-mono">{coupon.code}</h3>
                                    <button
                                        onClick={() => handleCopy(coupon.code)}
                                        className="p-1 hover:bg-white/10 rounded transition-colors"
                                        title="Copy code"
                                    >
                                        {copiedCode === coupon.code ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-2xl font-bold ${coupon.isActive ? 'text-premium-gold' : 'text-gray-500'}`}>
                                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `৳${coupon.discountValue}`}
                                    </span>
                                    <span className="text-sm text-gray-400">OFF</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggleActive(coupon.id)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${coupon.isActive
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                                    }`}
                            >
                                {coupon.isActive ? 'Active' : 'Inactive'}
                            </button>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <DollarSign className="h-4 w-4" />
                                <span>Min. Order: ৳{coupon.minOrderValue}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span>Expires: {new Date(coupon.expirationDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="h-4 w-4" />
                                <span>Used: {coupon.usedCount} / {coupon.usageLimit}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-premium-gold"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => openEditModal(coupon)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors text-sm font-medium"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(coupon.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors text-sm font-medium"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsAddModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-premium-charcoal border-2 border-premium-gold/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white font-playfair">
                                    {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
                                </h2>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Coupon Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Coupon Code*</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white font-mono"
                                        placeholder="e.g., WELCOME10"
                                        required
                                    />
                                </div>

                                {/* Discount Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Discount Type*</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, discountType: 'percentage' })}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${formData.discountType === 'percentage'
                                                    ? 'bg-premium-gold/20 border-premium-gold text-premium-gold'
                                                    : 'bg-black border-gray-800 text-gray-400 hover:border-gray-700'
                                                }`}
                                        >
                                            <Percent className="h-5 w-5" />
                                            Percentage
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, discountType: 'fixed' })}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${formData.discountType === 'fixed'
                                                    ? 'bg-premium-gold/20 border-premium-gold text-premium-gold'
                                                    : 'bg-black border-gray-800 text-gray-400 hover:border-gray-700'
                                                }`}
                                        >
                                            <DollarSign className="h-5 w-5" />
                                            Fixed Amount
                                        </button>
                                    </div>
                                </div>

                                {/* Discount Value */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Discount Value* {formData.discountType === 'percentage' ? '(%)' : '(৳)'}
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        min="0"
                                        max={formData.discountType === 'percentage' ? 100 : undefined}
                                        required
                                    />
                                </div>

                                {/* Min Order Value */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Minimum Order Value (৳)*</label>
                                    <input
                                        type="number"
                                        value={formData.minOrderValue}
                                        onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        min="0"
                                        required
                                    />
                                </div>

                                {/* Expiration Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Expiration Date*</label>
                                    <input
                                        type="date"
                                        value={formData.expirationDate}
                                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        required
                                    />
                                </div>

                                {/* Usage Limit */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Usage Limit*</label>
                                    <input
                                        type="number"
                                        value={formData.usageLimit}
                                        onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-premium-gold text-premium-black rounded-lg hover:bg-white transition-colors font-bold"
                                    >
                                        {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
