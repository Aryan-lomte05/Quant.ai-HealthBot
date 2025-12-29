"use client";

import { motion } from "framer-motion";
import { Gamepad2, Play } from "lucide-react";

const games = [
    { id: 1, title: "Germ Blaster", color: "bg-red-500", icon: "🦠" },
    { id: 2, title: "Vitamin Run", color: "bg-orange-500", icon: "🥕" },
    { id: 3, title: "Yoga Pets", color: "bg-purple-500", icon: "🧘" },
];

export function MiniGames() {
    return (
        <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl -ml-10 -mb-10" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2 inline-block">Kids Zone</span>
                        <h3 className="text-3xl font-bold flex items-center gap-3">
                            Mini Games <Gamepad2 className="h-8 w-8 text-yellow-400" />
                        </h3>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    {games.map((game, i) => (
                        <motion.div
                            key={game.id}
                            whileHover={{ y: -10, rotate: 2 }}
                            className={`min-w-[160px] h-48 rounded-2xl ${game.color} p-4 flex flex-col justify-between shadow-lg relative overflow-hidden cursor-pointer group snap-center`}
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            <div className="relative z-10 text-4xl">{game.icon}</div>
                            <div className="relative z-10">
                                <h4 className="font-bold text-lg leading-tight mb-2">{game.title}</h4>
                                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                                    <Play className="h-4 w-4 fill-current" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="min-w-[100px] flex items-center justify-center">
                        <button className="h-12 w-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-indigo-900 transition-colors">
                            <ArrowRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { ArrowRight } from "lucide-react";
