"use client";

import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function Documentaries() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                <h3 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
                    <Film className="h-5 w-5 text-red-500" />
                    Documentaries
                </h3>

                <div
                    onClick={() => setShowVideo(true)}
                    className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group cursor-pointer"
                >
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

            <Modal
                isOpen={showVideo}
                onClose={() => setShowVideo(false)}
                title="The Future of AI Health"
            >
                <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative group">
                    <div className="text-white text-center">
                        <Film className="h-16 w-16 mx-auto mb-4 text-white/20" />
                        <p className="font-bold">Video Player Load Mock</p>
                        <p className="text-sm text-gray-500">Video streaming would happen here.</p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <Play className="h-5 w-5 text-white fill-white" />
                            <div className="h-1 flex-1 bg-gray-600 rounded-full">
                                <div className="h-full w-1/3 bg-red-600 rounded-full" />
                            </div>
                            <span className="text-white text-xs">12:30 / 45:00</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
