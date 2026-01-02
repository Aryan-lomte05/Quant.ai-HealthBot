"use client";

import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";
import { useTracking } from "@/context/TrackingContext";

// Mock data for 30 days
const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    steps: 4000 + Math.random() * 8000,
    sleep: 6 + Math.random() * 3
}));

export function HealthReports() {
    const { state } = useTracking();
    const { metrics } = state;
    const [exporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);
        // Browser native print - simplest way to "Download as PDF" without heavy libraries
        // The user can choose "Save as PDF" in the print dialog.
        setTimeout(() => {
            window.print();
            setExporting(false);
        }, 500);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 print:shadow-none print:border-none"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-500" />
                    Monthly Reports
                </h3>
                <button
                    onClick={handleExport}
                    className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors print:hidden"
                >
                    {exporting ? "Preparing..." : <><Download className="h-3 w-3" /> Export PDF</>}
                </button>
            </div>

            <div className="space-y-8">
                {/* Steps Chart */}
                <div className="break-inside-avoid">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <h4 className="font-bold text-gray-700 text-sm">Steps History (30 Days)</h4>
                    </div>
                    <div className="h-32 flex items-end gap-1">
                        {monthlyData.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.steps / 12000) * 100}%` }}
                                className={`flex-1 bg-orange-200 rounded-t-sm relative group print:bg-orange-300 ${i === 29 ? 'bg-orange-500' : ''}`}
                            >
                                {/* Tooltips hidden in print */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none print:hidden">
                                    Day {d.day}: {Math.round(d.steps)} steps
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                        <span>Day 1</span>
                        <span>Day 15</span>
                        <span>Today</span>
                    </div>
                </div>

                {/* Sleep Chart */}
                <div className="break-inside-avoid">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-4 w-4 text-indigo-500" />
                        <h4 className="font-bold text-gray-700 text-sm">Sleep Trends (30 Days)</h4>
                    </div>
                    <div className="h-32 flex items-end gap-1">
                        {monthlyData.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.sleep / 10) * 100}%` }}
                                className={`flex-1 bg-indigo-200 rounded-t-sm relative group print:bg-indigo-300 ${i === 29 ? 'bg-indigo-500' : ''}`}
                            >
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none print:hidden">
                                    Day {d.day}: {d.sleep.toFixed(1)} hrs
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                        <span>Day 1</span>
                        <span>Day 15</span>
                        <span>Today</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-teal-50 rounded-xl flex items-start gap-3 print:bg-transparent print:border print:border-teal-100">
                <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                    <h5 className="font-bold text-teal-900 text-sm">Monthly Summary</h5>
                    <p className="text-xs text-teal-700 mt-1">
                        You've been consistent with your sleep schedule 22/30 days. Your steps count is trending up by 15% compared to last month.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
