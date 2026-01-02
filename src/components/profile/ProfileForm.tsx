"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Save } from "lucide-react";
import { useState } from "react";

export function ProfileForm() {
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 pl-12 pr-4 py-3.5 text-emerald-900 placeholder:text-emerald-900/30 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-emerald-900/80 ml-1">
                            Username
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
                                placeholder="Enter username"
                                className="block w-full rounded-2xl border border-emerald-100 bg-white/50 pl-12 pr-4 py-3.5 text-emerald-900 placeholder:text-emerald-900/30 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Save Action - Optional/Disabled for now */}
                    <div className="pt-4">
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]">
                            <Save className="h-5 w-5" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
