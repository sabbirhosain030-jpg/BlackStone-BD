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

    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    const shipping = items.length > 0
        ? (formData.location === 'inside' ? settings.deliveryChargeInsideDhaka : settings.deliveryChargeOutsideDhaka)
        : 0;
    const total = cartTotal + shipping - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponError('');
        setCouponSuccess('');

        try {
            const res = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: couponCode,
                    cartTotal,
                    email: formData.email, // Send email for first-order check
                    isFirstOrder: true // In a real app, verify this against DB. For now, assume true or rely on email check.
                }),
            });
            const data = await res.json();

            if (res.ok && data.valid) {
                setDiscount(data.discountAmount);
                setAppliedCoupon(data.couponcode);
                setCouponSuccess(`Coupon applied! You saved ৳${data.discountAmount}`);
            } else {
                setCouponError(data.message || 'Invalid coupon');
                setDiscount(0);
                setAppliedCoupon(null);
            }
        } catch (err) {
            setCouponError('Failed to validate coupon');
        }
    };

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
            subtotal: cartTotal,
            shipping: shipping,
            discount: discount,
            couponCode: appliedCoupon,
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
            <div className="min-h-screen flex flex-col bg-premium-black">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="max-w-xl w-full text-center">
                        <div className="bg-premium-charcoal rounded-2xl shadow-lg border border-gray-800 p-12">
                            <h2 className="text-2xl font-bold text-white mb-4 font-playfair">Your cart is empty</h2>
                            <p className="text-gray-400 mb-8">Please add some products to your cart before proceeding to checkout.</p>
                            <Link href="/products" className="inline-block bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-premium-gold/20">
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
        <div className="min-h-screen flex flex-col bg-premium-black">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-premium-gold mb-8 text-center font-playfair">Checkout</h1>

                    <div className="bg-premium-charcoal rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
                        <div className="p-6 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Contact Information */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-premium-gold text-premium-black flex items-center justify-center text-sm font-bold">1</div>
                                        Contact Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all placeholder-gray-600"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all placeholder-gray-600"
                                                placeholder="+880 1234-567890"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-premium-gold text-premium-black flex items-center justify-center text-sm font-bold">2</div>
                                        Shipping Address
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">First Name *</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">Last Name *</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">Address *</label>
                                            <input
                                                type="text"
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all placeholder-gray-600"
                                                placeholder="123 Main St, Apt 4B"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-1">City *</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="district" className="block text-sm font-medium text-gray-400 mb-1">District *</label>
                                                <select
                                                    id="district"
                                                    value={formData.district}
                                                    onChange={handleChange}
                                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all"
                                                >
                                                    <option>Dhaka</option>
                                                    <option>Chittagong</option>
                                                    <option>Sylhet</option>
                                                    <option>Khulna</option>
                                                    <option>Rajshahi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="zip" className="block text-sm font-medium text-gray-400 mb-1">Zip Code</label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    value={formData.zip}
                                                    onChange={handleChange}
                                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Location */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-premium-gold text-premium-black flex items-center justify-center text-sm font-bold">3</div>
                                        Delivery Location
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div
                                            className={`border rounded-xl p-6 cursor-pointer flex items-center transition-all ${formData.location === 'inside'
                                                ? 'border-premium-gold bg-premium-gold/10 ring-1 ring-premium-gold'
                                                : 'border-gray-700 bg-black/30 hover:border-gray-500'
                                                }`}
                                            onClick={() => setFormData({ ...formData, location: 'inside' })}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${formData.location === 'inside' ? 'border-premium-gold' : 'border-gray-500'
                                                }`}>
                                                {formData.location === 'inside' && <div className="w-3 h-3 rounded-full bg-premium-gold" />}
                                            </div>
                                            <div>
                                                <span className="block font-bold text-white text-lg">Inside Dhaka</span>
                                                <span className="text-sm text-gray-400">Delivery Charge: <span className="text-premium-gold font-bold">৳{settings.deliveryChargeInsideDhaka}</span></span>
                                            </div>
                                        </div>

                                        <div
                                            className={`border rounded-xl p-6 cursor-pointer flex items-center transition-all ${formData.location === 'outside'
                                                ? 'border-premium-gold bg-premium-gold/10 ring-1 ring-premium-gold'
                                                : 'border-gray-700 bg-black/30 hover:border-gray-500'
                                                }`}
                                            onClick={() => setFormData({ ...formData, location: 'outside' })}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${formData.location === 'outside' ? 'border-premium-gold' : 'border-gray-500'
                                                }`}>
                                                {formData.location === 'outside' && <div className="w-3 h-3 rounded-full bg-premium-gold" />}
                                            </div>
                                            <div>
                                                <span className="block font-bold text-white text-lg">Outside Dhaka</span>
                                                <span className="text-sm text-gray-400">Delivery Charge: <span className="text-premium-gold font-bold">৳{settings.deliveryChargeOutsideDhaka}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-premium-gold text-premium-black flex items-center justify-center text-sm font-bold">4</div>
                                        Payment Method
                                    </h2>
                                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-xl p-6 flex items-center shadow-inner">
                                        <div className="p-3 bg-premium-gold/20 rounded-lg mr-4 text-premium-gold">
                                            <Banknote className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-white text-lg">Cash on Delivery (COD)</span>
                                            <span className="block text-sm text-gray-400">Pay securely when you receive your order at your doorstep.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Code */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-premium-gold text-premium-black flex items-center justify-center text-sm font-bold">%</div>
                                        Disclaimer & Coupons
                                    </h2>
                                    <div className="bg-black/30 rounded-xl p-6 border border-gray-800">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                placeholder="Enter Coupon Code"
                                                className="flex-1 bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all placeholder-gray-600 uppercase tracking-wider"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                className="bg-gray-800 hover:bg-premium-gold hover:text-premium-black text-white font-bold py-3 px-6 rounded-lg transition-all"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && <p className="text-red-400 text-sm mt-2">{couponError}</p>}
                                        {couponSuccess && <p className="text-green-400 text-sm mt-2">{couponSuccess}</p>}

                                        <p className="text-xs text-gray-500 mt-4">
                                            * By placing this order, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                                    <h3 className="text-lg font-bold text-premium-gold mb-4 font-playfair">Order Summary</h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Subtotal ({items.length} items)</span>
                                            <span className="text-white">৳{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Shipping</span>
                                            <span className="text-white">৳{shipping.toLocaleString()}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-sm text-premium-gold">
                                                <span>Discount</span>
                                                <span>-৳{discount.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold text-white pt-4 border-t border-gray-700">
                                        <span>Total Amount</span>
                                        <span className="text-premium-gold">৳{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-premium-gold hover:bg-white disabled:bg-gray-700 disabled:text-gray-500 text-premium-black font-bold py-4 px-8 rounded-lg transition-all shadow-lg shadow-premium-gold/20 text-lg uppercase tracking-widest hover:scale-[1.02]"
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </button>

                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="h-4 w-4 text-premium-gold" />
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Truck className="h-4 w-4 text-premium-gold" />
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
