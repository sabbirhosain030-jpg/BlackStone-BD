'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, ToggleLeft, ToggleRight, X, Sparkles } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { TrendingItem } from '@/types';

export default function AdminTrendingPage() {
    const { trendingItems, addTrendingItem, updateTrendingItem, deleteTrendingItem, categories } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TrendingItem | null>(null);
    const [formData, setFormData] = useState<Partial<TrendingItem>>({});

    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            image: '',
            category: '',
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item: TrendingItem) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this trending item?')) {
            deleteTrendingItem(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem && formData.title) {
            updateTrendingItem({ ...editingItem, ...formData } as TrendingItem);
        } else if (formData.title) {
            const newItem: TrendingItem = {
                id: Date.now().toString(),
                title: formData.title!,
                image: formData.image || '',
                category: formData.category || '',
                isActive: formData.isActive || true
            };
            addTrendingItem(newItem);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Trending Fashion Management
                </motion.h1>
                <motion.button
                    onClick={handleAddNew}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Trending Item
                </motion.button>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {trendingItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                    >
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <ImageIcon className="h-12 w-12" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900">
                                {item.category}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => updateTrendingItem({ ...item, isActive: !item.isActive })}
                                    className={`flex items-center gap-1 text-sm font-medium ${item.isActive ? 'text-green-600' : 'text-gray-400'}`}
                                >
                                    {item.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                                    {item.isActive ? 'Active' : 'Inactive'}
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category (Tag)</label>
                                <select
                                    value={formData.category || ''}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image || ''}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                {editingItem ? 'Save Changes' : 'Add Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
