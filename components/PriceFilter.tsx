'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Banknote, Palette, Check } from 'lucide-react';

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (min: number, max: number) => void;
    // onColorChange removed as per new requirement
    onClose?: () => void; // For mobile auto-close
}

const COLORS = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Gold', value: 'gold', hex: '#D4AF37' },
    { name: 'Red', value: 'red', hex: '#EF4444' },
    { name: 'Blue', value: 'blue', hex: '#3B82F6' },
    { name: 'Green', value: 'green', hex: '#22C55E' },
    { name: 'Gray', value: 'gray', hex: '#6B7280' },
];

export default function PriceFilter({ minPrice, maxPrice, onPriceChange, onClose }: PriceFilterProps) {
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const handleChange = (values: number[]) => {
        setPriceRange(values);
        // Debounce actual update to parent? Or just wait for button.
        // Assuming parent update happens on "Apply" button or here. 
        // For now, let's keep it manual apply for better UX.
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const handleApply = () => {
        onPriceChange(priceRange[0], priceRange[1]);
        if (onClose && window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-premium-charcoal p-6 rounded-xl shadow-lg border border-gray-800 backdrop-blur-md"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-premium-gold" />
                    <h3 className="text-lg font-bold text-white font-playfair">Filters</h3>
                </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">Price Range</h4>

                <div className="space-y-6">
                    <div className="flex justify-between text-sm font-medium text-premium-gold">
                        <span>৳ {priceRange[0].toLocaleString()}</span>
                        <span>৳ {priceRange[1].toLocaleString()}</span>
                    </div>

                    <div className="relative pt-2 pb-2">
                        {/* Track background */}
                        <div className="relative w-full h-1 bg-gray-700 rounded-lg">
                            {/* Active range highlight */}
                            <div
                                className="absolute h-1 bg-premium-gold rounded-lg"
                                style={{
                                    left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                    right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                }}
                            />
                        </div>

                        {/* Min range slider */}
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value < priceRange[1]) {
                                    handleChange([value, priceRange[1]]);
                                }
                            }}
                            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20 top-0"
                            style={{ WebkitAppearance: 'none' }}
                        />

                        {/* Max range slider */}
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value > priceRange[0]) {
                                    handleChange([priceRange[0], value]);
                                }
                            }}
                            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20 top-0"
                            style={{ WebkitAppearance: 'none' }}
                        />

                        <style jsx>{`
                            input[type="range"]::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #D4AF37;
                                cursor: pointer;
                                border: 2px solid #000;
                                box-shadow: 0 0 10px rgba(212,175,55,0.5);
                                transition: all 0.2s ease;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover,
                            input[type="range"]::-webkit-slider-thumb:active {
                                transform: scale(1.2);
                            }
                        `}</style>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/40 p-2 rounded border border-gray-700">
                            <label className="text-xs text-gray-500 mb-1 block">Min (৳)</label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handleChange([Number(e.target.value), priceRange[1]])}
                                className="w-full bg-transparent text-white text-sm focus:outline-none"
                            />
                        </div>
                        <div className="bg-black/40 p-2 rounded border border-gray-700">
                            <label className="text-xs text-gray-500 mb-1 block">Max (৳)</label>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handleChange([priceRange[0], Number(e.target.value)])}
                                className="w-full bg-transparent text-white text-sm focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>



            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-premium-gold/20"
            >
                Apply Filter
            </motion.button>
        </motion.div>
    );
}
