"use client";

import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";

export function Documentaries() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
            <h3 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
                <Film className="h-5 w-5 text-red-500" />
                Documentaries
            </h3>

            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                        <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2 inline-block">Featured</span>
                        <h4 className="text-white font-bold text-lg">The Future of AI Health</h4>
                        <p className="text-gray-300 text-xs">A Sakha Original • 45m</p>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <Play className="h-6 w-6 text-white fill-white ml-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}
