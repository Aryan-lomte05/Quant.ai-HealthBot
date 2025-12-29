"use client";

import { motion } from "framer-motion";
import { Mic, Play } from "lucide-react";

export function Podcasts() {
    return (
        <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Mic className="h-5 w-5 text-purple-400" />
                    Health Cast
                </h3>

                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="h-10 w-10 rounded-lg bg-purple-900/50 flex items-center justify-center shrink-0">
                                <Play className="h-4 w-4 fill-white group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm truncate">Ep {i}: Sleeping Better</h4>
                                <p className="text-xs text-gray-400">Dr. Anjali • 15 mins</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
