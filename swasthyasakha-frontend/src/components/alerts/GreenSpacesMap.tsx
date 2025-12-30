"use client";

import { motion } from "framer-motion";
import { Trees, MapPin, Leaf } from "lucide-react";

export function GreenSpacesMap() {
    const spots = [
        { id: 1, x: 20, y: 30, name: "City Park" },
        { id: 2, x: 60, y: 50, name: "Botanic Gardens" },
        { id: 3, x: 40, y: 80, name: "River Walk" },
    ];

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg h-full overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Trees className="w-24 h-24 text-emerald-800" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-500" />
                        Green Zones
                    </h3>
                    <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Recovery & wellness areas nearby</p>
                </div>

                {/* Abstract Mini Map */}
                <div className="flex-1 rounded-2xl bg-emerald-50/50 border border-emerald-100 relative overflow-hidden min-h-[150px]">
                    {/* Map Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
                    </div>

                    {/* User Pin */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md z-20"
                    >
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Green Spots */}
                    {spots.map((spot, i) => (
                        <motion.div
                            key={spot.id}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
                            className="absolute flex flex-col items-center group cursor-pointer"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                            <div className="relative">
                                <MapPin className="w-6 h-6 text-emerald-600 fill-emerald-100 drop-shadow-md group-hover:-translate-y-1 transition-transform" />
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-emerald-500/30 rounded-full blur-[2px]"
                                />
                            </div>
                            <span className="mt-1 text-[9px] font-bold text-emerald-800 bg-white/80 px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                {spot.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs font-bold text-slate-500">
                        Nearest: <span className="text-emerald-600">0.8 km</span>
                    </div>
                    <button className="text-[10px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                        Navigate
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
