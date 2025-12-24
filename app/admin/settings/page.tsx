'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, DollarSign, Facebook, Instagram, Twitter, Youtube, User, Lock, Layout } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSettingsPage() {
    const { settings, updateSettings } = useAdmin();
    const [activeTab, setActiveTab] = useState('general');
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async () => {
        if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
            alert('Please fill in all password fields');
            return;
        }

        if (passwordData.new !== passwordData.confirm) {
            alert('New passwords do not match');
            return;
        }

        if (passwordData.new.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setIsChangingPassword(true);
        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.current,
                    newPassword: passwordData.new
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Failed to change password');
            } else {
                alert('Password changed successfully! Please login with new password next time.');
                setPasswordData({ current: '', new: '', confirm: '' });
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setIsChangingPassword(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General Settings', icon: Globe },
        { id: 'appearance', label: 'Site Appearance', icon: Layout },
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

                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6 font-playfair">Site Appearance</h2>

                            {/* Banner Settings */}
                            <div className="bg-black/40 p-6 rounded-lg border border-gray-800">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Layout className="h-5 w-5 text-premium-gold" />
                                    Top Banner
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Show Announcement Banner</span>
                                        <button
                                            onClick={() => updateSettings({
                                                ...settings,
                                                appearance: { ...settings.appearance, showBanner: !settings.appearance?.showBanner }
                                            })}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${settings.appearance?.showBanner ? 'bg-premium-gold' : 'bg-gray-700'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.appearance?.showBanner ? 'translate-x-6' : 'translate-x-0'
                                                }`} />
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Banner Text</label>
                                        <input
                                            type="text"
                                            value={settings.appearance?.bannerText || ''}
                                            onChange={(e) => updateSettings({
                                                ...settings,
                                                appearance: { ...settings.appearance, bannerText: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            placeholder="Enter announcement text..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Homepage Sections */}
                            <div className="bg-black/40 p-6 rounded-lg border border-gray-800">
                                <h3 className="text-lg font-bold text-white mb-4">Homepage Sections</h3>
                                <div className="space-y-3">
                                    {Object.entries(settings.appearance?.sections || {}).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800/50">
                                            <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <button
                                                onClick={() => updateSettings({
                                                    ...settings,
                                                    appearance: {
                                                        ...settings.appearance,
                                                        sections: { ...settings.appearance.sections, [key]: !value }
                                                    }
                                                })}
                                                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${value ? 'bg-green-500' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'
                                                    }`} />
                                            </button>
                                        </div>
                                    ))}
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
                                                value={passwordData.current}
                                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
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
                                                value={passwordData.new}
                                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
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
                                                value={passwordData.confirm}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={isChangingPassword}
                                        className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mt-4"
                                    >
                                        {isChangingPassword ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
