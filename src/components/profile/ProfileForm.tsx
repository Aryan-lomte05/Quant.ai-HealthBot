"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Save, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export function ProfileForm() {
    const { user, refreshUser } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
        age: "",
        weight: "",
        height: "",
        gender: "",
        location: "",
        bloodGroup: "",
        emergencyContact: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.name || "",
                mobile: user.phone || "",
                email: user.email || "",
                age: user.age?.toString() || "",
                weight: user.weight?.toString() || "",
                height: user.height?.toString() || "",
                gender: user.gender || "",
                location: user.location || "",
                bloodGroup: user.bloodGroup || "",
                emergencyContact: user.emergencyContact || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSuccess(false);
        setError("");
    };

    const handleSave = async () => {
        if (!user?.id) {
            setError("User profile not loaded. Please try again.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user?.id,
                    name: formData.username,
                    email: formData.email,
                    phone: formData.mobile,
                    age: formData.age,
                    weight: formData.weight,
                    height: formData.height,
                    gender: formData.gender,
                    location: formData.location,
                    bloodGroup: formData.bloodGroup,
                    emergencyContact: formData.emergencyContact
                })
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                await refreshUser();
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="rounded-3xl border border-white/20 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <h2 className="mb-8 text-2xl font-bold text-emerald-950">My Profile</h2>

                <div className="space-y-6">
                    {/* Mobile Number */}
                    <div className="space-y-2">
                        <label htmlFor="mobile" className="text-sm font-medium text-emerald-900/80 ml-1">
                            Mobile Number
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
                            </div>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                className="block w-full rounded-2xl border border-emerald-100 bg-emerald-50/50 pl-12 pr-4 py-3.5 text-emerald-900 placeholder:text-emerald-900/30 outline-none cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Username and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-emerald-900/80 ml-1">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="block w-full rounded-2xl border border-emerald-100 bg-white/50 pl-12 pr-4 py-3.5 text-emerald-900 placeholder:text-emerald-900/30 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-emerald-900/80 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-emerald-500/50 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="block w-full rounded-2xl border border-emerald-100 bg-white/50 pl-12 pr-4 py-3.5 text-emerald-900 placeholder:text-emerald-900/30 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Age and Gender Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="age" className="text-sm font-medium text-emerald-900/80 ml-1">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="gender" className="text-sm font-medium text-emerald-900/80 ml-1">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Weight and Height Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="weight" className="text-sm font-medium text-emerald-900/80 ml-1">Weight (kg)</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="height" className="text-sm font-medium text-emerald-900/80 ml-1">Height (cm)</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Blood Group and Emergency Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="bloodGroup" className="text-sm font-medium text-emerald-900/80 ml-1">Blood Group</label>
                            <input
                                type="text"
                                id="bloodGroup"
                                name="bloodGroup"
                                placeholder="e.g. O+"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="emergencyContact" className="text-sm font-medium text-emerald-900/80 ml-1">Emergency Phone</label>
                            <input
                                type="tel"
                                id="emergencyContact"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label htmlFor="location" className="text-sm font-medium text-emerald-900/80 ml-1">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="City, State"
                            value={formData.location}
                            onChange={handleChange}
                            className="block w-full rounded-2xl border border-emerald-100 bg-white/50 px-4 py-3.5 text-emerald-900 outline-none focus:border-emerald-300 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Feedback Messages */}
                    {error && (
                        <p className="text-sm font-medium text-red-600 ml-1">{error}</p>
                    )}
                    {success && (
                        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 ml-1">
                            <CheckCircle2 className="h-4 w-4" />
                            Profile updated successfully!
                        </div>
                    )}

                    {/* Save Action */}
                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
