'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import PriceFilter from '@/components/PriceFilter';
import { products } from '@/lib/data';
import { useAdmin } from '@/context/AdminContext';
import { Filter, X, Flame } from 'lucide-react';

function ProductsContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [showHotDeals, setShowHotDeals] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    // Get categories with hierarchy
    const { categories: adminCategories, hotOffers } = useAdmin();
    // Merge hardcoded categories with admin categories if needed, or just use adminCategories
    // For now, let's use the list from data.ts but enhanced with admin context if available

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

        // Filter by SubCategory
        if (selectedSubCategory !== 'All') {
            result = result.filter(p => p.subCategory === selectedSubCategory);
        }

        // Filter by Hot Deals
        if (showHotDeals) {
            result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        setFilteredProducts(result);
    }, [selectedCategory, selectedSubCategory, showHotDeals, priceRange, searchQuery]);

    // Auto-close mobile filter panel after selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedSubCategory('All'); // Reset sub-category
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
                                {/* Categories with Hierarchy */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>

                                    {/* Hot Filter Button */}
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setShowHotDeals(!showHotDeals)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${showHotDeals
                                                    ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                                }`}
                                        >
                                            <div className={`p-1 rounded ${showHotDeals ? 'bg-red-100' : 'bg-gray-100'}`}>
                                                <Flame className={`h-4 w-4 ${showHotDeals ? 'text-red-600' : 'text-gray-500'}`} />
                                            </div>
                                            <span className="font-bold text-sm">Hot Deals 🔥</span>
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        {/* All Option */}
                                        <button
                                            onClick={() => handleCategoryChange('All')}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'All'
                                                    ? 'bg-blue-50 text-blue-700 font-bold'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span>All Categories</span>
                                            {selectedCategory === 'All' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                        </button>

                                        {/* Root Categories */}
                                        {adminCategories.filter(c => !c.parentCategory).map(category => (
                                            <div key={category.id} className="space-y-1">
                                                <button
                                                    onClick={() => handleCategoryChange(category.name)}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group ${selectedCategory === category.name
                                                            ? 'bg-blue-50 text-blue-700 font-bold'
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {category.isHot && <Flame className="h-3 w-3 text-red-500" />}
                                                        <span>{category.name}</span>
                                                    </div>
                                                    {adminCategories.some(c => c.parentCategory === category.id) && (
                                                        <span className="text-xs text-gray-400">+</span>
                                                    )}
                                                </button>

                                                {/* Sub Categories - Show if parent is selected or if a child is selected */}
                                                {(selectedCategory === category.name || adminCategories.find(c => c.name === selectedCategory)?.parentCategory === category.id) && (
                                                    <div className="pl-4 space-y-1 border-l-2 border-gray-100 ml-3">
                                                        {adminCategories
                                                            .filter(c => c.parentCategory === category.id)
                                                            .map(sub => (
                                                                <button
                                                                    key={sub.id}
                                                                    onClick={() => handleCategoryChange(sub.name)}
                                                                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${selectedCategory === sub.name
                                                                            ? 'text-blue-600 font-medium bg-blue-50/50'
                                                                            : 'text-gray-500 hover:text-gray-700'
                                                                        }`}
                                                                >
                                                                    {sub.name}
                                                                </button>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            </div>
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
                        {/* Sub Category Chips */}
                        {selectedCategory !== 'All' &&
                            adminCategories.find(c => c.name === selectedCategory)?.subCategories &&
                            adminCategories.find(c => c.name === selectedCategory)!.subCategories!.length > 0 && (
                                <div className="mb-6 overflow-x-auto pb-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedSubCategory('All')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSubCategory === 'All'
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            All {selectedCategory}
                                        </button>
                                        {adminCategories.find(c => c.name === selectedCategory)?.subCategories?.map(sub => (
                                            <button
                                                key={sub}
                                                onClick={() => setSelectedSubCategory(sub)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSubCategory === sub
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {sub}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

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
