"use client";

import { motion } from "framer-motion";
import { FileImage, Download } from "lucide-react";

export function Infographics() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
            <h3 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
                <FileImage className="h-5 w-5 text-blue-500" />
                Health Guides
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {[
                    { title: "Vitamin Chart", color: "bg-orange-100 text-orange-700" },
                    { title: "Yoga Poses", color: "bg-purple-100 text-purple-700" },
                    { title: "Balanced Diet", color: "bg-green-100 text-green-700" },
                    { title: "Sleep Cycle", color: "bg-blue-100 text-blue-700" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`${item.color} aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center relative group cursor-pointer`}
                    >
                        <span className="font-bold text-sm leading-tight">{item.title}</span>
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <Download className="h-6 w-6 text-black/50" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
