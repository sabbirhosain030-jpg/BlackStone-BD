'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, Youtube } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function Footer() {
    const { settings, addSubscriber } = useAdmin();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            addSubscriber(email);
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const socialIcons = [
        { Icon: Facebook, href: settings.socialLinks.facebook, label: 'Facebook' },
        { Icon: XIcon, href: settings.socialLinks.twitter, label: 'X (Twitter)' },
        { Icon: Instagram, href: settings.socialLinks.instagram, label: 'Instagram' },
        { Icon: Youtube, href: settings.socialLinks.youtube, label: 'YouTube' },
    ].filter(icon => icon.href); // Only show icons with links

    return (
        <footer className="bg-premium-charcoal text-white pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Brand Info */}
                    <motion.div
                        className="col-span-1 md:col-span-1"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href="/" className="text-3xl font-bold font-playfair tracking-wide text-white mb-4 block">
                            BlackStone<span className="text-premium-gold">BD</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                            Your premium destination for quality products. Experience excellence with our secure cash on delivery service.
                        </p>
                        <div className="flex space-x-4">
                            {socialIcons.map(({ Icon, href, label }, index) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, rotate: 360, color: '#D4AF37' }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-gray-400 hover:text-premium-gold transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-playfair font-semibold mb-6 text-premium-gold">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {[
                                { text: 'All Products', href: '/products' },
                                { text: 'Categories', href: '/categories' },
                                { text: 'About Us', href: '/about' },
                                { text: 'Contact Us', href: '/contact' },
                            ].map((link) => (
                                <motion.li key={link.text} whileHover={{ x: 5, color: '#D4AF37' }}>
                                    <Link href={link.href} className="hover:text-premium-gold transition-colors inline-block">
                                        {link.text}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-playfair font-semibold mb-6 text-premium-gold">Join Our Family</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest updates and exclusive offers.</p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-black border border-gray-800 rounded-none focus:ring-1 focus:ring-premium-gold focus:border-premium-gold text-white placeholder-gray-500 transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-premium-gold hover:bg-white hover:text-black text-black font-bold py-2 px-4 rounded-none transition-colors uppercase tracking-wider text-sm"
                            >
                                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-playfair font-semibold mb-6 text-premium-gold">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <motion.li
                                className="flex items-start"
                                whileHover={{ scale: 1.05, color: '#D4AF37' }}
                            >
                                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-premium-gold" />
                                <span>{settings?.address?.street}, {settings?.address?.city}</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ scale: 1.05, color: '#D4AF37' }}
                            >
                                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-premium-gold" />
                                <span>{settings?.contact?.primaryPhone}</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ scale: 1.05, color: '#D4AF37' }}
                            >
                                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-premium-gold" />
                                <span>{settings?.contact?.supportEmail}</span>
                            </motion.li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Section with Developer Credit */}
                <motion.div
                    className="border-t border-gray-800 pt-8 space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                    </div>

                    {/* Developer Credit */}
                    <motion.div
                        className="text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            Developed By
                            <motion.span
                                animate={{
                                    scale: [1, 1.3, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <Heart className="h-4 w-4 text-premium-gold fill-current" />
                            </motion.span>
                            <span className="text-premium-gold font-semibold">Sabbir Hosain</span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}
