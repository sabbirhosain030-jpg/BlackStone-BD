'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import SearchModal from './SearchModal';

export default function Navbar() {
    const { cartCount } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                                BlackStone<span className="text-blue-600">BD</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Products
                            </Link>
                            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Categories
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                About
                            </Link>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                <Search className="h-6 w-6" />
                            </button>
                            <Link href="/cart" className="text-gray-500 hover:text-blue-600 transition-colors relative">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button className="md:hidden text-gray-500 hover:text-blue-600 transition-colors">
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
