'use client';

import { X, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeasurementGuide {
    sizes: {
        name: string;
        chest?: string;
        waist?: string;
        length?: string;
        shoulder?: string;
        sleeve?: string;
    }[];
}

interface MeasurementGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    guide: MeasurementGuide;
    categoryName: string;
}

export default function MeasurementGuideModal({ isOpen, onClose, guide, categoryName }: MeasurementGuideModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-premium-charcoal rounded-xl border border-gray-800 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-premium-gold/10 rounded-lg">
                                    <Ruler className="h-6 w-6 text-premium-gold" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Size Guide</h2>
                                    <p className="text-sm text-gray-400">{categoryName}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Measurement Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-4 text-premium-gold font-semibold">Size</th>
                                        {guide.sizes[0]?.chest && <th className="text-left py-3 px-4 text-gray-400 font-semibold">Chest</th>}
                                        {guide.sizes[0]?.waist && <th className="text-left py-3 px-4 text-gray-400 font-semibold">Waist</th>}
                                        {guide.sizes[0]?.length && <th className="text-left py-3 px-4 text-gray-400 font-semibold">Length</th>}
                                        {guide.sizes[0]?.shoulder && <th className="text-left py-3 px-4 text-gray-400 font-semibold">Shoulder</th>}
                                        {guide.sizes[0]?.sleeve && <th className="text-left py-3 px-4 text-gray-400 font-semibold">Sleeve</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {guide.sizes.map((size, index) => (
                                        <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                            <td className="py-3 px-4 text-white font-medium">{size.name}</td>
                                            {size.chest && <td className="py-3 px-4 text-gray-300">{size.chest}</td>}
                                            {size.waist && <td className="py-3 px-4 text-gray-300">{size.waist}</td>}
                                            {size.length && <td className="py-3 px-4 text-gray-300">{size.length}</td>}
                                            {size.shoulder && <td className="py-3 px-4 text-gray-300">{size.shoulder}</td>}
                                            {size.sleeve && <td className="py-3 px-4 text-gray-300">{size.sleeve}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Note */}
                        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400">
                                <span className="font-semibold text-premium-gold">Note:</span> All measurements are in inches. For best fit, measure yourself and compare with the size chart.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
