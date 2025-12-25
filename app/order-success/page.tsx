'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderReceipt from '@/components/OrderReceipt';
import { CheckCircle, Package, Home, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generatePDF } from '@/lib/utils/pdf-generator';

export default function OrderSuccessPage() {
    const [orderData, setOrderData] = useState<any>(null);
    const [isDownloading, setIsDownloading] = useState(false);
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

    const handleDownloadReceipt = async () => {
        if (!orderData) return;

        setIsDownloading(true);
        try {
            await generatePDF('order-receipt', `BlackStoneBD-Receipt-${Date.now()}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-premium-black">
                <div className="no-print">
                    <Navbar />
                </div>

                <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                    {/* Success Message */}
                    <div className="bg-premium-charcoal rounded-2xl shadow-lg shadow-black/50 border border-gray-800 p-8 md:p-12 mb-8 no-print">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-500/10 rounded-full p-4 border border-green-500/20">
                                    <CheckCircle className="h-16 w-16 text-green-500" />
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
                                Order Placed Successfully!
                            </h1>
                            <p className="text-gray-300 text-lg mb-8">
                                Thank you for your order. We&apos;ll contact you shortly to confirm your delivery details.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                                <button
                                    onClick={handleDownloadReceipt}
                                    disabled={isDownloading || !orderData}
                                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-green-900/50 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-green-500/30"
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    {isDownloading ? 'Generating PDF...' : 'Download Receipt'}
                                </button>
                                <Link
                                    href="/products"
                                    className="flex items-center justify-center bg-premium-gold hover:bg-white hover:text-premium-black text-premium-black font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-premium-gold/20"
                                >
                                    <Package className="mr-2 h-5 w-5" />
                                    Continue Shopping
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-8 rounded-lg transition-colors border border-gray-700"
                                >
                                    <Home className="mr-2 h-5 w-5" />
                                    Back to Home
                                </Link>
                            </div>

                            <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                                <p className="text-sm text-blue-200">
                                    <strong>What&apos;s Next?</strong> Our team will contact you within 24 hours to confirm your order and delivery schedule.
                                    You&apos;ll receive your order within 3-5 business days.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Receipt - Hidden from view but available for PDF/Print */}
                    {orderData && (
                        <div className="fixed -left-[9999px] top-0 w-[210mm] min-h-[297mm] bg-white text-black p-10 print:static print:w-auto print:h-auto print:p-0">
                            <OrderReceipt orderData={orderData} />
                        </div>
                    )}
                </main>

                <div className="no-print">
                    <Footer />
                </div>
            </div>
        </>
    );
}
