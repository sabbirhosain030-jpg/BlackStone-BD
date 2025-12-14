'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Building2, MapPin, Phone, Mail, Clock, Save,
    MessageSquare, CheckCircle, XCircle, Eye, Trash2
} from 'lucide-react';
import { ContactMessage } from '@/types/settings';
import { useAdmin } from '@/context/AdminContext';
import { SiteSettings } from '@/types';

export default function CompanySettingsPage() {
    const { settings, updateSettings } = useAdmin();
    const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [activeTab, setActiveTab] = useState<'company' | 'messages'>('company');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        // Initialize local keys with context settings
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    useEffect(() => {
        // Load messages from localStorage (keeping this for now as per plan)
        const savedMessages = localStorage.getItem('contactMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const handleSaveSettings = () => {
        if (!localSettings) return;

        setSaveStatus('saving');
        updateSettings(localSettings);

        // Also persist to localStorage for persistence across reloads in this demo app
        // In a real app, updateSettings would hit an API
        localStorage.setItem('companySettings', JSON.stringify(localSettings));

        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 500);
    };

    const handleUpdateMessage = (id: string, status: 'new' | 'read' | 'resolved') => {
        const updatedMessages = messages.map(msg =>
            msg.id === id ? { ...msg, status } : msg
        );
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    };

    const handleDeleteMessage = (id: string) => {
        const updatedMessages = messages.filter(msg => msg.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    };

    if (!localSettings) return null;

    const newMessagesCount = messages.filter(m => m.status === 'new').length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-playfair">Company Settings</h1>
                    <p className="text-gray-400 mt-2">Manage your company information and customer messages</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800">
                <div className="border-b border-gray-800">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('company')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'company'
                                ? 'border-premium-gold text-premium-gold'
                                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                                }`}
                        >
                            <Building2 className="inline-block h-5 w-5 mr-2" />
                            Company Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors relative ${activeTab === 'messages'
                                ? 'border-premium-gold text-premium-gold'
                                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                                }`}
                        >
                            <MessageSquare className="inline-block h-5 w-5 mr-2" />
                            Customer Messages
                            {newMessagesCount > 0 && (
                                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {newMessagesCount}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Company Settings Tab */}
            {activeTab === 'company' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Company Information */}
                    <div className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800 p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-playfair">
                            <Building2 className="h-6 w-6 text-premium-gold" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.siteName}
                                    onChange={(e) => setLocalSettings({ ...localSettings, siteName: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address & Location */}
                    <div className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800 p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-playfair">
                            <MapPin className="h-6 w-6 text-premium-gold" />
                            Address & Location
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.address.street}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        address: { ...localSettings.address, street: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.address.city}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        address: { ...localSettings.address, city: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.address.postalCode}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        address: { ...localSettings.address, postalCode: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.address.country}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        address: { ...localSettings.address, country: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                        </div>

                        {/* Map Location */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Map Location (Latitude, Longitude)
                            </label>
                            <p className="text-sm text-gray-500 mb-3">
                                Update coordinates to change map location. Use Google Maps to find exact coordinates.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={localSettings.location.lat}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        location: { ...localSettings.location, lat: parseFloat(e.target.value) || 0 }
                                    })}
                                    placeholder="Latitude"
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={localSettings.location.lng}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        location: { ...localSettings.location, lng: parseFloat(e.target.value) || 0 }
                                    })}
                                    placeholder="Longitude"
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div className="h-64 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                                <iframe
                                    src={`https://www.google.com/maps?q=${localSettings.location.lat},${localSettings.location.lng}&hl=es&z=14&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, opacity: 0.8 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Company Location Map"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800 p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-playfair">
                            <Phone className="h-6 w-6 text-premium-gold" />
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Primary Phone
                                </label>
                                <input
                                    type="tel"
                                    value={localSettings.contact.primaryPhone}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        contact: { ...localSettings.contact, primaryPhone: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Secondary Phone
                                </label>
                                <input
                                    type="tel"
                                    value={localSettings.contact.secondaryPhone}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        contact: { ...localSettings.contact, secondaryPhone: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Support Email
                                </label>
                                <input
                                    type="email"
                                    value={localSettings.contact.supportEmail}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        contact: { ...localSettings.contact, supportEmail: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Info Email
                                </label>
                                <input
                                    type="email"
                                    value={localSettings.contact.infoEmail}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        contact: { ...localSettings.contact, infoEmail: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Contact Form Recipient Email
                                </label>
                                <input
                                    type="email"
                                    value={localSettings.contactFormEmail}
                                    onChange={(e) => setLocalSettings({ ...localSettings, contactFormEmail: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                                    placeholder="Email where contact form submissions will be sent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800 p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-playfair">
                            <Clock className="h-6 w-6 text-premium-gold" />
                            Business Hours
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(localSettings.businessHours).map(([day, hours]) => (
                                <div key={day} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800">
                                    <div className="capitalize w-24 font-medium text-gray-300">{day}</div>
                                    <div className="flex items-center gap-4 flex-1 justify-end">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={hours.closed}
                                                onChange={(e) => {
                                                    const newHours = { ...localSettings.businessHours };
                                                    newHours[day] = { ...hours, closed: e.target.checked };
                                                    setLocalSettings({ ...localSettings, businessHours: newHours });
                                                }}
                                                className="rounded bg-black border-gray-700 text-premium-gold focus:ring-premium-gold"
                                            />
                                            <span className="text-sm text-gray-400">Closed</span>
                                        </div>
                                        {!hours.closed && (
                                            <>
                                                <input
                                                    type="time"
                                                    value={hours.open}
                                                    onChange={(e) => {
                                                        const newHours = { ...localSettings.businessHours };
                                                        newHours[day] = { ...hours, open: e.target.value };
                                                        setLocalSettings({ ...localSettings, businessHours: newHours });
                                                    }}
                                                    className="bg-black border border-gray-700 rounded px-2 py-1 text-sm text-white focus:border-premium-gold focus:outline-none"
                                                />
                                                <span className="text-gray-500">-</span>
                                                <input
                                                    type="time"
                                                    value={hours.close}
                                                    onChange={(e) => {
                                                        const newHours = { ...localSettings.businessHours };
                                                        newHours[day] = { ...hours, close: e.target.value };
                                                        setLocalSettings({ ...localSettings, businessHours: newHours });
                                                    }}
                                                    className="bg-black border border-gray-700 rounded px-2 py-1 text-sm text-white focus:border-premium-gold focus:outline-none"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end sticky bottom-6 z-10">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveSettings}
                            disabled={saveStatus === 'saving'}
                            className="bg-premium-gold hover:bg-white text-premium-black font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-premium-gold/20"
                        >
                            {saveStatus === 'saving' ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                                    Saving...
                                </>
                            ) : saveStatus === 'saved' ? (
                                <>
                                    <CheckCircle className="h-5 w-5" />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Save Settings
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-premium-charcoal rounded-lg shadow-md border border-gray-800"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4 font-playfair">Customer Messages & Complaints</h2>

                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-400">No messages yet</p>
                                <p className="text-sm text-gray-600 mt-2">Customer messages from the contact form will appear here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`border rounded-lg p-4 transition-all ${message.status === 'new' ? 'border-premium-gold/50 bg-premium-gold/10' :
                                            message.status === 'resolved' ? 'border-green-800 bg-green-900/10' :
                                                'border-gray-800 bg-black/40'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-white">{message.name}</h3>
                                                <p className="text-sm text-gray-400">{message.email} • {message.phone}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <select
                                                    value={message.status}
                                                    onChange={(e) => handleUpdateMessage(message.id, e.target.value as any)}
                                                    className="text-sm border border-gray-700 bg-black text-white rounded px-2 py-1 focus:outline-none focus:border-premium-gold"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="read">Read</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                    className="text-red-500 hover:text-red-400 p-1"
                                                    title="Delete message"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-300 mb-2">{message.subject}</p>
                                        <p className="text-gray-400 mb-2">{message.message}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(message.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
