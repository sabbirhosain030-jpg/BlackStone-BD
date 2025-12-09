import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>
                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p className="mb-4">At BlackStone BD, we strive to deliver your products as quickly and safely as possible.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Delivery Areas</h3>
                        <p className="mb-4">We deliver all across Bangladesh.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Delivery Charges</h3>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>Inside Dhaka: ৳60</li>
                            <li>Outside Dhaka: ৳120</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Delivery Time</h3>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>Inside Dhaka: 2-3 business days</li>
                            <li>Outside Dhaka: 3-5 business days</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
