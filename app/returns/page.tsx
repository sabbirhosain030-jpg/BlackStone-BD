import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Returns & Exchanges</h1>
                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p className="mb-4">We want you to be completely satisfied with your purchase. If you are not happy with your product, we are here to help.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Return Policy</h3>
                        <p className="mb-4">You can return items within 7 days of receipt if the product is defective or not as described.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Conditions for Return</h3>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>The product must be unused and in the same condition that you received it.</li>
                            <li>It must be in the original packaging.</li>
                            <li>You must have the receipt or proof of purchase.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Refunds</h3>
                        <p className="mb-4">Once we receive your item, we will inspect it and notify you that we have received your returned item. If your return is approved, we will initiate a refund to your original method of payment or provide store credit.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
