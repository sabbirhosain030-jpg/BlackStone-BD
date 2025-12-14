'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import NextImage from 'next/image';
import { Plus, Edit, Trash2, Image as ImageIcon, X, Layers, Package, CheckCircle } from 'lucide-react';
import { Category } from '@/types';
import StatsCard from '@/components/admin/StatsCard';
import { useAdmin } from '@/context/AdminContext';

export default function AdminCategoriesPage() {
    const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<Partial<Category>>({});

    // Calculate stats
    const totalCategories = categories.length;
    const totalProducts = products.length;
    const activeCategories = categories.length; // Assuming all are active for now

    const stats = [
        { label: 'Total Categories', value: totalCategories.toString(), icon: Layers, color: 'bg-blue-500', trend: '+2%' },
        { label: 'Total Products', value: totalProducts.toString(), icon: Package, color: 'bg-purple-500', trend: '+12%' },
        { label: 'Active Categories', value: activeCategories.toString(), icon: CheckCircle, color: 'bg-green-500', trend: '100%' },
    ];

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData(category);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setFormData({
            name: '',
            description: '',
            image: '',
            productCount: 0,
            subCategories: [],
            isHot: false,
            parentCategory: undefined
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const categoryData = {
            ...formData,
            subCategories: formData.subCategories || []
        };

        if (editingCategory) {
            updateCategory({ ...editingCategory, ...categoryData } as Category);
        } else {
            const newCategory = {
                ...categoryData,
                id: (categories.length + 1).toString(),
                slug: formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
                productCount: 0
            } as Category;
            addCategory(newCategory);
        }
        setIsModalOpen(false);
    };

    // Filter potential parent categories (exclude self and existing children)
    const parentOptions = categories.filter(c =>
        c.id !== editingCategory?.id && !c.parentCategory
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Categories
                </motion.h1>
                <motion.button
                    onClick={handleAddNew}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add New Category
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Products</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {categories.map((category, index) => (
                                <motion.tr
                                    key={category.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-premium-charcoal hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-800 rounded-lg flex items-center justify-center text-premium-gold overflow-hidden">
                                                {category.image ? (
                                                    <NextImage src={category.image} alt={category.name} width={40} height={40} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Layers className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{category.name}</div>
                                                {category.parentCategory && (
                                                    <div className="text-xs text-gray-500">
                                                        ↳ Cost of {categories.find(c => c.id === category.parentCategory)?.name || 'Parent'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        <div className="flex flex-col gap-1">
                                            {category.parentCategory ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-500/30">
                                                    Sub-Category
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                                                    Main Category
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {category.isHot && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/30 text-red-400 border border-red-500/30">
                                                <span className="w-1.5 h-1.5 mr-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                                HOT
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                                            {category.productCount} items
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <motion.button
                                            onClick={() => handleEdit(category)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(category.id)}
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
                        className="bg-premium-charcoal border border-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-playfair">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Top Level Status</label>
                                    <div className="flex items-center gap-2 p-3 border border-gray-800 rounded-lg bg-black">
                                        <input
                                            type="checkbox"
                                            id="isHot"
                                            checked={formData.isHot || false}
                                            onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                                            className="w-4 h-4 text-premium-gold rounded focus:ring-premium-gold bg-gray-900 border-gray-700"
                                        />
                                        <label htmlFor="isHot" className="text-sm text-gray-300 font-medium">Mark as HOT 🔥</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Parent Category (Optional)</label>
                                <select
                                    value={formData.parentCategory || ''}
                                    onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value || undefined })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white transition-all"
                                >
                                    <option value="">None (Main Category)</option>
                                    {parentOptions.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-gray-500">Select a parent to make this a sub-category</p>
                            </div>

                            {!formData.parentCategory && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Sub-Categories (Quick Add)</label>
                                    <input
                                        type="text"
                                        value={formData.subCategories ? formData.subCategories.join(', ') : ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            subCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                        })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="e.g. Pants, Shirts, Jackets"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Comma separated list of sub-categories</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
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
                                    {editingCategory ? 'Save Changes' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
