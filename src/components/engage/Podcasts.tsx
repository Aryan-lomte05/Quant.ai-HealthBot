"use client";

import { motion } from "framer-motion";
import { Mic, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const podcasts = [
    { id: 1, title: "Sleeping Better", author: "Dr. Anjali", duration: "15 mins", cover: "bg-purple-900" },
    { id: 2, title: "Stress Relief", author: "Coach Mike", duration: "20 mins", cover: "bg-indigo-900" },
];

export function Podcasts() {
    const [selectedPodcast, setSelectedPodcast] = useState<typeof podcasts[0] | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Mic className="h-5 w-5 text-purple-400" />
                        Health Cast
                    </h3>

                    <div className="space-y-3">
                        {podcasts.map((podcast) => (
                            <div
                                key={podcast.id}
                                onClick={() => setSelectedPodcast(podcast)}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                            >
                                <div className={`h-10 w-10 rounded-lg ${podcast.cover}/50 flex items-center justify-center shrink-0`}>
                                    <Play className="h-4 w-4 fill-white group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm truncate">{podcast.title}</h4>
                                    <p className="text-xs text-gray-400">{podcast.author} • {podcast.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={!!selectedPodcast}
                onClose={() => { setSelectedPodcast(null); setIsPlaying(false); }}
                title="Now Playing"
            >
                {selectedPodcast && (
                    <div className="flex flex-col items-center">
                        <div className={`h-48 w-48 rounded-2xl ${selectedPodcast.cover} shadow-2xl mb-8 flex items-center justify-center`}>
                            <Mic className="h-20 w-20 text-white/50" />
                        </div>

                        <h4 className="text-2xl font-bold text-gray-900 mb-1">{selectedPodcast.title}</h4>
                        <p className="text-gray-500 mb-8">{selectedPodcast.author}</p>

                        <div className="w-full bg-gray-200 h-1 rounded-full mb-8 relative">
                            <div className="absolute left-0 top-0 h-full w-1/3 bg-purple-600 rounded-full" />
                            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-3 w-3 bg-purple-600 rounded-full shadow" />
                        </div>

                        <div className="flex items-center gap-8 mb-6">
                            <button className="text-gray-400 hover:text-gray-600"><SkipBack className="h-6 w-6" /></button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
                            >
                                {isPlaying ? <Pause className="h-6 w-6 text-white fill-white" /> : <Play className="h-6 w-6 text-white fill-white ml-1" />}
                            </button>
                            <button className="text-gray-400 hover:text-gray-600"><SkipForward className="h-6 w-6" /></button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
