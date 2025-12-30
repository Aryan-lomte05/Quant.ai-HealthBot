"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Mock data for States/regions
const regions = [
    { id: "MH", name: "Maharashtra", x: 30, y: 60, intensity: "high", cases: "Active", trend: "+12%" },
    { id: "DL", name: "Delhi", x: 40, y: 30, intensity: "medium", cases: "Stable", trend: "-2%" },
    { id: "KL", name: "Kerala", x: 35, y: 85, intensity: "low", cases: "Low", trend: "-5%" },
    { id: "WB", name: "West Bengal", x: 70, y: 55, intensity: "medium", cases: "Rising", trend: "+4%" },
    { id: "UP", name: "Uttar Pradesh", x: 50, y: 40, intensity: "high", cases: "Surge", trend: "+15%" },
];

export function OutbreakHeatMap() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case "high": return "bg-red-500 shadow-red-500/50";
            case "medium": return "bg-yellow-400 shadow-yellow-400/50";
            case "low": return "bg-emerald-400 shadow-emerald-400/50";
            default: return "bg-gray-400";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full h-[500px] bg-slate-900/5 rounded-3xl overflow-hidden border border-white/20 backdrop-blur-sm shadow-xl"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 pointer-events-none" />

            <div className="absolute top-6 left-6 z-10">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">National Outbreak Heatmap</h2>
                <p className="text-sm text-slate-500 font-medium">Real-time intensity tracking across states</p>
            </div>

            {/* Abstract Map Representation */}
            <div className="relative w-full h-full">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>

                {regions.map((region) => (
                    <div
                        key={region.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: `${region.x}%`, top: `${region.y}%` }}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                    >
                        {/* Pulsing Effect */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute inset-0 rounded-full ${getIntensityColor(region.intensity)}`}
                        />

                        {/* Core Dot */}
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${getIntensityColor(region.intensity)}`}
                        />

                        {/* Tooltip */}
                        {hoveredRegion === region.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/50 w-32 text-center pointer-events-none z-20"
                            >
                                <h4 className="font-bold text-slate-800">{region.name}</h4>
                                <div className="text-xs text-slate-500 mt-1 flex justify-center gap-2">
                                    <span>{region.cases}</span>
                                    <span className={region.intensity === 'high' ? 'text-red-500 font-bold' : 'text-emerald-600'}>
                                        {region.trend}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 bg-white/60 backdrop-blur-md p-3 rounded-xl border border-white/40 flex items-center gap-4 text-xs font-medium text-slate-600 shadow-sm">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Low</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Moderate</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-red-500/50"></span> High Priority</div>
            </div>
        </motion.div>
    );
}
