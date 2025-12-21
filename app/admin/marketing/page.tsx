'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Save, Megaphone, Tag, Gift, Percent, Type, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function MarketingPage() {
    const { settings, updateSettings } = useAdmin();
    const [isSaving, setIsSaving] = useState(false);

    // Local state for form handling before saving to context
    const [localSettings, setLocalSettings] = useState(settings.marketingModal);

    const handleSave = () => {
        setIsSaving(true);
        // Update global settings
        updateSettings({
            ...settings,
            marketingModal: localSettings
        });

        // Simulate API call delay
        setTimeout(() => {
            setIsSaving(false);
            alert('Marketing settings saved successfully!');
        }, 1000);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Marketing Controls
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg shadow-premium-gold/20 transition-colors disabled:opacity-70"
                >
                    <Save className="h-5 w-5" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Marketing Modal Settings */}
                <motion.div
                    className="bg-premium-charcoal p-8 rounded-xl shadow-md border border-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                        <Megaphone className="h-6 w-6 text-premium-gold" />
                        <h2 className="text-xl font-bold text-white">Promotional Modal</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Enable/Disable Toggle */}
                        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-800">
                            <div>
                                <h3 className="text-white font-medium">Enable Modal</h3>
                                <p className="text-sm text-gray-400">Show promotional popup to visitors</p>
                            </div>
                            <button
                                onClick={() => setLocalSettings({ ...localSettings, enabled: !localSettings.enabled })}
                                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${localSettings.enabled ? 'bg-green-500' : 'bg-gray-700'
                                    }`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${localSettings.enabled ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>

                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Modal Title</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={localSettings.title}
                                    onChange={(e) => setLocalSettings({ ...localSettings, title: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                    placeholder="e.g., Exclusive Welcome Offer"
                                />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message Description</label>
                            <textarea
                                value={localSettings.description}
                                onChange={(e) => setLocalSettings({ ...localSettings, description: e.target.value })}
                                className="w-full p-4 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white h-32 resize-none"
                                placeholder="Enter your promotional message..."
                            />
                        </div>

                        {/* Discount Percentage */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Discount Percentage</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="number"
                                    value={localSettings.discountPercentage}
                                    onChange={(e) => setLocalSettings({ ...localSettings, discountPercentage: Number(e.target.value) })}
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Preview Card */}
                <motion.div
                    className="bg-premium-charcoal p-8 rounded-xl shadow-md border border-gray-800"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                        <ImageIcon className="h-6 w-6 text-premium-gold" />
                        <h2 className="text-xl font-bold text-white">Live Preview</h2>
                    </div>

                    <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-black/50 border border-gray-800 flex items-center justify-center p-8">
                        {/* Mock Modal */}
                        <div className={`
                            relative bg-[#1A1A1A] w-full max-w-sm rounded-2xl p-8 border border-white/10 shadow-2xl
                            transform transition-all duration-300
                            ${localSettings.enabled ? 'opacity-100 scale-100' : 'opacity-50 scale-95 grayscale'}
                        `}>
                            {!localSettings.enabled && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-[1px] rounded-2xl">
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Disabled</span>
                                </div>
                            )}

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-premium-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Gift className="h-8 w-8 text-premium-gold" />
                                </div>

                                <h3 className="text-2xl font-bold font-playfair text-white leading-tight">
                                    {localSettings.title || 'Your Title Here'}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    {localSettings.description || 'Your description text will appear here.'}
                                </p>

                                <div className="py-4">
                                    <div className="inline-block border-2 border-dashed border-premium-gold/30 bg-premium-gold/5 px-6 py-3 rounded-lg">
                                        <span className="text-2xl font-bold text-premium-gold tracking-widest">
                                            WELCOME{localSettings.discountPercentage}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Use code at checkout
                                    </p>
                                </div>

                                <button className="w-full py-3 bg-premium-gold text-premium-black font-bold rounded-lg shadow-lg">
                                    Claim Offer
                                </button>

                                <p className="text-xs text-gray-500 cursor-pointer hover:text-white transition-colors">
                                    No thanks, maybe later
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                        <h4 className="text-blue-200 font-bold mb-2 text-sm flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Pro Tip
                        </h4>
                        <p className="text-blue-300 text-sm">
                            The modal uses browser session storage. Changes might stick if you&apos;ve already seen the modal.
                            Clear your cookies or use Incognito mode to test the &quot;fresh&quot; user experience.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
