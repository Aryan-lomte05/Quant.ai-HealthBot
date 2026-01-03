"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Phone, ArrowRight, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { api } from '@/lib/api';
import { setUserPhone } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.phone || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);

        try {
            // Call backend API
            const result = await api.login({
                emailOrPhone: formData.phone,
                password: formData.password
            });

            // On success
            if (result.success && result.user?.phone) {
                // Store session
                setUserPhone(result.user.phone);

                // Sync with external backend (Fire and forget)
                api.syncUser(result.user);

                // Redirect
                router.push('/chat');
            } else {
                setError(result.message || 'Login failed');
            }

        } catch (err: any) {
            setError(err.message || 'Invalid phone number or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">

            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="backdrop-blur-xl bg-white/80 rounded-3xl border border-emerald-100/60 p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg shadow-emerald-500/30">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-emerald-950 mb-2 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-emerald-600/80 font-medium">
                            Login to access your health assistant
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-medium text-red-700">{error}</p>
                            </motion.div>
                        )}

                        {/* Phone Input */}
                        <div>
                            <label className="block text-sm font-bold text-emerald-900 mb-2">
                                Phone Number
                            </label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="1234567890"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900 placeholder:text-emerald-300"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-emerald-900 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="••••••••••"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900 placeholder:text-emerald-300"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Login
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-emerald-600/80 font-medium">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-emerald-700 font-bold hover:text-emerald-900 hover:underline decoration-2 underline-offset-4 transition-colors">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
