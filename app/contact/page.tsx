'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

export default function ContactPage() {
    const { settings } = useAdmin();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create message object
        const message = {
            id: `msg-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            timestamp: new Date().toISOString(),
            status: 'new' as const
        };

        // Save to localStorage
        const existingMessages = localStorage.getItem('contactMessages');
        const messages = existingMessages ? JSON.parse(existingMessages) : [];
        messages.unshift(message); // Add to beginning of array
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            details: [settings?.address?.street || '', `${settings?.address?.city || ''}, ${settings?.address?.country || ''}`],
            color: 'text-blue-400',
            bgColor: 'bg-blue-900/10',
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: [settings?.contact?.primaryPhone || '', settings?.contact?.secondaryPhone || ''],
            color: 'text-green-400',
            bgColor: 'bg-green-900/10',
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: [settings?.contact?.supportEmail || '', settings?.contact?.infoEmail || ''],
            color: 'text-purple-400',
            bgColor: 'bg-purple-900/10',
        },
        {
            icon: Clock,
            title: 'Business Hours',
            // Display simplified hours or link to details
            details: ['See full hours below', settings?.businessHours?.['friday']?.closed ? 'Friday: Closed' : 'Open Everyday'],
            color: 'text-orange-400',
            bgColor: 'bg-orange-900/10',
        },
    ];

    return (
        <div className="min-h-screen bg-premium-black text-white">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-black via-premium-charcoal to-black text-white py-20 border-b border-gray-800"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <MessageCircle className="h-16 w-16 mx-auto mb-6 text-premium-gold" />
                        <h1 className="text-5xl font-bold mb-4 font-playfair">Get in Touch</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Have a question or need assistance? We&apos;re here to help! Reach out to us and we&apos;ll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute top-8 left-8">
                    <Link href="/about">
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-black/50 hover:bg-premium-gold text-white hover:text-black p-3 rounded-full border border-gray-700 hover:border-premium-gold transition-all backdrop-blur-sm group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Contact Info Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-premium-charcoal rounded-xl shadow-lg p-6 border border-gray-800 hover:border-premium-gold transition-colors"
                        >
                            <div className={`bg-black/50 border border-gray-700 ${info.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                <info.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 font-playfair">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-400 text-sm">
                                    {detail}
                                </p>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Form and Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-premium-charcoal rounded-xl shadow-lg p-8 border border-gray-800"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6 font-playfair">Send us a Message</h2>

                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6"
                            >
                                <p className="font-medium">✓ Message sent successfully!</p>
                                <p className="text-sm">We&apos;ll get back to you soon.</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all text-white placeholder-gray-600"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all text-white placeholder-gray-600"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all text-white placeholder-gray-600"
                                        placeholder="+880 1234-567890"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all text-white placeholder-gray-600"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all resize-none text-white placeholder-gray-600"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Map and Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Map */}
                        <div className="bg-premium-charcoal rounded-xl shadow-lg overflow-hidden border border-gray-800 h-[400px]">
                            <iframe
                                src={`https://www.google.com/maps?q=${settings?.location?.lat || 23.7808875},${settings?.location?.lng || 90.4125181}&hl=es&z=14&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="BlackStone BD Location"
                            />
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-premium-charcoal rounded-xl shadow-lg p-8 border border-gray-800">
                            <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Quick Answers</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-premium-gold mb-1">What are your delivery areas?</h4>
                                    <p className="text-gray-400 text-sm">We deliver across Bangladesh with cash on delivery service.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-premium-gold mb-1">How long does delivery take?</h4>
                                    <p className="text-gray-400 text-sm">Typically 2-5 business days depending on your location.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-premium-gold mb-1">Do you accept returns?</h4>
                                    <p className="text-gray-400 text-sm">Yes! We have a 7-day return policy for most products.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
