"use client";

import { motion } from "framer-motion";
import { Quote, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const stories = [
    {
        id: 1,
        name: "Meera's Journey",
        condition: "Diabetes Type 2",
        preview: "How I reversed my condition in 6 months...",
        color: "bg-emerald-50",
        fullStory: "I was diagnosed with Type 2 Diabetes two years ago. I felt overwhelmed and scared. But with the help of SwasthyaSakha, I tracked my diet, stayed consistent with my medication, and started walking 10k steps daily. Six months later, my HbA1c dropped from 8.5 to 5.6! It's never too late to start your journey."
    },
    {
        id: 2,
        name: "Rajesh vs Stress",
        condition: "Mental Wellness",
        preview: "Meditation changed my life completely...",
        color: "bg-blue-50",
        fullStory: "Work pressure was eating me up. I couldn't sleep, I was irritable, and my BP was high. I found the guided meditation sessions on this app. Starting with just 5 minutes a day, I built a habit. Now, I sleep better and handle stress with a smile. Mental health is just as important as physical health."
    },
];

export function PatientStories() {
    const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

    return (
        <>
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
                            onClick={() => setSelectedStory(story)}
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

            <Modal
                isOpen={!!selectedStory}
                onClose={() => setSelectedStory(null)}
                title="Community Stories"
            >
                {selectedStory && (
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-full bg-gray-200 shrink-0" />
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">{selectedStory.name}</h4>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                    {selectedStory.condition}
                                </span>
                            </div>
                        </div>

                        <div className="relative p-6 bg-gray-50 rounded-2xl">
                            <Quote className="absolute top-4 left-4 h-8 w-8 text-gray-200 -z-0" />
                            <p className="text-gray-700 leading-relaxed relative z-10 italic">
                                "{selectedStory.fullStory}"
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2">
                                Read more stories <PlayCircle className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
