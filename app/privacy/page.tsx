import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p className="mb-4">Your privacy is important to us. It is BlackStone BD&apos;s policy to respect your privacy regarding any information we may collect from you across our website.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information We Collect</h3>
                        <p className="mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How We Use Information</h3>
                        <p className="mb-4">We use the information we collect to process your orders, communicate with you, and improve our services.</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Data Security</h3>
                        <p className="mb-4">We don&apos;t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
