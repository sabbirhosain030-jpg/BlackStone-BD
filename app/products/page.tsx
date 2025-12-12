'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import PriceFilter from '@/components/PriceFilter';
import { products } from '@/lib/data';
import { Filter, X } from 'lucide-react';

function ProductsContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    useEffect(() => {
        let result = products;

        // Filter by Search
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        setFilteredProducts(result);
    }, [selectedCategory, priceRange, searchQuery]);

    // Auto-close mobile filter panel after selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        // Close mobile filter after a short delay to show selection
        setTimeout(() => {
            setIsMobileFilterOpen(false);
        }, 300);
    };

    const handlePriceChange = (min: number, max: number) => {
        setPriceRange([min, max]);
        // Close mobile filter after price is applied
        setTimeout(() => {
            setIsMobileFilterOpen(false);
        }, 300);
    };

    // Update search query if URL param changes
    useEffect(() => {
        const query = searchParams.get('search');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    // Update category if URL param changes
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Showing {filteredProducts.length} products
                    </p>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200 font-medium text-gray-700"
                    >
                        <Filter className="h-5 w-5" />
                        Filters
                    </button>

                    {/* Sidebar Filters */}
                    <div className={`
                        fixed inset-0 bg-black/50 z-40 lg:static lg:bg-transparent lg:z-auto lg:w-64 lg:block
                        ${isMobileFilterOpen ? 'block' : 'hidden'}
                    `}>
                        <div className={`
                            absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl lg:static lg:w-auto lg:h-auto lg:shadow-none lg:bg-transparent lg:p-0
                            transform transition-transform duration-300 ease-in-out
                            ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                        `}>
                            <div className="flex justify-between items-center lg:hidden mb-6">
                                <h2 className="text-xl font-bold">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)}>
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Categories */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`
                                                    w-5 h-5 rounded border flex items-center justify-center transition-colors
                                                    ${selectedCategory === category ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-500'}
                                                `}>
                                                    {selectedCategory === category && (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category}
                                                    checked={selectedCategory === category}
                                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                                    className="hidden"
                                                />
                                                <span className={`text-sm ${selectedCategory === category ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                                                    {category}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <PriceFilter
                                    minPrice={0}
                                    maxPrice={10000}
                                    onPriceChange={handlePriceChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence>
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setPriceRange([0, 10000]);
                                        setSearchQuery('');
                                    }}
                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
