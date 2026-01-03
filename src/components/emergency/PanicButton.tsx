"use client";

import { useState } from "react";
import { Phone, Ambulance, Check, X, AlertTriangle } from "lucide-react";
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
        <div className="w-full h-full flex flex-col justify-center p-6">
            {!showOptions ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Clean Emergency Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePanicClick}
                        className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 shadow-2xl shadow-red-600/40 transition-shadow hover:shadow-red-600/60"
                    >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Content */}
                        <div className="relative p-16 flex flex-col items-center gap-6">
                            {/* Icon */}
                            <div className="p-6 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-xl">
                                <AlertTriangle className="h-14 w-14 text-white" strokeWidth={2} />
                            </div>

                            {/* Text */}
                            <div className="text-center space-y-2">
                                <h3 className="text-4xl font-black text-white uppercase tracking-wide">
                                    Emergency SOS
                                </h3>
                                <p className="text-red-100 text-base font-medium">
                                    Tap to activate emergency services
                                </p>
                            </div>

                            {/* Status indicator */}
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Available 24/7</span>
                            </div>
                        </div>
                    </motion.button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                >
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Services</h3>
                        <p className="text-sm text-gray-500">Select the service you need</p>
                    </div>

                    {/* Emergency options */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCallInitiate("108", "Ambulance")}
                            className="w-full p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center gap-5 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition-all border border-red-500"
                        >
                            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Ambulance className="h-7 w-7 text-white" strokeWidth={2} />
                            </div>
                            <div className="flex-1 text-left">
                                <span className="block text-3xl font-black text-white">108</span>
                                <span className="text-sm font-semibold text-red-100">Ambulance Service</span>
                            </div>
                            <Phone className="h-5 w-5 text-white/80" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCallInitiate("102", "Medical Emergency")}
                            className="w-full p-6 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center gap-5 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 transition-all border border-orange-500"
                        >
                            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Phone className="h-7 w-7 text-white" strokeWidth={2} />
                            </div>
                            <div className="flex-1 text-left">
                                <span className="block text-3xl font-black text-white">102</span>
                                <span className="text-sm font-semibold text-orange-100">Medical Emergency</span>
                            </div>
                            <Phone className="h-5 w-5 text-white/80" />
                        </motion.button>
                    </div>

                    {/* Cancel button */}
                    <button
                        onClick={() => setShowOptions(false)}
                        className="w-full py-3.5 mt-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                </motion.div>
            )}

            {/* Confirmation Modal */}
            <AnimatePresence>
                {confirmCall && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setConfirmCall(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="p-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
                                    <Phone className="h-8 w-8 text-white" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                                Call {confirmCall.label}?
                            </h3>
                            <p className="text-gray-600 mb-8 text-center">
                                You're about to call{" "}
                                <span className="font-bold text-emerald-600">{confirmCall.number}</span>
                            </p>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmCall(null)}
                                    className="flex-1 py-3.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                    Cancel
                                </button>
                                <button
                                    onClick={proceedWithCall}
                                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
                                >
                                    <Check className="h-5 w-5" />
                                    Call Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
