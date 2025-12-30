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
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    Research Partners & Collaborations
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                    {partners.map((partner) => (
                        <div key={partner.name} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{partner.name}</h4>
                            <p className="text-xs text-gray-500 font-medium">{partner.role}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        *Funding Disclosure: This project is supported by a non-restricted educational grant from the Bill & Melinda Gates Foundation.
                        Funders have no role in the design, conduct, or reporting of our algorithms.
                    </p>
                    <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                        View Governance Charter <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>

            {/* Download Reports */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 shadow-lg text-white flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-300" />
                        Transparency Reports
                    </h3>
                    <p className="text-indigo-100 text-sm mb-8 opacity-90">
                        Download our detailed quarterly audit logs, algorithmic fairness assessments, and public health impact data.
                    </p>

                    <div className="space-y-3">
                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">Q4 2025 Algorithmic Audit</p>
                                    <p className="text-xs text-indigo-200">PDF • 2.4 MB</p>
                                </div>
                            </div>
                            <Download className="h-5 w-5 text-indigo-300 group-hover:text-white transition-colors" />
                        </button>

                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">Anonymized Public Health Data</p>
                                    <p className="text-xs text-indigo-200">CSV • 14 MB</p>
                                </div>
                            </div>
                            <Download className="h-5 w-5 text-indigo-300 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-xs text-indigo-200/60 font-medium">
                    Next release scheduled: Jan 15, 2026
                </div>
            </div>
        </div>
    );
}
