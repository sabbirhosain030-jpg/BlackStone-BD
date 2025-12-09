'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Building2, MapPin, Phone, Mail, Clock, Save,
    MessageSquare, CheckCircle, XCircle, Eye, Trash2
} from 'lucide-react';
import { CompanySettings, ContactMessage } from '@/types/settings';

const defaultSettings: CompanySettings = {
    name: 'BlackStone BD',
    address: {
        street: '123 Commerce Street',
        city: 'Dhaka',
        postalCode: '1000',
        country: 'Bangladesh'
    },
    location: {
        lat: 23.8103,
        lng: 90.4125
    },
    contact: {
        primaryPhone: '+880 1234-567890',
        secondaryPhone: '+880 9876-543210',
        supportEmail: 'support@blackstonebd.com',
        infoEmail: 'info@blackstonebd.com'
    },
    businessHours: {
        saturday: { open: '09:00', close: '21:00', closed: false },
        sunday: { open: '09:00', close: '21:00', closed: false },
        monday: { open: '09:00', close: '21:00', closed: false },
        tuesday: { open: '09:00', close: '21:00', closed: false },
        wednesday: { open: '09:00', close: '21:00', closed: false },
        thursday: { open: '09:00', close: '21:00', closed: false },
        friday: { open: '00:00', close: '00:00', closed: true }
    },
    contactFormEmail: 'support@blackstonebd.com'
};

export default function CompanySettingsPage() {
    const [settings, setSettings] = useState<CompanySettings>(defaultSettings);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [activeTab, setActiveTab] = useState<'company' | 'messages'>('company');
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('companySettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }

        // Load messages from localStorage
        const savedMessages = localStorage.getItem('contactMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const handleSaveSettings = () => {
        setSaveStatus('saving');
        localStorage.setItem('companySettings', JSON.stringify(settings));

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

    const newMessagesCount = messages.filter(m => m.status === 'new').length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your company information and customer messages</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('company')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'company'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Building2 className="inline-block h-5 w-5 mr-2" />
                            Company Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors relative ${activeTab === 'messages'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <MessageSquare className="inline-block h-5 w-5 mr-2" />
                            Customer Messages
                            {newMessagesCount > 0 && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-blue-600" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.name}
                                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address & Location */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="h-6 w-6 text-blue-600" />
                            Address & Location
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    value={settings.address.street}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        address: { ...settings.address, street: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={settings.address.city}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        address: { ...settings.address, city: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={settings.address.postalCode}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        address: { ...settings.address, postalCode: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Map Location */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Map Location (Latitude, Longitude)
                            </label>
                            <p className="text-sm text-gray-500 mb-3">
                                Update coordinates to change map location. Use Google Maps to find exact coordinates.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={settings.location.lat}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        location: { ...settings.location, lat: parseFloat(e.target.value) || 0 }
                                    })}
                                    placeholder="Latitude"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={settings.location.lng}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        location: { ...settings.location, lng: parseFloat(e.target.value) || 0 }
                                    })}
                                    placeholder="Longitude"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <iframe
                                    src={`https://www.google.com/maps?q=${settings.location.lat},${settings.location.lng}&hl=es&z=14&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Company Location Map"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Phone className="h-6 w-6 text-blue-600" />
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Primary Phone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.contact.primaryPhone}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        contact: { ...settings.contact, primaryPhone: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Phone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.contact.secondaryPhone}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        contact: { ...settings.contact, secondaryPhone: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Support Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contact.supportEmail}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        contact: { ...settings.contact, supportEmail: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Info Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contact.infoEmail}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        contact: { ...settings.contact, infoEmail: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Form Recipient Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contactFormEmail}
                                    onChange={(e) => setSettings({ ...settings, contactFormEmail: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Email where contact form submissions will be sent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveSettings}
                            disabled={saveStatus === 'saving'}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {saveStatus === 'saving' ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
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
                    className="bg-white rounded-lg shadow-sm"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Messages & Complaints</h2>

                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No messages yet</p>
                                <p className="text-sm text-gray-400 mt-2">Customer messages from the contact form will appear here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`border rounded-lg p-4 transition-all ${message.status === 'new' ? 'border-blue-300 bg-blue-50' :
                                                message.status === 'resolved' ? 'border-green-300 bg-green-50' :
                                                    'border-gray-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{message.name}</h3>
                                                <p className="text-sm text-gray-600">{message.email} • {message.phone}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <select
                                                    value={message.status}
                                                    onChange={(e) => handleUpdateMessage(message.id, e.target.value as any)}
                                                    className="text-sm border border-gray-300 rounded px-2 py-1"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="read">Read</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                    className="text-red-600 hover:text-red-700 p-1"
                                                    title="Delete message"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-900 mb-2">{message.subject}</p>
                                        <p className="text-gray-700 mb-2">{message.message}</p>
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
