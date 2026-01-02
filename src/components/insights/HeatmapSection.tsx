"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
    if (severity > 80) return {
        bg: "from-red-50 to-rose-50",
        border: "border-red-200/50",
        dot: "bg-red-500",
        text: "text-red-600",
        bar: "from-red-500 to-rose-500",
        label: "Critical Severity",
        labelBg: "bg-red-50",
        labelText: "text-red-600"
    };
    if (severity > 60) return {
        bg: "from-orange-50 to-amber-50",
        border: "border-orange-200/50",
        dot: "bg-orange-500",
        text: "text-orange-600",
        bar: "from-orange-500 to-amber-500",
        label: "High Severity",
        labelBg: "bg-orange-50",
        labelText: "text-orange-600"
    };
    if (severity > 40) return {
        bg: "from-yellow-50 to-yellow-50",
        border: "border-yellow-200/50",
        dot: "bg-yellow-400",
        text: "text-yellow-600",
        bar: "from-yellow-400 to-yellow-500",
        label: "Moderate Severity",
        labelBg: "bg-yellow-50",
        labelText: "text-yellow-600"
    };
    return {
        bg: "from-emerald-50 to-teal-50",
        border: "border-emerald-200/50",
        dot: "bg-emerald-500",
        text: "text-emerald-600",
        bar: "from-emerald-500 to-teal-500",
        label: "Low Severity",
        labelBg: "bg-emerald-50",
        labelText: "text-emerald-600"
    };
};

export function HeatmapSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 rounded-3xl border border-emerald-200/40 p-8 shadow-xl overflow-hidden"
        >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl -z-10" />

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-700 text-xs font-bold mb-3">
                        <MapPin className="h-3.5 w-3.5" />
                        Regional Analysis
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-emerald-900 tracking-tight">
                        Disease Heatmap
                    </h3>
                    <p className="text-sm text-emerald-600/80 mt-2 font-medium">
                        Severity distribution based on active case density
                    </p>
                </div>
            </div>

            {/* Premium Grid with Shimmer */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {regions.map((region, index) => {
                    const colors = getSeverityColor(region.severity);
                    return (
                        <motion.div
                            key={region.id}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.1 + (index * 0.05),
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                            className={`relative group bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                        >
                            {/* Shimmer Animation */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                animate={{
                                    x: ["-200%", "200%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 2
                                }}
                                style={{ skewX: -15 }}
                            />

                            <div className="relative z-10 p-6">
                                {/* Header with State Code & Severity Dot */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-bold text-emerald-500/60 tracking-widest uppercase">
                                            {region.id}
                                        </span>
                                        <h4 className="font-black text-emerald-900 mt-1 text-lg leading-tight tracking-tight">
                                            {region.name}
                                        </h4>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.3, rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                        className={`h-3.5 w-3.5 rounded-full ${colors.dot} shadow-lg ring-2 ring-white`}
                                    />
                                </div>

                                {/* Active Cases */}
                                <div className="mb-4">
                                    <p className="text-xs text-emerald-600/70 font-semibold mb-1.5 tracking-wide uppercase">Active Cases</p>
                                    <p className="text-3xl font-black text-emerald-900 tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>
                                        {region.cases}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-2 bg-white/80 rounded-full overflow-hidden mb-3 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${region.severity}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (index * 0.05), duration: 1, ease: "easeOut" }}
                                        className={`h-full bg-gradient-to-r ${colors.bar} shadow-md relative overflow-hidden`}
                                    >
                                        {/* Progress bar shimmer */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Severity Label */}
                                <div className={`inline-flex px-3 py-1.5 rounded-full ${colors.labelBg} border ${colors.border}`}>
                                    <p className={`text-xs font-bold ${colors.labelText} tracking-wide`}>
                                        {colors.label}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/60 rounded-2xl transition-all duration-300 pointer-events-none" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Enhanced Legend */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-emerald-200/40">
                {[
                    { color: "bg-emerald-500", label: "Low", gradient: "from-emerald-500 to-teal-500" },
                    { color: "bg-yellow-400", label: "Moderate", gradient: "from-yellow-400 to-yellow-500" },
                    { color: "bg-orange-500", label: "High", gradient: "from-orange-500 to-amber-500" },
                    { color: "bg-red-500", label: "Critical", gradient: "from-red-500 to-rose-500" }
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + (i * 0.1) }}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className={`h-3.5 w-3.5 rounded-full bg-gradient-to-br ${item.gradient} shadow-md ring-2 ring-white/50 group-hover:scale-125 group-hover:ring-4 transition-all`} />
                        <span className="text-sm font-bold text-emerald-800">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
