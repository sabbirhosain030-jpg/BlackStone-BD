'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Truck, Banknote } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, cartTotal, clearCart } = useCart();
    const { settings } = useAdmin();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        district: 'Dhaka',
        zip: '',
        location: 'inside', // 'inside' or 'outside'
    });

    const shipping = items.length > 0
        ? (formData.location === 'inside' ? settings.deliveryChargeInsideDhaka : settings.deliveryChargeOutsideDhaka)
        : 0;
    const total = cartTotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create order data
        const orderData = {
            ...formData,
            items: items,
            total: total,
            orderDate: new Date().toISOString(),
        };

        // Store order in localStorage for the success page
        localStorage.setItem('lastOrder', JSON.stringify(orderData));

        // Clear cart
        clearCart();

        // Redirect to success page
        router.push('/order-success');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <p className="text-gray-500 text-lg mb-6">Your cart is empty. Add some products before checking out.</p>
                            <Link href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                                Browse Products
                            </Link>
                        </div>
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
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Contact Information */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                placeholder="+880 1234-567890"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                            <input
                                                type="text"
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                placeholder="123 Main St, Apt 4B"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                                <select
                                                    id="district"
                                                    value={formData.district}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                >
                                                    <option>Dhaka</option>
                                                    <option>Chittagong</option>
                                                    <option>Sylhet</option>
                                                    <option>Khulna</option>
                                                    <option>Rajshahi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    value={formData.zip}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Location */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Location</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer flex items-center transition-all ${formData.location === 'inside'
                                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                                    : 'border-gray-200 hover:border-blue-200'
                                                }`}
                                            onClick={() => setFormData({ ...formData, location: 'inside' })}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.location === 'inside' ? 'border-blue-600' : 'border-gray-400'
                                                }`}>
                                                {formData.location === 'inside' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-900">Inside Dhaka</span>
                                                <span className="text-sm text-gray-500">Delivery Charge: ৳{settings.deliveryChargeInsideDhaka}</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer flex items-center transition-all ${formData.location === 'outside'
                                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                                    : 'border-gray-200 hover:border-blue-200'
                                                }`}
                                            onClick={() => setFormData({ ...formData, location: 'outside' })}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.location === 'outside' ? 'border-blue-600' : 'border-gray-400'
                                                }`}>
                                                {formData.location === 'outside' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-900">Outside Dhaka</span>
                                                <span className="text-sm text-gray-500">Delivery Charge: ৳{settings.deliveryChargeOutsideDhaka}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                                        <Banknote className="h-6 w-6 text-blue-600 mr-3" />
                                        <div>
                                            <span className="block font-medium text-blue-900">Cash on Delivery (COD)</span>
                                            <span className="block text-sm text-blue-700">Pay when you receive your order.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal ({items.length} items)</span>
                                            <span>৳{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span>৳{shipping.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">
                                        <span>Total Amount</span>
                                        <span>৳{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg shadow-blue-600/20 text-lg"
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </button>

                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <ShieldCheck className="h-4 w-4 mr-1" />
                                        Secure
                                    </div>
                                    <div className="flex items-center">
                                        <Truck className="h-4 w-4 mr-1" />
                                        Fast Delivery
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
