"use client";

import { History, GitCommit, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const history = [
    {
        version: "v2.4.0",
        date: "Dec 15, 2025",
        status: "Active",
        changes: "Enhanced support for Marathi and Hindi dialects. Improved cardiac symptom detection accuracy by 8%.",
        type: "major"
    },
    {
        version: "v2.3.1",
        date: "Nov 02, 2025",
        status: "Deprecated",
        changes: "Hotfix for geolocation latency. Updated helpline database for rural Maharashtra.",
        type: "patch"
    },
    {
        version: "v2.3.0",
        date: "Oct 10, 2025",
        status: "Deprecated",
        changes: "Added flood-risk predictive layer. Integrated with National Disaster Management Authority API (mock).",
        type: "minor"
    }
];

export function ModelHistory() {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <History className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Model Version History</h3>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                {history.map((item, index) => (
                    <motion.div
                        key={item.version}
                        className="relative pl-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.2 }}
                    >
                        {/* Timeline Dot */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.1 }}
                            className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${index === 0 ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-300'}`}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-lg font-bold text-gray-900">{item.version}</span>
                                {index === 0 ? (
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" /> Active
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold">
                                        Deprecated
                                    </span>
                                )}
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{item.date}</span>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.changes}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
