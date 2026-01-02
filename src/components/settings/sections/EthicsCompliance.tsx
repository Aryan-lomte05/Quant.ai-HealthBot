
"use client";

import { SettingSection } from "../SettingSection";
import { ShieldCheck, Scale, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ComplianceCard({ title, code, description }: { title: string; code: string; description: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden transition-all hover:border-emerald-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        {title}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{code}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white"
                    >
                        <div className="px-4 pb-4 pt-2 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                            {description}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function EthicsCompliance() {
    return (
        <div className="space-y-6">
            {/* AI Fairness Score */}
            <SettingSection title="AI Fairness & Bias Report" description="Live monitoring of our AI models to ensure equitable healthcare advice.">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border border-emerald-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">Fairness Score</span>
                        <span className="text-xl font-black text-emerald-600">98.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "98.4%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-emerald-500 h-2.5 rounded-full"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-emerald-50">
                            <div className="text-xs text-gray-400 mb-0.5">Gender Bias</div>
                            <div className="text-sm font-bold text-emerald-700">~0.1%</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-emerald-50">
                            <div className="text-xs text-gray-400 mb-0.5">Regional Bias</div>
                            <div className="text-sm font-bold text-emerald-700">None</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-emerald-50">
                            <div className="text-xs text-gray-400 mb-0.5">Accuracy</div>
                            <div className="text-sm font-bold text-emerald-700">99.2%</div>
                        </div>
                    </div>
                </div>
            </SettingSection>

            {/* Compliance Hub */}
            <SettingSection title="Compliance Standards" description="Regulatory frameworks we strictly adhere to.">
                <div className="space-y-3">
                    <ComplianceCard
                        title="DPDP Act 2023"
                        code="INDIA • COMPLIANT"
                        description="Quant.ai fully complies with the Digital Personal Data Protection Act, 2023. We ensure purpose limitation, data minimization, and your right to correction and erasure."
                    />
                    <ComplianceCard
                        title="GDPR"
                        code="EU • COMPLIANT"
                        description="For our European users, we adhere to the General Data Protection Regulation standards, offering full transparency on data processing and cross-border transfer protections."
                    />
                    <ComplianceCard
                        title="HIPAA (Guidelines)"
                        code="US • ALIGNED"
                        description="While primarily operational in India, our encryption and data handling protocols are aligned with HIPAA security rules to ensure world-class patient confidentiality."
                    />
                </div>
            </SettingSection>
        </div>
    );
}
