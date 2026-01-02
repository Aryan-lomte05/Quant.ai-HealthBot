"use client";

import { motion } from "framer-motion";
import { Syringe, Users, Baby, Activity } from "lucide-react";

const stats = [
    { label: "Total Doses", value: "24.5M", icon: Syringe, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Children Vaccinated", value: "8.2M", icon: Baby, color: "text-pink-500", bg: "bg-pink-50" },
    { label: "Adult Coverage", value: "62%", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Daily Rate", value: "+45K", icon: Activity, color: "text-orange-500", bg: "bg-orange-50" },
];

export function VaccinationDashboard() {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg"
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">Vaccination Drive</h3>
                <p className="text-xs text-slate-500 font-medium">Real-time immunization tracking</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-start gap-3"
                    >
                        <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <motion.h4
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-2xl font-bold text-slate-900"
                            >
                                {stat.value}
                            </motion.h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Progress to Goal</span>
                    <span>78%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}
