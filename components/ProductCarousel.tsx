'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCarouselProps {
    products: Product[];
    title: string;
    autoPlayInterval?: number;
}

export default function ProductCarousel({ products, title, autoPlayInterval = 4000 }: ProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlayInterval]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    if (products.length === 0) return null;

    const currentProduct = products[currentIndex];

    return (
        <div className="relative w-full h-full">
            {/* Title Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                    <h3 className="text-sm font-bold tracking-wide">{title}</h3>
                </div>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                        }}
                        className="absolute w-full max-w-md px-4"
                    >
                        <Link href={`/products/${currentProduct.id}`}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer"
                            >
                                {/* Product Image */}
                                <div className="relative h-64 bg-white/5">
                                    <Image
                                        src={currentProduct.images[0]}
                                        alt={currentProduct.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {currentProduct.originalPrice && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            -{Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)}%
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-6 text-white">
                                    <h4 className="text-xl font-bold mb-2 line-clamp-1">
                                        {currentProduct.name}
                                    </h4>
                                    <p className="text-sm text-white/70 mb-4 line-clamp-2">
                                        {currentProduct.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            {currentProduct.originalPrice ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-green-400">
                                                        ৳ {currentProduct.price.toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-white/50 line-through">
                                                        ৳ {currentProduct.originalPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-2xl font-bold">
                                                    ৳ {currentProduct.price.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all border border-white/20"
                aria-label="Previous product"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all border border-white/20"
                aria-label="Next product"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all rounded-full ${index === currentIndex
                            ? 'bg-white w-8 h-2'
                            : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
