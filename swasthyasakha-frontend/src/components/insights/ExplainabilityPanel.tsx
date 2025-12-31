"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, BrainCircuit, AlertOctagon, Lock, Sparkles } from "lucide-react";

const sections = [
    {
        id: "logic",
        icon: BrainCircuit,
        title: "How the Model Works",
        content: "Our AI uses a probabilistic decision tree trained on over 5 million anonymized clinical records. It analyzes symptom patterns to suggest potential conditions, assigning a confidence score based on similarity to known medical cases."
    },
    {
        id: "data",
        icon: Lock,
        title: "Data Sources & Privacy",
        content: "Training data is aggregated from open-source medical datasets (MIMIC-IV, WHO Global Health Estimates) and partnered hospital networks in India. Personally Identifiable Information (PII) is stripped before ingestion."
    },
    {
        id: "limits",
        icon: AlertOctagon,
        title: "Limitations & Risks",
        content: "The model may hallucinate (invent facts) when presented with vague symptoms. It underperforms on rare genetic disorders (<0.01% prevalence). It is NOT a substitute for a doctor."
    }
];

export function ExplainabilityPanel() {
    const [openId, setOpenId] = useState<string | null>("logic");

    return (
        <div className="relative group">
            {/* Soft Ambient Glow - Reduced blur for performance */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-[2.5rem] blur-xl opacity-40" />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-emerald-500/10">
                {/* Deep Emerald Background - Reduced transparency layers */}
                <div className="absolute inset-0 bg-[#0a201b]" />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-emerald-950/40" />

                {/* Premium Texture Overlay - Reduced opacity */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />

                <div className="relative z-10 p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                                <Sparkles className="w-3 h-3" />
                                Ethical AI Core
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight drop-shadow-sm">
                                Transparency <span className="text-emerald-400">&</span> Ethics
                            </h3>
                            <p className="text-emerald-100/70 font-medium leading-relaxed max-w-md">
                                Demystifying the "Black Box". Understand exactly how our AI decision engine protects and serves you.
                            </p>
                        </div>
                        {/* Glass Icon Box */}
                        <div className="hidden md:flex h-14 w-14 rounded-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-md items-center justify-center border border-white/20 shadow-lg shadow-emerald-900/20">
                            <ShieldCheck className="w-7 h-7 text-emerald-300 drop-shadow-[0_0_5px_rgba(110,231,183,0.5)]" />
                        </div>
                    </div>

                    {/* Accordion Sections */}
                    <div className="space-y-3.5">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-2xl transition-all duration-300 group/card ${openId === section.id
                                    ? 'bg-emerald-500/20 border-emerald-400/40'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    } border overflow-hidden backdrop-blur-md shadow-lg`}
                            >
                                <button
                                    onClick={() => setOpenId(openId === section.id ? null : section.id)}
                                    className="relative z-10 w-full flex items-center justify-between p-4 text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${openId === section.id
                                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-emerald-950 shadow-lg shadow-emerald-500/40 scale-110'
                                            : 'bg-white/5 text-emerald-200/60 group-hover/card:bg-white/10 group-hover/card:text-emerald-200'
                                            }`}>
                                            <section.icon className="h-5 w-5" />
                                        </div>
                                        <span className={`font-bold text-lg transition-colors ${openId === section.id ? 'text-white' : 'text-emerald-100/80 group-hover/card:text-white'
                                            }`}>
                                            {section.title}
                                        </span>
                                    </div>
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${openId === section.id ? 'bg-emerald-400/20 text-emerald-300 rotate-180' : 'bg-transparent text-emerald-500/50 group-hover/card:text-emerald-400'
                                        }`}>
                                        <ChevronDown className="h-5 w-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openId === section.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                                        >
                                            <div className="px-5 pb-5 pt-0 pl-[4.5rem]">
                                                <div className="h-px w-full bg-gradient-to-r from-emerald-500/30 to-transparent mb-3" />
                                                <p className="text-emerald-100/90 leading-relaxed text-sm md:text-base font-medium">
                                                    {section.content}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Badge */}
                    <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 backdrop-blur-md">
                        <div className="relative">
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-emerald-400 blur-sm animate-pulse" />
                        </div>
                        <p className="text-xs md:text-sm text-emerald-200/80 leading-relaxed flex-1 font-medium">
                            Audited quarterly by the <strong className="text-emerald-300">SwasthyaSakha Ethics Committee</strong>. Last audit: <span className="text-emerald-100 font-mono tracking-tight">Dec 2025</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
