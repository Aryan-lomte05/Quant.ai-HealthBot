"use client";

import { motion } from "framer-motion";
import { Navigation, ShieldAlert, BadgeCheck } from "lucide-react";

export function LocationAlerts() {
    // Mock user location status
    const status = "safe"; // 'safe' | 'warning' | 'danger'
    const location = "Kothrud, Pune";

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Navigation className="w-24 h-24 text-slate-900" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Current Location</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{location}</h3>

                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`p-3 rounded-2xl ${status === 'safe' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                    >
                        {status === 'safe' ? <BadgeCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                    </motion.div>

                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Risk Level</p>
                        <p className={`text-lg font-bold ${status === 'safe' ? 'text-emerald-600' : 'text-red-600'}`}>
                            {status === 'safe' ? 'Low Risk Zone' : 'High Alert Area'}
                        </p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-shadow"
                >
                    Enable Real-Time Alerts
                </motion.button>
            </div>
        </motion.div>
    );
}
