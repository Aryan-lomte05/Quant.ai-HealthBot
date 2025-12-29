"use client";

import { motion } from "framer-motion";
import { Quote, PlayCircle } from "lucide-react";

const stories = [
    { id: 1, name: "Meera's Journey", condition: "Diabetes Type 2", preview: "How I reversed my condition in 6 months...", color: "bg-emerald-50" },
    { id: 2, name: "Rajesh vs Stress", condition: "Mental Wellness", preview: "Meditation changed my life completely...", color: "bg-blue-50" },
];

export function PatientStories() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
            <h3 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
                <Quote className="h-5 w-5 text-emerald-500" />
                Patient Stories
            </h3>

            <div className="space-y-4">
                {stories.map((story) => (
                    <motion.div
                        key={story.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-2xl ${story.color} flex items-start gap-4 cursor-pointer relative group`}
                    >
                        <div className="h-12 w-12 rounded-full bg-gray-200 shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-900">{story.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mb-1">{story.condition}</p>
                            <p className="text-sm text-gray-700 italic">"{story.preview}"</p>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-2xl">
                            <PlayCircle className="h-10 w-10 text-white fill-black/50" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
