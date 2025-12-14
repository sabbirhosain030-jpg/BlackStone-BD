import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductActions from '@/components/ProductActions';
import ProductImageGallery from '@/components/ProductImageGallery';
import { getProductById, products } from '@/lib/data';
import Link from 'next/link';

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

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-premium-charcoal rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Gallery */}
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
