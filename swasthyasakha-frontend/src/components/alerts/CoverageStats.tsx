"use client";

import { motion } from "framer-motion";
import { PieChart, ArrowUpRight } from "lucide-react";

export function CoverageStats() {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg h-full flex flex-col justify-between"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-orange-500" />
                        Coverage Stats
                    </h3>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300" />
            </div>

            <div className="flex items-center justify-center relative py-4">
                {/* CSS-only Donut Chart Simulation */}
                <div className="relative w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3.8"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.85 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="3.8"
                            strokeDasharray="85, 100"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-bold text-slate-800">85%</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">National</span>
                    </div>
                </div>

                {/* Floating bubbles animation */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-center"
                >
                    <p className="text-xs text-slate-400">Rural</p>
                    <p className="text-sm font-bold text-emerald-500">72%</p>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-center"
                >
                    <p className="text-xs text-slate-400">Urban</p>
                    <p className="text-sm font-bold text-blue-500">91%</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-orange-400 font-bold uppercase">Target</p>
                    <p className="text-lg font-bold text-orange-600">95%</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase">Daily</p>
                    <p className="text-lg font-bold text-emerald-600">+1.2%</p>
                </div>
            </div>
        </motion.div>
    );
}
