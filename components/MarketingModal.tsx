'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'blackstone_marketing_modal_dismissed';

export default function MarketingModal() {
    const { settings, addSubscriber } = useAdmin();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // STRICT ALLOW LIST: Only show on these pages
        const isHomePage = pathname === '/';
        const isProductPage = pathname?.startsWith('/products');
        const isCategoryPage = pathname?.startsWith('/categories');

        const isAllowedPage = isHomePage || isProductPage || isCategoryPage;

        // If not on an allowed page, do not show
        if (!isAllowedPage) {
            setIsOpen(false);
            return;
        }

        // Check if user has subscribed (permanent dismissal via subscription)
        // If they have NOT subscribed, we keep showing it (perhaps per session or always)
        // The requirement is "until subscribe", so we only check the subscribed flag.
        const hasSubscribed = localStorage.getItem(STORAGE_KEY);

        // Show modal if enabled in settings AND user hasn't subscribed
        if (settings.marketingModal.enabled && !hasSubscribed) {
            // Delay showing modal for better UX (2 seconds after page load)
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [settings.marketingModal.enabled, pathname]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            addSubscriber(email);
            setIsSubmitted(true);

            // Save to localStorage when user subscribes
            localStorage.setItem(STORAGE_KEY, 'true');

            // Don't auto-close - let user copy the code first
        }
    };

    const handleCopyCode = async () => {
        const code = settings.marketingModal.couponCode || 'WELCOME10';
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const discountPercentage = settings.marketingModal.discountPercentage;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-md w-full bg-gradient-to-br from-premium-black via-premium-charcoal to-premium-black border-2 border-premium-gold/50 rounded-2xl shadow-2xl shadow-premium-gold/20 overflow-hidden"
                    >
                        {/* Close Button - Enhanced */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-full group"
                            aria-label="Close modal"
                        >
                            <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjR6bS0yIDMyYzAtMiAyLTQgNC00cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00cy00LTItNC00VjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

                        <div className="relative p-8 sm:p-10">
                            {!isSubmitted ? (
                                <>
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                        className="flex justify-center mb-6"
                                    >
                                        <div className="p-4 bg-premium-gold/10 rounded-full border-2 border-premium-gold/30">
                                            <Gift className="h-12 w-12 text-premium-gold" />
                                        </div>
                                    </motion.div>

                                    {/* Heading */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-3xl sm:text-4xl font-bold text-center mb-4 font-playfair"
                                    >
                                        <span className="text-premium-gold">
                                            GET <span className="text-5xl sm:text-6xl font-black">{discountPercentage}%</span> OFF
                                        </span>
                                        <br />
                                        <span className="text-white text-2xl sm:text-3xl">YOUR FIRST ORDER</span>
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-gray-400 text-center mb-8 text-sm sm:text-base"
                                    >
                                        Join our exclusive community and receive special offers on premium products
                                    </motion.p>

                                    {/* Email Form */}
                                    <motion.form
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full px-5 py-4 bg-black border-2 border-gray-800 rounded-lg focus:border-premium-gold focus:ring-2 focus:ring-premium-gold/20 outline-none text-white placeholder-gray-600 transition-all"
                                                required
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-4 rounded-lg shadow-lg shadow-premium-gold/20 transition-colors uppercase tracking-wider text-sm sm:text-base"
                                        >
                                            CLAIM {discountPercentage}% DISCOUNT
                                        </motion.button>
                                    </motion.form>

                                    <p className="text-xs text-gray-500 text-center mt-6">
                                        By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                                    </p>
                                </>
                            ) : (
                                /* Success State with Copy Functionality */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="mb-6">
                                        <div className="inline-flex p-4 bg-green-500/10 rounded-full border-2 border-green-500/30">
                                            <Gift className="h-12 w-12 text-green-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 font-playfair">Thank You!</h3>
                                    <p className="text-gray-400 mb-6">
                                        Here is your exclusive {discountPercentage}% discount code:
                                    </p>
                                    <div className="bg-white/10 border border-premium-gold/50 rounded-lg p-4 mb-4">
                                        <code className="text-2xl font-mono font-bold text-premium-gold tracking-widest">
                                            {settings.marketingModal.couponCode || 'WELCOME10'}
                                        </code>
                                    </div>

                                    {/* Copy Button */}
                                    <motion.button
                                        onClick={handleCopyCode}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all ${isCopied
                                            ? 'bg-green-600 text-white'
                                            : 'bg-premium-gold text-premium-black hover:bg-white'
                                            }`}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="h-5 w-5" />
                                                COPIED!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-5 w-5" />
                                                COPY CODE
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-xs text-gray-500 mt-4">
                                        Use this code at checkout to get your discount
                                    </p>
                                    <p className="text-xs text-premium-gold mt-2">
                                        Click the × button above to close
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
