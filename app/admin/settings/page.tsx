'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, DollarSign, Facebook, Instagram, Twitter, Youtube, User, Lock } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSettingsPage() {
    const { settings, updateSettings } = useAdmin();
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General Settings', icon: Globe },
        { id: 'social', label: 'Social Media', icon: Facebook },
        { id: 'profile', label: 'Admin Profile', icon: User },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    className="text-3xl font-bold text-white font-playfair"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Settings
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg shadow-lg shadow-premium-gold/20 transition-colors"
                >
                    <Save className="h-5 w-5" />
                    Save Changes
                </motion.button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-premium-charcoal rounded-xl shadow-md border border-gray-800 overflow-hidden">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-black/40 text-premium-gold border-l-4 border-premium-gold'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <motion.div
                    className="flex-1 bg-premium-charcoal rounded-xl shadow-md border border-gray-800 p-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={activeTab}
                >
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6 font-playfair">General Information</h2>
                            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <Globe className="h-5 w-5 text-blue-400 mt-1" />
                                    <div>
                                        <p className="text-blue-200 font-medium">Looking for Contact & Address Settings?</p>
                                        <p className="text-blue-300 text-sm mt-1">
                                            Manage your company address, location, contact numbers, and emails in the
                                            <a href="/admin/company" className="text-premium-gold hover:underline ml-1">Company Settings</a> page.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Site Name</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={settings.siteName}
                                            onChange={(e) => updateSettings({ ...settings, siteName: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Currency Symbol</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={settings.currency}
                                            onChange={(e) => updateSettings({ ...settings, currency: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Charge (Inside Dhaka)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                                        <input
                                            type="number"
                                            value={settings.deliveryChargeInsideDhaka}
                                            onChange={(e) => updateSettings({ ...settings, deliveryChargeInsideDhaka: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Charge (Outside Dhaka)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                                        <input
                                            type="number"
                                            value={settings.deliveryChargeOutsideDhaka}
                                            onChange={(e) => updateSettings({ ...settings, deliveryChargeOutsideDhaka: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6 font-playfair">Social Media Links</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Facebook</label>
                                    <div className="relative">
                                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                                        <input
                                            type="text"
                                            defaultValue={settings.socialLinks.facebook}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Instagram</label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-600" />
                                        <input
                                            type="text"
                                            defaultValue={settings.socialLinks.instagram}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            placeholder="https://instagram.com/yourpage"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Twitter / X</label>
                                    <div className="relative">
                                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                                        <input
                                            type="text"
                                            defaultValue={settings.socialLinks.twitter}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            placeholder="https://twitter.com/yourpage"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">YouTube</label>
                                    <div className="relative">
                                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-600" />
                                        <input
                                            type="text"
                                            defaultValue={settings.socialLinks.youtube}
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            placeholder="https://youtube.com/yourchannel"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6 font-playfair">Admin Profile</h2>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    A
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-premium-charcoal border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                        Change Avatar
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="text"
                                            defaultValue="admin"
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="email"
                                            defaultValue="admin@blackstonebd.com"
                                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-800 pt-6 mt-6">
                                <h3 className="text-lg font-bold text-white mb-4">Change Password</h3>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
