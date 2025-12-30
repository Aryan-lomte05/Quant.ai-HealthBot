"use client";

import { motion } from "framer-motion";
import { Users, MapPin, Activity, HeartPulse } from "lucide-react";

const stats = [
    {
        label: "Total Consultations",
        value: "1.2M+",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-50",
        trend: "+12% this month",
    },
    {
        label: "Regions Covered",
        value: "28",
        icon: MapPin,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        trend: "States & UTs",
    },
    {
        label: "Active Alerts",
        value: "3",
        icon: Activity,
        color: "text-orange-600",
        bg: "bg-orange-50",
        trend: "High Severity",
    },
    {
        label: "Interventions",
        value: "450k",
        icon: HeartPulse,
        color: "text-red-600",
        bg: "bg-red-50",
        trend: "Life-saving impacts",
    },
];

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <span className="text-xs font-medium text-gray-400 mt-2 block">
                            {stat.trend}
                        </span>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
