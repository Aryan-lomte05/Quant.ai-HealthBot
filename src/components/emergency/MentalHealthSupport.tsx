"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export function MentalHealthSupport() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100 h-full">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-white rounded-full shadow-sm text-teal-600">
                        <HeartHandshakeIcon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-teal-900">Mental Health Crisis</h2>
                </div>

                <div className="space-y-3">
                    <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="p-4 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-between transition-shadow hover:shadow-md"
                    >
                        <div>
                            <p className="font-bold text-gray-900">Kiran Helpline</p>
                            <p className="text-xs text-gray-500">24/7 Mental Health Support</p>
                        </div>
                        <a
                            href="tel:18005990019"
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Phone className="h-4 w-4" /> Call
                        </a>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="p-4 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-between transition-shadow hover:shadow-md"
                    >
                        <div>
                            <p className="font-bold text-gray-900">AASRA</p>
                            <p className="text-xs text-gray-500">Suicide Prevention</p>
                        </div>
                        <a
                            href="tel:919820466726"
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Phone className="h-4 w-4" /> Call
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function HeartHandshakeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 11l.96.96 2.59 2.59" />
            <path d="M19.07 4.93 17 9l-.96.96-2.59 2.59" />
            <path d="M8 11v6a2 2 0 0 0 2 2h3" />
            <path d="M16 11v6a2 2 0 0 1-2 2h-3" />
        </svg>
    );
}
