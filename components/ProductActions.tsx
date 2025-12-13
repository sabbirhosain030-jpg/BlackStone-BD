'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const router = useRouter();

    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="mb-4">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                    {product.name}
                </h1>

                <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-end gap-4 mb-8">
                    <span className="text-4xl font-bold text-gray-900">
                        ৳{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through mb-1">
                            ৳{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                    {product.originalPrice && (
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full mb-2">
                            Save ৳{(product.originalPrice - product.price).toLocaleString()}
                        </span>
                    )}
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            onClick={decrementQuantity}
                            className="p-3 hover:bg-gray-100 transition-colors"
                        >
                            <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-4 font-medium text-gray-900">{quantity}</span>
                        <button
                            onClick={incrementQuantity}
                            className="p-3 hover:bg-gray-100 transition-colors"
                        >
                            <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                    {/* Buy Now Button */}
                    <button
                        onClick={() => {
                            addToCart(product, quantity);
                            router.push('/checkout');
                        }}
                        disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                        className={`flex-1 font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-colors shadow-lg ${product.stockStatus === 'coming-soon' || product.stockStatus === 'out-of-stock' || product.stock === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hidden'
                            : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                            }`}
                    >
                        Buy Now
                    </button>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stockStatus === 'out-of-stock' || product.stockStatus === 'coming-soon' || product.stock === 0}
                        className={`flex-1 font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-colors shadow-lg ${product.stockStatus === 'coming-soon' || product.stockStatus === 'out-of-stock' || product.stock === 0
                            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                            }`}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {product.stockStatus === 'coming-soon' ? 'Coming Soon' :
                            product.stockStatus === 'out-of-stock' || product.stock === 0 ? 'Out of Stock' :
                                'Add to Cart'}
                    </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                        <Truck className="h-5 w-5 mr-2 text-blue-600" />
                        <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
                        <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
                        <span>Easy Returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
