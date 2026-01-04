"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Phone, Mail, Lock, Calendar, Weight, Ruler, MapPin,
    CheckCircle, Loader2, AlertCircle, UserPlus, ArrowRight, Scale, Activity
} from 'lucide-react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { setUserPhone as saveUserPhone } from '@/lib/auth';
import { useTranslation } from '@/hooks/useTranslation';

export default function SignupPage() {
    const router = useRouter();
    const { t } = useTranslation();

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        age: '',
        weight: '',
        height: '',
        gender: '' as 'male' | 'female' | 'other' | '',
        location: '',
        otp: ''
    });

    // OTP State
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    // Step 1: Send OTP
    const handleSendOtp = async () => {
        if (formData.phone.length !== 12) {
            setError(t('auth.errors.invalidPhone'));
            return;
        }

        setVerifyLoading(true);
        setError('');

        try {
            const res = await api.sendOTP(formData.phone);
            if (res.success) {
                setOtpSent(true);
                // Simulate OTP for demo
                setFormData(prev => ({ ...prev, otp: '123456' }));
            } else {
                setError(res.message || 'Failed to send OTP');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setVerifyLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        if (formData.otp.length !== 6) {
            setError(t('auth.errors.invalidOtp'));
            return;
        }

        setVerifyLoading(true);
        setError('');

        try {
            const res = await api.verifyOTP(formData.phone, formData.otp);
            if (res.success) {
                setIsVerified(true);
            } else {
                setError(res.message || 'Invalid OTP');
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setVerifyLoading(false);
        }
    };

    // Step 3: Final Signup
    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.location || !formData.weight || !formData.height) {
            setError(t('auth.errors.fillAll'));
            return;
        }

        if (!isVerified) {
            setError(t('auth.errors.verifyFirst'));
            return;
        }

        setLoading(true);

        try {
            const signupData = {
                phone: formData.phone,
                password: formData.password,
                name: formData.name,
                email: formData.email,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                gender: formData.gender as 'male' | 'female' | 'other',
                location: formData.location
            };

            const result = await api.signup(signupData);

            if (result.success) {
                // Auto login or redirect
                if (result.user?.phone) {
                    saveUserPhone(result.user.phone);
                    api.syncUser(result.user);
                }
                router.push('/chat');
            } else {
                setError(result.message || 'Signup failed');
            }
        } catch (err: any) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            {/* Abstract Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-100/40 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-2xl"
            >
                <div className="backdrop-blur-xl bg-white/80 rounded-3xl border border-emerald-100/60 p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg shadow-emerald-500/30">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-emerald-950 mb-2 tracking-tight">
                            {t('auth.createAccount')}
                        </h1>
                        <p className="text-emerald-600/80 font-medium">
                            {t('auth.signupSubtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-8">
                        {/* Error Alert */}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Personal Details Section */}
                            <div className="space-y-5">
                                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider opacity-70">Personal Details</h3>

                                <div>
                                    <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.name')}</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.email')}</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.age')}</label>
                                        <input
                                            type="number"
                                            value={formData.age}
                                            onChange={(e) => handleInputChange('age', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                            placeholder="25"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.gender')}</label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900 appearance-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Health Metrics Section */}
                            <div className="space-y-5">
                                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider opacity-70">Health Metrics</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.weight')} (kg)</label>
                                        <div className="relative group">
                                            <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                            <input
                                                type="number"
                                                value={formData.weight}
                                                onChange={(e) => handleInputChange('weight', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                                placeholder="70"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.height')} (cm)</label>
                                        <div className="relative group">
                                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                            <input
                                                type="number"
                                                value={formData.height}
                                                onChange={(e) => handleInputChange('height', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                                placeholder="175"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.location')}</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                {/* Phone & Verification */}
                                <div className="space-y-4 pt-2">
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.phone')}</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1 group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 12))}
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                                    placeholder="919876543210"
                                                    disabled={otpSent || isVerified}
                                                />
                                            </div>
                                            {!otpSent && !isVerified && (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={verifyLoading || formData.phone.length !== 12}
                                                    className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                                >
                                                    {verifyLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.sendOtp')}
                                                </button>
                                            )}
                                            {otpSent && !isVerified && (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={verifyLoading || formData.phone.length !== 12}
                                                    className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                                >
                                                    {verifyLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.resendOtp') || 'Resend'}
                                                </button>
                                            )}
                                            {isVerified && (
                                                <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center gap-2 whitespace-nowrap">
                                                    <CheckCircle className="w-5 h-5" /> {t('auth.verified')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {otpSent && !isVerified && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="flex gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    placeholder={t('auth.enterOtp') || 'Enter OTP'}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-white text-center font-mono text-lg tracking-widest focus:border-emerald-500 outline-none"
                                                    value={formData.otp}
                                                    onChange={e => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                    disabled={verifyLoading || formData.otp.length !== 6}
                                                    className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold disabled:opacity-50 hover:bg-emerald-900 transition-colors"
                                                >
                                                    {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('auth.verify')}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Password */}
                        <div>
                            <label className="block text-sm font-bold text-emerald-900 mb-2">{t('auth.password')}</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    required
                                    type="password"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-emerald-900"
                                    placeholder="Min 8 characters"
                                    value={formData.password}
                                    onChange={e => handleInputChange('password', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !isVerified}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 mt-6"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    {t('auth.signup')} <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-emerald-600/80 font-medium">
                            {t('auth.haveAccount')}{' '}
                            <Link href="/login" className="text-emerald-700 font-bold hover:text-emerald-900 hover:underline decoration-2 underline-offset-4 transition-colors">
                                {t('auth.login')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div >
        </div >
    );
}
