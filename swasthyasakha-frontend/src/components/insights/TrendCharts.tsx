"use client";

import { motion } from "framer-motion";

export function TrendCharts() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm h-full"
        >
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">AI-Generated Forecast</h3>
                    <p className="text-sm text-gray-500">
                        Projected disease spread over next 30 days (Illustrative)
                    </p>
                </div>
                <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                    v2.4 Model
                </div>
            </div>

            {/* CSS-Only Chart Container */}
            <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2 pb-6 border-b border-l border-gray-200">
                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-px bg-gray-50" />
                    ))}
                </div>

                {/* Bars */}
                {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90].map((height, i) => (
                    <div key={i} className="relative w-full h-full flex items-end group">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                            className={`w-full rounded-t-sm mx-0.5 relative ${i > 7 ? "bg-indigo-200 dashed-border" : "bg-indigo-500"}`}
                        >
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10">
                                {i > 7 ? 'Projected: ' : 'Actual: '} {height * 10} cases
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4 (Proj)</span>
            </div>

            {/* Legend */}
            <div className="mt-4 flex gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-indigo-500 rounded-sm"></span> Confirmed Data
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-indigo-200 rounded-sm"></span> AI Prediction
                </div>
            </div>
        </motion.div>
    );
}
