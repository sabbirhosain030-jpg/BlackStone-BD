'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, X, Package, AlertTriangle, DollarSign, Upload, RefreshCcw, Archive } from 'lucide-react';
import { Product } from '@/types';
import StatsCard from '@/components/admin/StatsCard';
import { useAdmin } from '@/context/AdminContext';

// ... imports

export default function AdminProductsPage() {
    const { products, categories, addProduct, updateProduct, deleteProduct, restoreProduct } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [viewMode, setViewMode] = useState<'active' | 'trash'>('active');

    // Filter products based on view mode
    const displayedProducts = products.filter(p => viewMode === 'active' ? !p.isDeleted : p.isDeleted);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to move this product to trash?')) {
            deleteProduct(id);
        }
    };

    const handleRestore = (id: string) => {
        if (confirm('Restore this product?')) {
            restoreProduct(id);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: 0,
            originalPrice: 0,
            stock: 0,
            category: categories[0]?.name || '',
            description: '',
            images: [''],
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct({ ...editingProduct, ...formData } as Product);
        } else {
            const newProduct = {
                ...formData,
                id: (products.length + 1).toString(),
                rating: 0,
                reviews: 0,
            } as Product;
            addProduct(newProduct);
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
                    {viewMode === 'active' ? 'Products' : 'Recycle Bin'}
                </motion.h1>
                <div className="flex gap-3">
                    <motion.button
                        onClick={() => setViewMode(viewMode === 'active' ? 'trash' : 'active')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border ${viewMode === 'active' ? 'bg-premium-charcoal text-white border-gray-600 hover:border-premium-gold' : 'bg-gray-800 text-white border-gray-600'}`}
                    >
                        {viewMode === 'active' ? (
                            <>
                                <Trash2 className="h-5 w-5" />
                                Trash ({products.filter(p => p.isDeleted).length})
                            </>
                        ) : (
                            <>
                                <Package className="h-5 w-5" />
                                View Active
                            </>
                        )}
                    </motion.button>
                    {viewMode === 'active' && (
                        <motion.button
                            onClick={handleAddNew}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Add New Product
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Stats (Hide in Trash mode or show Trash stats?) - Keeping general Active stats */}
            {viewMode === 'active' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* ... StatsCards ... */}
                </div>
            )}

            <motion.div
                className="bg-premium-charcoal rounded-xl shadow-md border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-premium-gold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {displayedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        {viewMode === 'active' ? 'No active products found.' : 'Recycle bin is empty.'}
                                    </td>
                                </tr>
                            ) : (
                                displayedProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-premium-charcoal hover:bg-gray-800 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-12 w-12 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">{product.name}</div>
                                                    <div className="text-sm text-gray-500">ID: #{product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                                            ৳{product.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stockStatus === 'coming-soon' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30' :
                                                product.stockStatus === 'out-of-stock' || product.stock === 0 ? 'bg-red-900/30 text-red-400 border border-red-500/30' :
                                                    'bg-green-900/30 text-green-400 border border-green-500/30'
                                                }`}>
                                                {product.stockStatus === 'coming-soon' ? 'Coming Soon' :
                                                    product.stockStatus === 'out-of-stock' ? 'Out of Stock' :
                                                        product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            {viewMode === 'active' ? (
                                                <>
                                                    <motion.button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-400 hover:text-red-300 inline-flex items-center gap-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </motion.button>
                                                </>
                                            ) : (
                                                <motion.button
                                                    onClick={() => handleRestore(product.id)}
                                                    className="text-green-400 hover:text-green-300 inline-flex items-center gap-1"
                                                >
                                                    <RefreshCcw className="h-4 w-4" />
                                                    Restore
                                                </motion.button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
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
                        className="bg-premium-charcoal border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-playfair">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Original Price</label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice || ''}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock || ''}
                                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Stock Status (Override)</label>
                                <select
                                    value={formData.stockStatus || ''}
                                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as any })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white transition-all"
                                >
                                    <option value="">Auto (Based on Stock Count)</option>
                                    <option value="in-stock">In Stock</option>
                                    <option value="out-of-stock">Out of Stock</option>
                                    <option value="coming-soon">Coming Soon</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Sizes (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.sizes?.join(', ') || ''}
                                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="S, M, L, XL, XXL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Colors (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.colors?.join(', ') || ''}
                                    onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="Red, Blue, Black, Gold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                <select
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white transition-all"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sub Category Logic */}
                            {formData.category && categories.find(c => c.name === formData.category)?.subCategories && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Sub Category</label>
                                    <select
                                        value={formData.subCategory || ''}
                                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white transition-all"
                                    >
                                        <option value="">Select Sub-Category</option>
                                        {categories.find(c => c.name === formData.category)?.subCategories?.map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    rows={4}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                    placeholder="Enter product description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
                                <div className="space-y-4">
                                    {/* Image List */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                                        {formData.images?.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-800 group">
                                                <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newImages = [...(formData.images || [])];
                                                            newImages.splice(idx, 1);
                                                            setFormData({ ...formData, images: newImages });
                                                        }}
                                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* File Upload Button (Appends) */}
                                        <div className="border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center hover:border-premium-gold transition-colors bg-black/30 aspect-square">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const url = URL.createObjectURL(file);
                                                        setFormData({ ...formData, images: [...(formData.images || []), url] });
                                                    }
                                                }}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2 p-4 text-center">
                                                <Upload className="h-6 w-6 text-gray-500" />
                                                <span className="text-xs text-gray-500">Upload</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            id="new-image-url"
                                            className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                            placeholder="Add image URL..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const input = e.target as HTMLInputElement;
                                                    if (input.value) {
                                                        setFormData({ ...formData, images: [...(formData.images || []), input.value] });
                                                        input.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.getElementById('new-image-url') as HTMLInputElement;
                                                if (input?.value) {
                                                    setFormData({ ...formData, images: [...(formData.images || []), input.value] });
                                                    input.value = '';
                                                }
                                            }}
                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
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
                                    {editingProduct ? 'Save Changes' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
