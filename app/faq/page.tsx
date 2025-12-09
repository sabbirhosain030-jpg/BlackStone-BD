import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">How do I place an order?</h2>
                            <p className="text-gray-600">Simply browse our products, add items to your cart, and proceed to checkout. We offer Cash on Delivery for your convenience.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">What are the delivery charges?</h2>
                            <p className="text-gray-600">Delivery charges are ৳60 inside Dhaka and ৳120 outside Dhaka.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">How long does delivery take?</h2>
                            <p className="text-gray-600">Delivery usually takes 2-3 days inside Dhaka and 3-5 days outside Dhaka.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
