"use client";

import { useState } from "react";
import { Phone, AlertTriangle, Ambulance, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PanicButton() {
    const [showOptions, setShowOptions] = useState(false);
    const [confirmCall, setConfirmCall] = useState<{ number: string; label: string } | null>(null);

    const handlePanicClick = () => {
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
        setShowOptions(true);
    };

    const handleCallInitiate = (number: string, label: string) => {
        setConfirmCall({ number, label });
    };

    const proceedWithCall = () => {
        if (confirmCall) {
            window.location.href = `tel:${confirmCall.number}`;
            setConfirmCall(null);
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center">
            {!showOptions ? (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePanicClick}
                    className="w-full h-full min-h-[160px] bg-red-600 rounded-3xl shadow-xl shadow-red-500/30 flex flex-col items-center justify-center gap-3 text-white border-4 border-red-500 relative overflow-hidden group transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className="p-3 bg-white/10 rounded-full animate-pulse">
                            <AlertTriangle className="h-8 w-8" />
                        </div>
                        <span className="text-xl font-black tracking-wider">EMERGENCY SOS</span>
                        <span className="text-red-200 text-xs font-medium">Tap for Help</span>
                    </div>
                </motion.button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-4"
                >
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleCallInitiate("108", "Ambulance")}
                            className="flex-1 p-6 bg-red-100 rounded-2xl border-2 border-red-200 flex flex-col items-center gap-3 hover:bg-red-200 transition-colors"
                        >
                            <Ambulance className="h-10 w-10 text-red-600" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-red-900">108</span>
                                <span className="text-sm font-medium text-red-700">Ambulance</span>
                            </div>
                        </button>

                        <button
                            onClick={() => handleCallInitiate("102", "Medical Emergency")}
                            className="flex-1 p-6 bg-orange-100 rounded-2xl border-2 border-orange-200 flex flex-col items-center gap-3 hover:bg-orange-200 transition-colors"
                        >
                            <Phone className="h-10 w-10 text-orange-600" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-orange-900">102</span>
                                <span className="text-sm font-medium text-orange-700">Medical</span>
                            </div>
                        </button>
                    </div>

                    <button
                        onClick={() => setShowOptions(false)}
                        className="w-full py-3 bg-gray-100 rounded-xl text-gray-600 font-medium hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </motion.div>
            )}

            <AnimatePresence>
                {confirmCall && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Call {confirmCall.label}?</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to call <span className="font-bold text-black">{confirmCall.number}</span>?
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmCall(null)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-bold flex items-center justify-center gap-2 hover:bg-gray-200"
                                >
                                    <X className="h-5 w-5" /> Cancel
                                </button>
                                <button
                                    onClick={proceedWithCall}
                                    className="flex-1 py-3 px-4 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-green-600 shadow-lg shadow-green-500/30"
                                >
                                    <Check className="h-5 w-5" /> Call Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
