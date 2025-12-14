'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import PremiumButton from './ui/PremiumButton';

interface ProductQuickViewProps {
    isOpen: boolean;
    closeModal: () => void;
    product: Product;
}

export default function ProductQuickView({ isOpen, closeModal, product }: ProductQuickViewProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-premium-charcoal p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Image Section */}
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    {/* Details Section */}
                                    <div className="flex flex-col">
                                        <div className="mb-6">
                                            <p className="text-sm text-premium-gold font-bold uppercase tracking-wider mb-2">
                                                {product.category}
                                            </p>
                                            <Dialog.Title as="h3" className="text-3xl font-bold font-playfair text-white mb-2">
                                                {product.name}
                                            </Dialog.Title>
                                            <div className="flex items-center gap-4 mt-4">
                                                <p className="text-2xl font-bold text-white">
                                                    ৳{product.price.toLocaleString()}
                                                </p>
                                                {product.originalPrice && (
                                                    <p className="text-lg text-gray-500 line-through">
                                                        ৳{product.originalPrice.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 mb-8 line-clamp-3">
                                            {product.description}
                                        </p>

                                        <div className="mt-auto space-y-4">
                                            <div className="flex gap-4">
                                                <PremiumButton
                                                    onClick={handleAddToCart}
                                                    disabled={product.stockStatus === 'out-of-stock'}
                                                    className="flex-1"
                                                    icon={ShoppingCart}
                                                >
                                                    {isAdding ? 'Added!' : 'Add to Cart'}
                                                </PremiumButton>
                                                <Link href={`/products/${product.id}`} className="flex-1">
                                                    <PremiumButton
                                                        variant="outline"
                                                        className="w-full"
                                                        icon={Eye}
                                                    >
                                                        View Details
                                                    </PremiumButton>
                                                </Link>
                                            </div>
                                            {product.stockStatus === 'out-of-stock' && (
                                                <p className="text-red-500 font-bold text-center">Out of Stock</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
