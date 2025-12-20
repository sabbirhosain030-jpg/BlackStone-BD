'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash2, Flame, ToggleLeft, ToggleRight, Megaphone, CheckCircle, X } from 'lucide-react';
import Image from 'next/image';
import { hotOffers as initialOffers } from '@/lib/data';
import { HotOffer } from '@/types';
import StatsCard from '@/components/admin/StatsCard';
import { useAdmin } from '@/context/AdminContext';

export default function AdminHotOffersPage() {
    const { hotOffers, addHotOffer, updateHotOffer, deleteHotOffer, toggleHotOfferStatus, products } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<HotOffer | null>(null);
    const [formData, setFormData] = useState<Partial<HotOffer>>({});

    // Calculate stats
    const totalOffers = hotOffers.length;
    const activeOffers = hotOffers.filter(o => o.isActive).length;

    const stats = [
        { label: 'Total Offers', value: totalOffers.toString(), icon: Megaphone, color: 'bg-orange-500', trend: '+5%' },
        { label: 'Active Offers', value: activeOffers.toString(), icon: CheckCircle, color: 'bg-green-500', trend: 'Now' },
    ];

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this offer?')) {
            deleteHotOffer(id);
        }
    };

    const handleToggleActive = (id: string) => {
        toggleHotOfferStatus(id);
    };

    const handleEdit = (offer: HotOffer) => {
        setEditingOffer(offer);
        setFormData(offer);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingOffer(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            discount: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Date Validation
        if (formData.startDate && formData.endDate) {
            if (new Date(formData.startDate) > new Date(formData.endDate)) {
                alert('Start Date cannot be after End Date');
                return;
            }
        }

        if (editingOffer) {
            updateHotOffer({ ...editingOffer, ...formData } as HotOffer);
        } else {
            const newOffer = {
                ...formData,
                id: (hotOffers.length + 1).toString(),
            } as HotOffer;
            addHotOffer(newOffer);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Hot Offers Management
                </motion.h1>
                <motion.button
                    onClick={handleAddNew}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add New Offer
                </motion.button>
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
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Offer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Discount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {hotOffers.map((offer, index) => (
                                <motion.tr
                                    key={offer.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-premium-charcoal hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-800 rounded-lg flex items-center justify-center text-premium-gold overflow-hidden">
                                                {offer.image ? (
                                                    <Image
                                                        src={offer.image}
                                                        alt={offer.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Flame className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{offer.title}</div>
                                                <div className="text-xs text-gray-400">{offer.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-premium-gold">
                                        {offer.discount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleToggleActive(offer.id)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${offer.isActive ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700'
                                                }`}
                                        >
                                            {offer.isActive ? (
                                                <>
                                                    <ToggleRight className="h-4 w-4" /> Active
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft className="h-4 w-4" /> Inactive
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <motion.button
                                            onClick={() => handleEdit(offer)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(offer.id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-red-400 hover:text-red-300 inline-flex items-center gap-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-premium-charcoal border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-playfair">
                                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Offer Title</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="e.g. Summer Super Sale"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="Enter offer details..."
                                    required
                                />
                            </div>

                            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                    <span>📄</span> Exclusive Page Customization
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Page Title (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.pageTitle || ''}
                                            onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600"
                                            placeholder="e.g., Exclusive Hot Offers"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Custom heading for the /hot-offers page</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Page Description (Optional)</label>
                                        <textarea
                                            rows={2}
                                            value={formData.pageDescription || ''}
                                            onChange={(e) => setFormData({ ...formData, pageDescription: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600"
                                            placeholder="e.g., Limited time deals and premium collection discounts"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Custom subtitle for the /hot-offers page</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Discount Label</label>
                                    <input
                                        type="text"
                                        value={formData.discount || ''}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="e.g. 50% OFF"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image || ''}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                                <h4 className="text-sm font-semibold text-white mb-4">Duration & Timer Settings</h4>
                                <div className="grid grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate || ''}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">End Date</label>
                                        <input
                                            type="date"
                                            value={formData.endDate || ''}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="border-t border-gray-800 pt-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Countdown Timer Target</label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                        <input
                                            type="datetime-local"
                                            value={formData.timerEndDate || ''}
                                            onChange={(e) => setFormData({ ...formData, timerEndDate: e.target.value })}
                                            className="w-full sm:w-auto flex-1 px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                        <p className="text-xs text-gray-500 max-w-xs">
                                            Set a specific date and time for the countdown timer to end.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Associated Products</label>
                                <div className="max-h-48 overflow-y-auto border border-gray-800 rounded-lg p-2 space-y-2 bg-black">
                                    {products.map(product => (
                                        <label key={product.id} className="flex items-center gap-2 p-2 hover:bg-gray-900 rounded cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={formData.productIds?.includes(product.id) || false}
                                                onChange={(e) => {
                                                    const currentIds = formData.productIds || [];
                                                    if (e.target.checked) {
                                                        setFormData({ ...formData, productIds: [...currentIds, product.id] });
                                                    } else {
                                                        setFormData({ ...formData, productIds: currentIds.filter(id => id !== product.id) });
                                                    }
                                                }}
                                                className="w-4 h-4 text-premium-gold rounded focus:ring-premium-gold bg-gray-900 border-gray-700"
                                            />
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded object-cover"
                                                />
                                                <span className="text-sm text-gray-300">{product.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Select products to feature in this hot offer.</p>
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
                                    {editingOffer ? 'Save Changes' : 'Add Offer'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
