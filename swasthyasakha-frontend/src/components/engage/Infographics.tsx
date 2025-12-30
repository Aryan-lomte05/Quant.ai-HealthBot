"use client";

import { motion } from "framer-motion";
import { FileImage, Download, Share2, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const infographics = [
    { title: "Vitamin Chart", color: "bg-orange-100 text-orange-700", size: "1.2 MB" },
    { title: "Yoga Poses", color: "bg-purple-100 text-purple-700", size: "2.4 MB" },
    { title: "Balanced Diet", color: "bg-green-100 text-green-700", size: "1.8 MB" },
    { title: "Sleep Cycle", color: "bg-blue-100 text-blue-700", size: "0.9 MB" },
];

export function Infographics() {
    const [selectedGraphic, setSelectedGraphic] = useState<typeof infographics[0] | null>(null);

    return (
        <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                <h3 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
                    <FileImage className="h-5 w-5 text-blue-500" />
                    Health Guides
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    {infographics.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedGraphic(item)}
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

            <Modal
                isOpen={!!selectedGraphic}
                onClose={() => setSelectedGraphic(null)}
                title={selectedGraphic?.title}
            >
                {selectedGraphic && (
                    <div className="text-center">
                        <div className={`aspect-[4/5] ${selectedGraphic.color} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group`}>
                            <FileImage className="h-20 w-20 opacity-20" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                    <ZoomIn className="h-6 w-6 text-gray-700" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 flex items-center justify-center gap-2">
                                <Share2 className="h-4 w-4" /> Share
                            </button>
                            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
                                <Download className="h-4 w-4" /> Download ({selectedGraphic.size})
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
