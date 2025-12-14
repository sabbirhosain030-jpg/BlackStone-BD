'use client';

import { ShoppingCart, ArrowRight, Plus, Minus, Box } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductImageGallery({ product }: { product: Product }) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [is3DMode, setIs3DMode] = useState(false);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));
    const toggle3DMode = () => {
        setIs3DMode(!is3DMode);
        setZoomLevel(1); // Reset zoom when switching modes
    };

    return (
        <div className="p-6 lg:p-8 bg-gray-900 flex flex-col items-center justify-center h-full gap-6">
            <div className="aspect-square w-full max-w-md relative rounded-xl overflow-hidden bg-premium-charcoal shadow-sm group border border-gray-800">
                <motion.div
                    className="w-full h-full relative"
                    animate={is3DMode ? { rotateY: 360 } : { scale: zoomLevel }}
                    transition={is3DMode ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                {/* 3D Badge */}
                {is3DMode && (
                    <div className="absolute top-4 right-4 bg-premium-gold text-premium-black px-3 py-1 rounded-full text-xs font-bold border border-white/20 animate-pulse z-10">
                        3D View
                    </div>
                )}

                {/* Overlay Cart Button */}
                <div className="absolute bottom-6 right-6 z-20 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button
                        onClick={() => document.getElementById('add-to-cart-btn')?.click()}
                        className="bg-premium-gold hover:bg-white text-premium-black p-4 rounded-full shadow-lg shadow-black/20 hover:scale-110 transition-all active:scale-95"
                        title="Quick Add to Cart"
                    >
                        <ShoppingCart className="h-6 w-6" />
                    </button>
                </div>

                {/* Back Button Overlay */}
                <Link
                    href="/products"
                    className="absolute top-6 left-6 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full transition-all hover:scale-105 border border-white/10 group/back"
                >
                    <ArrowRight className="h-6 w-6 rotate-180 group-hover/back:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 bg-premium-charcoal p-2 rounded-full border border-gray-800 shadow-lg">
                <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1 || is3DMode}
                    className="p-3 rounded-full hover:bg-gray-800 text-white disabled:opacity-30 transition-colors"
                    title="Zoom Out"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <span className="text-sm font-mono text-premium-gold w-12 text-center">
                    {Math.round(zoomLevel * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3 || is3DMode}
                    className="p-3 rounded-full hover:bg-gray-800 text-white disabled:opacity-30 transition-colors"
                    title="Zoom In"
                >
                    <Plus className="h-5 w-5" />
                </button>
                <div className="w-[1px] h-6 bg-gray-700 mx-2" />
                <button
                    onClick={toggle3DMode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${is3DMode
                        ? 'bg-premium-gold text-premium-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                        : 'bg-gray-800 text-gray-300 hover:text-white'}`}
                    title="Toggle 3D View"
                >
                    <Box className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-wider">{is3DMode ? 'Stop 3D' : '3D View'}</span>
                </button>
            </div>
        </div>
    );
}
