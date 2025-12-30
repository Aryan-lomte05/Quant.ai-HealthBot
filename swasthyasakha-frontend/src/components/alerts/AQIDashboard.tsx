"use client";

import { motion } from "framer-motion";
import { Wind, ThumbsUp, AlertTriangle } from "lucide-react";

export function AQIDashboard() {
    const aqi = 145; // Moderate
    const getStatus = (val: number) => {
        if (val < 50) return { label: "Good", color: "text-emerald-500", bg: "bg-emerald-50", desc: "Enjoy outdoor activities." };
        if (val < 100) return { label: "Satisfactory", color: "text-blue-500", bg: "bg-blue-50", desc: "Minimal impact." };
        if (val < 200) return { label: "Moderate", color: "text-orange-500", bg: "bg-orange-50", desc: "Sensitive groups limit exposure." };
        return { label: "Poor", color: "text-red-500", bg: "bg-red-50", desc: "Avoid prolonged exertion." };
    };

    const status = getStatus(aqi);

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg relative overflow-hidden h-full"
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`w-[200%] h-full bg-gradient-to-r from-transparent via-${status.color.split('-')[1]}-300 to-transparent`}
                />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Wind className="w-5 h-5 text-slate-400" />
                            Air Quality Index
                        </h3>
                        <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Real-time Station: Shivajinagar</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
                        {status.label}
                    </div>
                </div>

                <div className="flex items-end gap-2 mt-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-6xl font-black ${status.color}`}
                    >
                        {aqi}
                    </motion.span>
                    <span className="text-sm font-medium text-slate-400 mb-2">US AQI</span>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    {aqi > 100 ? (
                        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    ) : (
                        <ThumbsUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {status.desc} Wearing a mask is recommended in heavy traffic areas.
                    </p>
                </div>

                {/* PM2.5 / PM10 mini stats */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-2 rounded-lg bg-white shadow-sm border border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">PM 2.5</p>
                        <p className="text-sm font-bold text-slate-700">62 µg</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white shadow-sm border border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">PM 10</p>
                        <p className="text-sm font-bold text-slate-700">110 µg</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
