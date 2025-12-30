"use client";

import { motion } from "framer-motion";

const regions = [
    { id: "MH", name: "Maharashtra", severity: 85, cases: "12,450" },
    { id: "DL", name: "Delhi", severity: 72, cases: "8,320" },
    { id: "KA", name: "Karnataka", severity: 65, cases: "6,150" },
    { id: "TN", name: "Tamil Nadu", severity: 58, cases: "5,800" },
    { id: "UP", name: "Uttar Pradesh", severity: 92, cases: "15,200" },
    { id: "WB", name: "West Bengal", severity: 45, cases: "3,100" },
    { id: "GJ", name: "Gujarat", severity: 30, cases: "1,200" },
    { id: "RJ", name: "Rajasthan", severity: 40, cases: "2,500" },
];

const getSeverityColor = (severity: number) => {
    if (severity > 80) return "bg-red-500";
    if (severity > 60) return "bg-orange-500";
    if (severity > 40) return "bg-yellow-400";
    return "bg-emerald-400";
};

export function HeatmapSection() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm"
        >
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Regional Disease Heatmap</h3>
                <p className="text-sm text-gray-500">
                    Severity distribution based on active case density (Sample Data)
                </p>
            </div>

            {/* Abstract Map Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {regions.map((region, index) => (
                    <motion.div
                        key={region.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (index * 0.05) }}
                        whileHover={{ scale: 1.05 }}
                        className={`relative p-4 rounded-2xl overflow-hidden group hover:shadow-md transition-all cursor-crosshair border border-gray-50`}
                    >
                        {/* Background Color Indicator */}
                        <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${getSeverityColor(region.severity)}`} />

                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold text-gray-400 mb-1 block">
                                    {region.id}
                                </span>
                                <h4 className="font-bold text-gray-800">{region.name}</h4>
                            </div>
                            <div
                                className={`h-3 w-3 rounded-full ${getSeverityColor(region.severity)}`}
                                title={`Severity Score: ${region.severity}/100`}
                            />
                        </div>

                        <div className="mt-4">
                            <p className="text-xs text-gray-400">Active Cases</p>
                            <p className="text-lg font-mono font-bold text-gray-900">{region.cases}</p>
                        </div>

                        {/* Tooltip-like details on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-100">
                            <div
                                className={`h-full ${getSeverityColor(region.severity)}`}
                                style={{ width: `${region.severity}%` }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Low
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span> Moderate
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span> High
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span> Critical
                </div>
            </div>
        </motion.div>
    );
}
