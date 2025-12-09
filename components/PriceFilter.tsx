'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Banknote } from 'lucide-react';

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (min: number, max: number) => void;
}

export default function PriceFilter({ minPrice, maxPrice, onPriceChange }: PriceFilterProps) {
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

    const handleChange = (values: number[]) => {
        setPriceRange(values);
        onPriceChange(values[0], values[1]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
            <div className="flex items-center gap-2 mb-4">
                <Banknote className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Price Range (BDT)</h3>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>৳ {priceRange[0].toLocaleString()}</span>
                    <span>৳ {priceRange[1].toLocaleString()}</span>
                </div>

                <div className="relative pt-2 pb-2">
                    {/* Track background */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-lg">
                        {/* Active range highlight */}
                        <div
                            className="absolute h-2 bg-blue-600 rounded-lg"
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
                        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20 top-0"
                        style={{
                            WebkitAppearance: 'none',
                        }}
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
                        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer z-20 top-0"
                        style={{
                            WebkitAppearance: 'none',
                        }}
                    />

                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            background: #3B82F6;
                            cursor: pointer;
                            border: 3px solid white;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        }
                        
                        input[type="range"]::-moz-range-thumb {
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            background: #3B82F6;
                            cursor: pointer;
                            border: 3px solid white;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        }
                        
                        input[type="range"]::-webkit-slider-thumb:hover {
                            background: #2563EB;
                            transform: scale(1.1);
                        }
                        
                        input[type="range"]::-moz-range-thumb:hover {
                            background: #2563EB;
                            transform: scale(1.1);
                        }
                    `}</style>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Min Price (৳)</label>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => handleChange([Number(e.target.value), priceRange[1]])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Max Price (৳)</label>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => handleChange([priceRange[0], Number(e.target.value)])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onPriceChange(priceRange[0], priceRange[1])}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Apply Filter
                </motion.button>
            </div>
        </motion.div>
    );
}
