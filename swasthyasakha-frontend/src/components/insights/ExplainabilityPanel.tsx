"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, BrainCircuit, AlertOctagon } from "lucide-react";

const sections = [
    {
        id: "logic",
        icon: BrainCircuit,
        title: "How the Model Works",
        content: "Our AI uses a probabilistic probabilistic decision tree trained on over 5 million anonymized clinical records. It analyzes symptom patterns to suggest potential conditions, assigning a confidence score based on similarity to known medical cases. It does NOT 'think' or 'diagnose'—it generates statistical matches."
    },
    {
        id: "data",
        icon: ShieldCheck,
        title: "Data Sources & Privacy",
        content: "Training data is aggregated from open-source medical datasets (MIMIC-IV, WHO Global Health Estimates) and partnered hospital networks in India. Personally Identifiable Information (PII) is stripped before ingestion. We comply with DISHA (Draft) and IPD guidelines for data sovereignty."
    },
    {
        id: "limits",
        icon: AlertOctagon,
        title: "Limitations & Risks",
        content: "The model may hallucinate (invent facts) when presented with vague symptoms. It underperforms on rare genetic disorders (<0.01% prevalence). It is NOT a substitute for a doctor. In emergency situations (chest pain, severe bleeding), the AI is programmed to immediately divert users to emergency services (108)."
    }
];

export function ExplainabilityPanel() {
    const [openId, setOpenId] = useState<string | null>("logic");

    return (
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">AI Transparency & Ethics</h3>
                <p className="text-slate-400">Understanding the "Why" and "How" behind our recommendations.</p>
            </div>

            <div className="space-y-4">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-slate-700/50 bg-slate-800/50 rounded-2xl overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenId(openId === section.id ? null : section.id)}
                            className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-slate-800"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${openId === section.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                    <section.icon className="h-6 w-6" />
                                </div>
                                <span className="font-bold text-lg">{section.title}</span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${openId === section.id ? "rotate-180" : ""}`}
                            />
                        </button>

                        <AnimatePresence>
                            {openId === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="p-5 pt-0 text-slate-300 leading-relaxed border-t border-slate-700/50 mt-2">
                                        {section.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl flex gap-3 text-sm text-blue-200">
                <ShieldCheck className="h-5 w-5 shrink-0 text-blue-400" />
                <p>
                    This model is audited quarterly by the <strong>SwasthyaSakha Ethics Committee</strong> for bias and accuracy. Last audit: Dec 2025.
                </p>
            </div>
        </div>
    );
}
