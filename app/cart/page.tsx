'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

    const shipping = items.length > 0 ? 120 : 0;
    const total = cartTotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-premium-black">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="bg-premium-charcoal rounded-2xl shadow-lg border border-gray-800 p-12 text-center max-w-lg w-full">
                        <div className="h-24 w-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ArrowRight className="h-10 w-10 text-premium-gold/50" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 font-playfair">Your Cart is Empty</h2>
                        <p className="text-gray-400 text-lg mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-premium-gold/20">
                            Start Shopping <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-premium-black">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-premium-gold mb-8 font-playfair">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-premium-charcoal rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
                            <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-6">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 p-3 sm:p-0 border border-gray-800 sm:border-0 rounded-lg sm:rounded-none bg-black/40 sm:bg-transparent sm:pb-6 sm:border-b last:border-0 last:pb-0">
                                        <div className="aspect-square sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md sm:rounded-lg border border-gray-700 relative">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between w-full text-left">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm sm:text-lg font-bold text-white font-playfair truncate sm:whitespace-normal">
                                                    <Link href={`/products/${item.id}`} className="hover:text-premium-gold transition-colors">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                                <p className="hidden sm:block mt-1 text-sm text-premium-gold">{item.category}</p>
                                                <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                                                    {item.selectedSize && (
                                                        <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">
                                                            {item.selectedSize}
                                                        </span>
                                                    )}
                                                    {item.selectedColor && (
                                                        <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700 flex items-center gap-1">
                                                            {item.selectedColor}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 sm:mt-2 text-sm sm:text-lg font-bold text-white">৳{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="mt-2 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-4">
                                                <div className="flex items-center border border-gray-700 rounded-md bg-black/30 h-8 sm:h-auto">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                                        className="px-2 hover:bg-gray-700 transition-colors h-full flex items-center"
                                                    >
                                                        <Minus className="h-3 w-3 text-gray-400" />
                                                    </button>
                                                    <span className="px-2 text-xs font-bold text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                                        className="px-2 hover:bg-gray-700 transition-colors h-full flex items-center"
                                                    >
                                                        <Plus className="h-3 w-3 text-gray-400" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                                    className="p-1 sm:p-0 flex items-center text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors bg-red-900/10 rounded sm:bg-transparent"
                                                >
                                                    <Trash2 className="h-4 w-4 sm:mr-1" />
                                                    <span className="sr-only sm:not-sr-only">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-premium-charcoal rounded-2xl shadow-sm border border-gray-800 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-premium-gold mb-6 font-playfair border-b border-gray-800 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>Shipping (Est.)</span>
                                    <span className="text-white font-medium">৳{shipping.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-white">Total</span>
                                    <span className="text-xl font-bold text-premium-gold">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-4 px-4 rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-premium-gold/20 uppercase tracking-wide text-sm">
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                            <div className="mt-6 flex items-center justify-center text-sm text-gray-500 gap-2">
                                <ShieldCheck className="h-4 w-4 text-premium-gold" />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
