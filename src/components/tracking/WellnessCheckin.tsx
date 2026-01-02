"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Smile, Frown, Meh, Heart } from "lucide-react";
import { useTracking } from "@/context/TrackingContext";

const moods = [
    { label: "Great", icon: "🤩", color: "bg-yellow-100 border-yellow-200", message: "That's wonderful! Keep shining! ✨" },
    { label: "Good", icon: "🙂", color: "bg-green-100 border-green-200", message: "Glad to hear you're doing well, friend. 🌱" },
    { label: "Okay", icon: "😐", color: "bg-blue-100 border-blue-200", message: "Just okay is perfectly fine. Hanging in there! 🌥️" },
    { label: "Tired", icon: "😴", color: "bg-purple-100 border-purple-200", message: "Rest up. Your body needs recharging. 🌙" },
    { label: "Sad", icon: "😔", color: "bg-gray-100 border-gray-200", message: "I'm sorry you're feeling down. Be kind to yourself today. 💙" },
];

export function WellnessCheckin() {
    const { state, setMood } = useTracking();
    const { mood: selectedMood } = state;

    const currentMood = moods.find(m => m.label === selectedMood);

    return (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />

            <h3 className="text-xl font-bold mb-1 relative z-10">Daily Wellness</h3>
            <p className="text-emerald-100 text-sm mb-6 relative z-10">How are you feeling right now?</p>

            <div className="flex justify-between gap-2 relative z-10">
                {moods.map((mood) => (
                    <button
                        key={mood.label}
                        onClick={() => setMood(mood.label)}
                        className={`flex-1 flex flex-col items-center gap-2 group transition-transform ${selectedMood === mood.label ? "scale-105" : "hover:scale-105"
                            }`}
                    >
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${selectedMood === mood.label
                                ? "bg-white shadow-lg ring-4 ring-white/20"
                                : "bg-white/20 hover:bg-white/40"
                            }`}>
                            {mood.icon}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedMood === mood.label ? "text-white" : "text-emerald-200"
                            }`}>
                            {mood.label}
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {currentMood && (
                    <motion.div
                        key={currentMood.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 bg-white/10 rounded-xl p-3 text-center border border-white/20 backdrop-blur-sm"
                    >
                        <p className="text-sm font-medium">{currentMood.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
