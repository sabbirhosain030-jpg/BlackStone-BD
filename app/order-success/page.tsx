'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Package, Home, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
    const [orderData, setOrderData] = useState<any>(null);
    const receiptRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem('lastOrder');
        if (savedOrder) {
            setOrderData(JSON.parse(savedOrder));
        }

        // Trigger confetti animation
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleDownloadReceipt = () => {
        window.print();
    };

    return (
        <>
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                    }
                }
            `}</style>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="no-print">
                    <Navbar />
                </div>

                <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-100 rounded-full p-4">
                                    <CheckCircle className="h-16 w-16 text-green-600" />
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Order Placed Successfully!
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Thank you for your order. We&apos;ll contact you shortly to confirm your delivery details.
                            </p>
                        </div>

                        {orderData && (
                            <div className="border-t border-gray-100 pt-8 mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>

                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Customer Name</p>
                                            <p className="font-medium text-gray-900">{orderData.firstName} {orderData.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Email</p>
                                            <p className="font-medium text-gray-900">{orderData.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900">{orderData.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Delivery Address</p>
                                            <p className="font-medium text-gray-900">
                                                {orderData.address}, {orderData.city}, {orderData.district}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                                    <div className="space-y-3">
                                        {orderData.items.map((item: any) => (
                                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-gray-900">
                                                    ৳{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total Amount</span>
                                        <span>৳{orderData.total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Payment Method: Cash on Delivery</p>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 no-print">
                            <button
                                onClick={handleDownloadReceipt}
                                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download Receipt
                            </button>
                            <Link
                                href="/products"
                                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                            >
                                <Package className="mr-2 h-5 w-5" />
                                Continue Shopping
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors"
                            >
                                <Home className="mr-2 h-5 w-5" />
                                Back to Home
                            </Link>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg no-print">
                            <p className="text-sm text-blue-900">
                                <strong>What&apos;s Next?</strong> Our team will contact you within 24 hours to confirm your order and delivery schedule.
                                You&apos;ll receive your order within 3-5 business days.
                            </p>
                        </div>
                    </div>
                </main>

                <div className="no-print">
                    <Footer />
                </div>
            </div>
        </>
    );
}
