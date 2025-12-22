'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!isLogin && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            if (isLogin) {
                // Login Logic
                const { signIn } = await import('next-auth/react');
                const result = await signIn('credentials', {
                    redirect: false,
                    email: formData.email,
                    password: formData.password,
                });

                if (result?.error) {
                    setErrors({ form: 'Invalid email or password' });
                } else {
                    // Redirect or refresh
                    window.location.href = '/';
                }
            } else {
                // Sign Up Logic
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!res.ok) {
                    setErrors({ form: data.error || 'Registration failed' });
                } else {
                    // Auto login after signup? Or just switch to login
                    alert('Account created! Please sign in.');
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.error(error);
            setErrors({ form: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-premium-black text-white">
            <Navbar />

            <main className="flex-grow flex items-center justify-center px-4 py-12 overflow-hidden">
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Animated Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block"
                    >
                        <div className="relative">
                            {/* Decorative Background */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-premium-gold/20 to-purple-500/20 rounded-full blur-3xl"
                            />

                            {/* Cartoon Character Container */}
                            <div className="relative bg-gradient-to-br from-premium-charcoal to-premium-black border-2 border-premium-gold/30 rounded-3xl p-8 shadow-2xl">
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-center"
                                >
                                    <div className="text-9xl mb-4">👋</div>
                                    <h2 className="text-3xl font-bold font-playfair text-premium-gold mb-2">
                                        {isLogin ? 'Welcome Back!' : 'Join Us!'}
                                    </h2>
                                    <p className="text-gray-400">
                                        {isLogin
                                            ? 'We missed you! Ready to continue shopping?'
                                            : 'Start your premium shopping journey today!'}
                                    </p>
                                </motion.div>

                                {/* Floating Sparkles */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -30, 0],
                                            opacity: [0.5, 1, 0.5],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2 + i,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                        className="absolute"
                                        style={{
                                            left: `${20 + i * 30}%`,
                                            top: `${10 + i * 20}%`,
                                        }}
                                    >
                                        <Sparkles className="text-premium-gold h-6 w-6" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md mx-auto"
                    >
                        <div className="bg-gradient-to-br from-premium-charcoal to-premium-black border-2 border-premium-gold/40 rounded-2xl shadow-2xl shadow-premium-gold/10 p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.h1
                                    key={isLogin ? 'login' : 'signup'}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl font-bold font-playfair text-white mb-2"
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </motion.h1>
                                <p className="text-gray-400">
                                    {isLogin ? 'Enter your credentials' : 'Fill in your details'}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* General Error Message */}
                                {errors.form && (
                                    <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                                        {errors.form}
                                    </div>
                                )}
                                <AnimatePresence mode="wait">
                                    {/* Name Field (Signup Only) */}
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Full Name"
                                                    className={`w-full pl-12 pr-4 py-3.5 bg-black border-2 rounded-lg focus:outline-none transition-all ${errors.name
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : 'border-gray-700 focus:border-premium-gold focus:ring-2 focus:ring-premium-gold/20'
                                                        } text-white placeholder-gray-500`}
                                                />
                                            </div>
                                            {errors.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-sm mt-1.5 ml-1"
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Email Field */}
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email Address"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-black border-2 rounded-lg focus:outline-none transition-all ${errors.email
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-gray-700 focus:border-premium-gold focus:ring-2 focus:ring-premium-gold/20'
                                                } text-white placeholder-gray-500`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1.5 ml-1"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Password"
                                            className={`w-full pl-12 pr-12 py-3.5 bg-black border-2 rounded-lg focus:outline-none transition-all ${errors.password
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-gray-700 focus:border-premium-gold focus:ring-2 focus:ring-premium-gold/20'
                                                } text-white placeholder-gray-500`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-premium-gold transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-1.5 ml-1"
                                        >
                                            {errors.password}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Forgot Password (Login Only) */}
                                {isLogin && (
                                    <div className="text-right">
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm text-premium-gold hover:text-premium-gold-light transition-colors"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className="w-full bg-premium-gold hover:bg-white text-premium-black font-bold py-4 rounded-lg shadow-lg shadow-premium-gold/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="h-5 w-5 border-2 border-premium-black border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>
                                            {isLogin ? 'Sign In' : 'Create Account'}
                                            <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* Toggle Mode */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-400 text-sm">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    {' '}
                                    <button
                                        onClick={toggleMode}
                                        className="text-premium-gold hover:text-premium-gold-light font-medium transition-colors"
                                    >
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-premium-charcoal text-gray-400">or continue as</span>
                                </div>
                            </div>

                            {/* Guest Link */}
                            <Link
                                href="/products"
                                className="block w-full text-center py-3 border-2 border-gray-700 hover:border-premium-gold text-gray-300 hover:text-white rounded-lg transition-all"
                            >
                                Continue as Guest
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
