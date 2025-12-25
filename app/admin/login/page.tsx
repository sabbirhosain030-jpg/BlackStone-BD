'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    if (isAuthenticated) {
        router.push('/admin');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        console.log("🔐 Admin login submit clicked");
        console.log("📧 Email:", email);
        console.log("🔑 Has password:", !!password);

        if (email && password) {
            console.log("✅ Credentials present, calling login...");
            const success = await login(email, password);
            console.log("📊 Login result:", success);

            if (success) {
                console.log("✅ Login flow completed. Verifying session...");
                // Force a check to ensure cookie is set before redirecting
                const { getSession } = await import("next-auth/react");
                const session = await getSession();
                console.log("🔍 Session after login:", session);

                if (session) {
                    console.log("✅ Session confirmed! Redirecting to /admin");
                    router.push('/admin');
                    router.refresh(); // Ensure the router sees the new state
                } else {
                    console.error("❌ Login reported success but no session found!");
                    setError('Login successful but session failed to initialize. Please try again.');
                }
            } else {
                console.log("❌ Login failed!");
                setError('Invalid credentials. Try: admin / BlackStone2024!');
                setPassword('');
            }
        } else {
            console.log("⚠️ Missing email or password");
            setError('Please enter both email and password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-premium-black">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-premium-gold rounded-full mix-blend-screen filter blur-[100px] opacity-10"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-72 h-72 bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-10"
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-premium-charcoal border border-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md mx-4"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gold text-premium-black mb-4 shadow-lg shadow-premium-gold/20"
                    >
                        <Lock className="h-8 w-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold font-playfair text-white mb-2">
                        BlackStone<span className="text-premium-gold">BD</span>
                    </h1>
                    <p className="text-gray-400 uppercase tracking-wider text-sm">Admin Panel Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                placeholder="admin@blackstonebd.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-12 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white placeholder-gray-600 transition-all"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/20 border border-red-900/50 text-red-500 px-4 py-3 rounded-lg text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-premium-gold text-premium-black font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-white transition-all duration-300"
                    >
                        Login to Admin Panel
                    </motion.button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Default: admin / admin
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
