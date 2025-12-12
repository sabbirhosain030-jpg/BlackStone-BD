'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, User, Users, UserCircle, Heart, Gem } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import Link from 'next/link';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof products>([]);
    const router = useRouter();

    useEffect(() => {
        if (query.trim()) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered.slice(0, 5)); // Limit to 5 results
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onClose();
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-8"
                    >
                        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <form onSubmit={handleSearch} className="relative border-b border-gray-100">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for products, categories..."
                                    className="w-full pl-16 pr-16 py-6 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </form>

                            {results.length > 0 && (
                                <div className="p-4">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                                        Quick Results
                                    </h3>
                                    <div className="space-y-2">
                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                                            >
                                                <div className="h-12 w-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">{product.category}</p>
                                                </div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    ৳{product.price.toLocaleString()}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                        <button
                                            onClick={handleSearch}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                                        >
                                            View all results <ArrowRight className="ml-1 h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {query.trim() && results.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    No results found for &quot;{query}&quot;
                                </div>
                            )}

                            {/* Browse by Category Section */}
                            {!query.trim() && (
                                <div className="p-6">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                                        Browse by Category
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            { name: "Men's", icon: User, color: 'from-slate-700 to-slate-900' },
                                            { name: "Women's", icon: Heart, color: 'from-rose-400 to-rose-600' },
                                            { name: 'Boys', icon: UserCircle, color: 'from-sky-500 to-sky-700' },
                                            { name: 'Girls', icon: Users, color: 'from-pink-400 to-pink-600' },
                                            { name: 'Accessories', icon: Gem, color: 'from-amber-500 to-amber-700' },
                                        ].map((category) => {
                                            const Icon = category.icon;
                                            return (
                                                <Link
                                                    key={category.name}
                                                    href={`/products?category=${category.name}`}
                                                    onClick={onClose}
                                                    className="group"
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex flex-col items-center p-4 bg-gradient-to-br hover:shadow-lg rounded-xl border border-gray-100 hover:border-transparent transition-all cursor-pointer"
                                                    >
                                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-shadow`}>
                                                            <Icon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                                            {category.name}
                                                        </span>
                                                    </motion.div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
