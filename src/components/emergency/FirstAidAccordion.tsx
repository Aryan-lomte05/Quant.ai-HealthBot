"use client";

import { useState } from "react";
import { ChevronDown, Heart, UserX, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const guides = [
    {
        id: "cpr",
        title: "CPR (Cardiopulmonary Resuscitation)",
        icon: Heart,
        color: "text-red-500",
        bg: "bg-red-50",
        steps: [
            "Check responsiveness: Shake gently and shout.",
            "Call 108 immediately if no response.",
            "Check breathing: Look for chest rise.",
            "Push hard and fast: Center of chest, 2 inches deep, 100-120 compressions/minute.",
            "Continue until help arrives.",
        ],
    },
    {
        id: "choking",
        title: "Choking (Heimlich Maneuver)",
        icon: UserX,
        color: "text-orange-500",
        bg: "bg-orange-50",
        steps: [
            "Stand behind the person.",
            "Wrap arms around waist.",
            "Make a fist above the navel.",
            "Grab fist with other hand.",
            "Thrust inward and upward forcefully.",
        ],
    },
    {
        id: "bleeding",
        title: "Severe Bleeding",
        icon: Activity,
        color: "text-blue-500",
        bg: "bg-blue-50",
        steps: [
            "Apply direct pressure with a clean cloth.",
            "Elevate the wound if possible.",
            "Do not remove the cloth if soaked; add more layers.",
            "Keep pressure until help arrives.",
            "Tourniquet only as last resort for life-threatening limb bleeding.",
        ],
    },
];

export function FirstAidAccordion() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="space-y-4 p-5">
            <h2 className="text-lg font-bold text-gray-800">First Aid Guides</h2>
            <div className="space-y-3">
                {guides.map((guide) => (
                    <div
                        key={guide.id}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                    >
                        <button
                            onClick={() => setOpenId(openId === guide.id ? null : guide.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left gap-3"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`p-2 rounded-lg ${guide.bg} ${guide.color} flex-shrink-0`}>
                                    <guide.icon className="h-4 w-4" />
                                </div>
                                <span className="font-semibold text-gray-900 text-sm leading-tight">{guide.title}</span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${openId === guide.id ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <AnimatePresence>
                            {openId === guide.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-gray-50 border-t border-gray-100"
                                >
                                    <ul className="p-4 space-y-2">
                                        {guide.steps.map((step, index) => (
                                            <li key={index} className="flex gap-3 text-gray-700 text-xs leading-relaxed">
                                                <span className="font-bold text-gray-400 select-none flex-shrink-0">
                                                    {index + 1}.
                                                </span>
                                                <span className="flex-1">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
