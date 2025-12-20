import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductActions from '@/components/ProductActions';
import ProductImageGallery from '@/components/ProductImageGallery';
import { getProductById, products } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = getProductById(params.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
                        <Link href="/products" className="text-blue-600 hover:underline mt-4 block">
                            Back to Products
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

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Back Button - Mobile Optimized */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-premium-gold transition-colors mb-6 sm:mb-8 group"
                >
                    <div className="p-2 sm:p-2.5 rounded-full bg-gray-900 group-hover:bg-premium-gold/10 transition-colors border border-gray-800 group-hover:border-premium-gold/30">
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">Back to Products</span>
                </Link>

                <div className="bg-premium-charcoal rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* ImageGallery */}
                        <ProductImageGallery product={product} />

                        {/* Product Info */}
                        <div className="p-6 lg:p-8">
                            <ProductActions product={product} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
