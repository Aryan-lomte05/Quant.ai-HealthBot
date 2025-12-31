"use client";

import { Building2, Download, FileText, ExternalLink } from "lucide-react";

const partners = [
    { name: "AIIMS Delhi", role: "Clinical Validation Partner" },
    { name: "IIT Bombay", role: "NLP Model Research" },
    { name: "Bill & Melinda Gates Foundation", role: "Impact Grant Provider" },
    { name: "Swasth Foundation", role: "Rural Deployment Partner" },
];

export function TransparencySection() {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Research Partners */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-emerald-50/50 rounded-3xl border border-emerald-100/60 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-emerald-950 mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-emerald-600" />
                    Research Partners & Collaborations
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                    {partners.map((partner) => (
                        <div key={partner.name} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50 flex flex-col justify-center hover:bg-emerald-100/50 transition-colors">
                            <h4 className="font-bold text-emerald-900 text-sm mb-1">{partner.name}</h4>
                            <p className="text-xs text-emerald-600/80 font-medium">{partner.role}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-100/60">
                    <p className="text-xs text-emerald-600/70 leading-relaxed mb-4">
                        *Funding Disclosure: This project is supported by a non-restricted educational grant from the Bill & Melinda Gates Foundation.
                        Funders have no role in the design, conduct, or reporting of our algorithms.
                    </p>
                    <a href="#" className="text-sm font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group">
                        View Governance Charter <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Download Reports - Deep Emerald Theme */}
            <div className="relative group overflow-hidden rounded-3xl shadow-lg">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-teal-900" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />

                <div className="relative p-6 h-full flex flex-col justify-between z-10">
                    <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                            <FileText className="h-5 w-5 text-emerald-300" />
                            Transparency Reports
                        </h3>
                        <p className="text-emerald-100/80 text-sm mb-8 font-medium">
                            Download our detailed quarterly audit logs, algorithmic fairness assessments, and public health impact data.
                        </p>

                        <div className="space-y-3">
                            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between transition-all group/btn">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/20 group-hover/btn:border-emerald-400/30 transition-colors">
                                        <FileText className="h-5 w-5 text-emerald-300" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-emerald-50 group-hover/btn:text-white transition-colors">Q4 2025 Algorithmic Audit</p>
                                        <p className="text-xs text-emerald-200/60 font-medium">PDF • 2.4 MB</p>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all text-emerald-300/70">
                                    <Download className="h-4 w-4" />
                                </div>
                            </button>

                            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between transition-all group/btn">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/20 group-hover/btn:border-emerald-400/30 transition-colors">
                                        <FileText className="h-5 w-5 text-emerald-300" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-emerald-50 group-hover/btn:text-white transition-colors">Anonymized Public Health Data</p>
                                        <p className="text-xs text-emerald-200/60 font-medium">CSV • 14 MB</p>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all text-emerald-300/70">
                                    <Download className="h-4 w-4" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs text-emerald-300/60 font-medium bg-black/20 self-start px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Next release: Jan 15, 2026
                    </div>
                </div>
            </div>
        </div>
    );
}
