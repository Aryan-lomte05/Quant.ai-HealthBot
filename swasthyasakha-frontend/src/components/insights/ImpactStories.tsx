"use client";

import { MessageSquareQuote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
    {
        id: 1,
        region: "Rural Bihar",
        problem: "Limited access to pediatric specialists during monsoon flooding.",
        intervention: "AI triage bot guided local ASHA workers to identify 15 critical pneumonia cases.",
        outcome: "100% survival rate for identified high-risk children through timely helicopter evacuation.",
        quote: "The bot gave us the confidence to act when roads were cut off.",
        author: "Meera Devi, ASHA Worker"
    },
    {
        id: 2,
        region: "Urban Pune",
        problem: "Overcrowded ERs leading to long wait times for non-critical patients.",
        intervention: "Pre-arrival symptom screener categorized 40% of patients to home-care remedies.",
        outcome: "ER wait times reduced by 3.5 hours; critical cardiac cases received faster attention.",
        quote: "It helped me realize my indigestion didn't need an ambulance.",
        author: "Rajesh K., Patient"
    }
];

export function ImpactStories() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Intervention Impact Stories</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View all stories <ArrowRight className="h-4 w-4" />
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {stories.map((story, index) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                                {story.region}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">The Challenge</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{story.problem}</p>
                            </div>

                            <div className="relative pl-4 border-l-2 border-green-500">
                                <h4 className="text-xs font-bold text-green-600 uppercase tracking-wide">AI Intervention</h4>
                                <p className="text-gray-900 font-medium text-sm leading-relaxed">{story.intervention}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Outcome</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{story.outcome}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-50 flex gap-3">
                            <MessageSquareQuote className="h-8 w-8 text-gray-200 shrink-0" />
                            <div>
                                <p className="text-sm italic text-gray-600">"{story.quote}"</p>
                                <p className="text-xs font-bold text-gray-900 mt-1">— {story.author}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
