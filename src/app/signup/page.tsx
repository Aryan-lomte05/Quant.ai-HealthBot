"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Phone, Mail, Lock, Calendar, Weight, Ruler, MapPin,
    Send, CheckCircle, Loader2, AlertCircle, UserPlus, ArrowRight
} from 'lucide-react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();

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
    });

    // OTP State
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    // Step 1: Send OTP
    const handleSendOTP = async () => {
        if (formData.phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setOtpLoading(true);
        setError('');

        try {
            const res = await api.sendOTP(formData.phone);
            if (res.success) {
                setOtpSent(true);
            } else {
                setError(res.message || 'Failed to send OTP');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setOtpLoading(true);
        setError('');

        try {
            const res = await api.verifyOTP(formData.phone, otp);
            if (res.success) {
                setOtpVerified(true);
            } else {
                setError(res.message || 'Invalid OTP');
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setOtpLoading(false);
        }
    };

    // Step 3: Final Signup
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.location) {
            setError('Please fill all required fields');
            return;
        }

        if (!otpVerified) {
            setError('Please verify your phone number first');
            return;
        }

        setLoading(true);

        try {
            const res = await api.signup({
                ...formData,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight) || 0,
                height: parseFloat(formData.height) || 0,
                gender: formData.gender as 'male' | 'female' | 'other',
            });

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(res.message || 'Signup failed');
            }
        } catch (err: any) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 py-8">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-emerald-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-teal-200/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-2xl"
            >
                {/* Success Overlay */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-white/90 backdrop-blur-md"
                        >
                            <div className="text-center p-8">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-emerald-950 mb-2">Account Created!</h2>
                                <p className="text-emerald-600">Redirecting to login...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="backdrop-blur-xl bg-white/80 rounded-3xl border border-emerald-100/60 p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-emerald-950 mb-2">Create Account</h1>
                        <p className="text-emerald-600/80 font-medium">
                            Join SwasthyaSakha for personalized health support
                        </p>
                    </div>

                    {/* Error Banner */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-medium text-red-700">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Section 1: Basic Info */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-emerald-900 mb-2 block">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    <input
                                        required
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={e => handleInputChange('name', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-emerald-900 mb-2 block">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    <input
                                        required
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                                        placeholder="hello@example.com"
                                        value={formData.email}
                                        onChange={e => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Phone Verification (Critical Flow) */}
                        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                            <label className="text-sm font-bold text-emerald-900 mb-2 block">Phone Number *</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    <input
                                        type="tel"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-100 bg-white focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                                        placeholder="1234567890"
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={e => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        disabled={otpVerified || otpSent}
                                    />
                                </div>

                                {!otpVerified && (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        disabled={otpLoading || formData.phone.length !== 10 || otpSent}
                                        className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-50 hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                                    >
                                        {otpLoading && !otpSent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {otpSent ? 'OTP Sent' : 'Send OTP'}
                                    </button>
                                )}

                                {otpVerified && (
                                    <div className="px-4 py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Verified
                                    </div>
                                )}
                            </div>

                            {/* OTP Input Field */}
                            <AnimatePresence>
                                {otpSent && !otpVerified && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="mt-4 flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            maxLength={6}
                                            placeholder="Enter 6-digit OTP"
                                            className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-white text-center font-mono text-lg tracking-widest focus:border-emerald-500 outline-none"
                                            value={otp}
                                            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyOTP}
                                            disabled={otpLoading || otp.length !== 6}
                                            className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold disabled:opacity-50 hover:bg-emerald-900 transition-colors"
                                        >
                                            {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Section 3: Password */}
                        <div>
                            <label className="text-sm font-bold text-emerald-900 mb-2 block">Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                <input
                                    required
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                                    placeholder="Min 8 characters"
                                    value={formData.password}
                                    onChange={e => handleInputChange('password', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Section 4: Physical Attributes */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs font-bold text-emerald-900 mb-2 block uppercase">Age *</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400" />
                                    <input
                                        type="number"
                                        className="w-full pl-8 pr-2 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 outline-none text-emerald-900"
                                        placeholder="Yr"
                                        value={formData.age}
                                        onChange={e => handleInputChange('age', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-emerald-900 mb-2 block uppercase">Weight</label>
                                <div className="relative">
                                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400" />
                                    <input
                                        type="number"
                                        className="w-full pl-8 pr-2 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 outline-none text-emerald-900"
                                        placeholder="Kg"
                                        value={formData.weight}
                                        onChange={e => handleInputChange('weight', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-emerald-900 mb-2 block uppercase">Height</label>
                                <div className="relative">
                                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400" />
                                    <input
                                        type="number"
                                        className="w-full pl-8 pr-2 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 outline-none text-emerald-900"
                                        placeholder="Cm"
                                        value={formData.height}
                                        onChange={e => handleInputChange('height', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Demographics */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-emerald-900 mb-2 block">Gender *</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 outline-none text-emerald-900 appearance-none"
                                    value={formData.gender}
                                    onChange={e => handleInputChange('gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-emerald-900 mb-2 block">Location *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-500 outline-none text-emerald-900"
                                        placeholder="City (e.g. Mumbai)"
                                        value={formData.location}
                                        onChange={e => handleInputChange('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !otpVerified}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 mt-6"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Create Account <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-emerald-600/80 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-emerald-700 font-bold hover:text-emerald-900 hover:underline decoration-2 underline-offset-4 transition-colors">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
