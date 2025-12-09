'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

    const shipping = items.length > 0 ? 120 : 0;
    const total = cartTotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                        <Link href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between w-full">
                                            <div className="flex-1">
                                                <h3 className="text-base font-medium text-gray-900">
                                                    <Link href={`/products/${item.id}`} className="hover:text-blue-600 transition-colors">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-900">৳{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 flex items-center justify-between sm:flex-col sm:items-end sm:justify-between">
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                    <span className="px-3 text-sm font-medium text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center text-sm text-red-600 hover:text-red-500 transition-colors mt-2"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Remove
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
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span>৳{shipping.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                    <span className="text-base font-medium text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-gray-900">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link href="/checkout" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-blue-600/20">
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>

                            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                                <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
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
