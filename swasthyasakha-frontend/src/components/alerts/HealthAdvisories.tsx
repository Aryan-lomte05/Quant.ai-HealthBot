"use client";

import { motion } from "framer-motion";
import { Sparkles, ThermometerSun, Droplets } from "lucide-react";

const advisories = [
    {
        id: 1,
        icon: ThermometerSun,
        title: "Heatwave Alert",
        text: "Temperatures expected to cross 40°C. Stay hydrated and avoid direct sunlight between 12 PM - 3 PM."
    },
    {
        id: 2,
        icon: Droplets,
        title: "Monsoon Hygiene",
        text: "Boil water before drinking. High risk of waterborne diseases reported in your sector."
    }
];

export function HealthAdvisories() {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden h-full"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    AI Health Advisories
                </h3>

                <div className="space-y-6">
                    {advisories.map((advisory, i) => (
                        <div key={advisory.id}>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.2) }}
                                className="flex items-center gap-3 mb-2"
                            >
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                                    <advisory.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-bold text-sm tracking-wide">{advisory.title}</h4>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 + (i * 0.2), duration: 0.8 }}
                                className="text-indigo-100 text-xs leading-relaxed pl-12 border-l border-white/20"
                            >
                                {advisory.text}
                            </motion.p>
                        </div>
                    ))}
                </div>

                <button className="mt-8 w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold transition-colors border border-white/10">
                    View Personalized Plan
                </button>
            </div>
        </motion.div>
    );
}
