"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, Calendar } from "lucide-react";

const trendData = {
    "7d": [20, 35, 25, 45, 30, 55, 40],
    "30d": [30, 45, 35, 50, 40, 60, 45, 55, 40, 65, 50, 70, 55, 45, 35, 50, 45, 60, 50, 70, 60, 80, 65, 55, 45, 60, 50, 70, 60, 85],
};

export function TrendGraphs() {
    const [period, setPeriod] = useState<"7d" | "30d">("7d");
    const data = trendData[period];

    // Normalize data for chart height (assuming max value 100)
    const maxVal = Math.max(...data);

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-teal-500" />
                        Disease Trends
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Outbreak spread analysis</p>
                </div>

                <div className="flex bg-slate-100 rounded-xl p-1">
                    <button
                        onClick={() => setPeriod("7d")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${period === '7d' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        7 Days
                    </button>
                    <button
                        onClick={() => setPeriod("30d")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${period === '30d' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        30 Days
                    </button>
                </div>
            </div>

            <div className="relative h-48 w-full">
                <div className="absolute inset-0 flex items-end justify-between gap-1">
                    {data.map((val, i) => (
                        <div key={`${period}-${i}`} className="w-full relative h-full flex items-end group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(val / maxVal) * 100}%` }}
                                transition={{ delay: i * 0.03, type: "spring", stiffness: 100 }}
                                className="w-full bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                            >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20">
                                    {val} Cases
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                <Calendar className="w-4 h-4" />
                Predicted Peak: <span className="text-slate-800 font-bold">Nov 15 - Nov 20</span>
            </div>
        </motion.div>
    );
}
