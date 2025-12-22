'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, X, Heart, User, LogOut, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { cartCount } = useCart();
    const { favorites } = useFavorites();
    const { data: session } = useSession();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/categories', label: 'Categories' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    // Check if user is on login page
    const isLoginPage = pathname === '/login';

    return (
        <>
            <nav className="bg-premium-black sticky top-0 z-50 border-b border-gray-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-3xl font-bold font-playfair tracking-wide text-white group">
                                BlackStone<span className="text-premium-gold group-hover:text-premium-gold-light transition-colors">BD</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-4 items-center">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-premium-black bg-premium-gold' : 'text-gray-300 hover:text-premium-gold hover:bg-white/5'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-active"
                                                className="absolute inset-0 bg-premium-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                style={{ zIndex: -1 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center space-x-4 sm:space-x-6">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-gray-300 hover:text-premium-gold transition-colors transform hover:scale-110 duration-200"
                                aria-label="Search"
                            >
                                <Search className="h-6 w-6" />
                            </button>

                            {/* Favorites Button */}
                            <Link
                                href="/favorites"
                                className="text-gray-300 hover:text-red-500 transition-colors relative transform hover:scale-110 duration-200 group"
                                aria-label="Favorites"
                            >
                                <Heart className="h-6 w-6 group-hover:fill-current" />
                                {favorites.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                    >
                                        {favorites.length}
                                    </motion.span>
                                )}
                            </Link>

                            {/* Profile Icon / Login - Desktop */}
                            {session ? (
                                <div className="hidden md:block relative">
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-2 px-4 py-2 bg-premium-gold/10 hover:bg-premium-gold/20 text-premium-gold border border-premium-gold/30 font-medium rounded-full transition-all transform hover:scale-105 duration-200"
                                    >
                                        <User className="h-5 w-5" />
                                        <span className="hidden lg:inline">{session.user?.name?.split(' ')[0]}</span>
                                    </button>
                                    <AnimatePresence>
                                        {showProfileMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-48 bg-premium-charcoal border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                                            >
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                                >
                                                    <User className="h-4 w-4" />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/profile#orders"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                                >
                                                    <Package className="h-4 w-4" />
                                                    Order History
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setShowProfileMenu(false);
                                                        signOut({ callbackUrl: '/' });
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                !isLoginPage && (
                                    <Link
                                        href="/login"
                                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-premium-gold hover:bg-white text-premium-black font-medium rounded-full transition-all transform hover:scale-105 duration-200"
                                    >
                                        Login
                                    </Link>
                                )
                            )}

                            <Link href="/cart" className="text-gray-300 hover:text-premium-gold transition-colors relative transform hover:scale-110 duration-200">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-premium-gold text-premium-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden text-gray-300 hover:text-premium-gold transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        />

                        {/* Mobile Menu Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-premium-charcoal border-l border-gray-800 shadow-2xl z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full text-white">
                                {/* Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                                    <h2 className="text-2xl font-bold font-playfair text-premium-gold">Menu</h2>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 overflow-y-auto py-6">
                                    <div className="space-y-2 px-4">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${pathname === link.href
                                                        ? 'bg-gradient-to-r from-premium-gold/20 to-transparent text-premium-gold border-l-4 border-premium-gold'
                                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}


                                        {/* Profile / Login Links - Mobile */}
                                        {session ? (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: navLinks.length * 0.05 }}
                                                >
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-300 hover:bg-white/5 hover:text-white"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <User className="h-5 w-5" />
                                                        My Profile
                                                    </Link>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(false);
                                                            signOut({ callbackUrl: '/' });
                                                        }}
                                                        className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                                                    >
                                                        <LogOut className="h-5 w-5" />
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            </>
                                        ) : (
                                            !isLoginPage && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: navLinks.length * 0.05 }}
                                                >
                                                    <Link
                                                        href="/login"
                                                        className="flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-premium-gold/20 text-premium-gold hover:bg-premium-gold/30 border border-premium-gold/30"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Login to Account
                                                    </Link>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </nav>

                                {/* Footer */}
                                <div className="p-6 border-t border-gray-800 bg-premium-black/50">
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center bg-premium-gold hover:bg-premium-gold-dark text-premium-black font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-premium-gold/20"
                                    >
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        View Cart {cartCount > 0 && `(${cartCount})`}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
