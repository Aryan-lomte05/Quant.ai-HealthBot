"use client";

import { motion, useInView } from "framer-motion";
import { Shield, Sparkles, AlertCircle } from "lucide-react";
import { PanicButton } from "@/components/emergency/PanicButton";
import { LocationShare } from "@/components/emergency/LocationShare";
import { MedicalIDCard } from "@/components/emergency/MedicalIDCard";
import { FirstAidAccordion } from "@/components/emergency/FirstAidAccordion";
import { DisasterAlerts } from "@/components/emergency/DisasterAlerts";
import { PreparednessChecklist } from "@/components/emergency/PreparednessChecklist";
import { MentalHealthSupport } from "@/components/emergency/MentalHealthSupport";
import { TherapistDirectory } from "@/components/emergency/TherapistDirectory";
import { EmergencyBackground } from "@/components/emergency/EmergencyBackground";
import { useRef } from "react";

// GPU-optimized scroll fade component
function ScrollFadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function EmergencyPage() {
    return (
        <>
            <EmergencyBackground />

            <div className="max-w-[1600px] mx-auto space-y-6 pb-20 px-4 pt-6 relative">
                {/* Smooth Header Animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ willChange: 'auto' }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/90 via-white/70 to-teal-50/90 border border-emerald-100/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl"
                >
                    {/* Static background blobs */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-300/40 to-teal-300/30 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-gradient-to-tr from-teal-300/30 to-emerald-300/20 blur-3xl opacity-30" />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/60 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                </span>
                                <Sparkles className="h-3 w-3" />
                                Live Emergency System
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 pb-2 leading-tight">
                                Emergency Center
                            </h1>
                            <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-2xl">
                                Critical response tools at your fingertips • Available 24/7
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <Shield className="h-20 w-20 text-emerald-500/30" strokeWidth={1.5} />
                        </div>
                    </div>
                </motion.div>

                {/* GPU-Optimized Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Emergency SOS */}
                    <ScrollFadeIn className="lg:col-span-5 lg:row-span-2" delay={0.05}>
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl rounded-3xl border-2 border-white/70 shadow-2xl hover:shadow-red-500/20 transition-shadow duration-300 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <PanicButton />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Location Share */}
                    <ScrollFadeIn className="lg:col-span-7" delay={0.1}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <LocationShare />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Disaster Alerts */}
                    <ScrollFadeIn className="lg:col-span-4" delay={0.15}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-white/70 to-orange-50/50 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <DisasterAlerts />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Mental Health */}
                    <ScrollFadeIn className="lg:col-span-3" delay={0.2}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full transition-shadow duration-300 overflow-hidden"
                        >
                            <MentalHealthSupport />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Medical ID */}
                    <ScrollFadeIn className="lg:col-span-4" delay={0.05}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-emerald-50/90 to-teal-50/90 backdrop-blur-xl rounded-2xl border border-emerald-100/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <MedicalIDCard />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Preparedness */}
                    <ScrollFadeIn className="lg:col-span-4" delay={0.1}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-white/70 to-indigo-50/50 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <PreparednessChecklist />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* First Aid */}
                    <ScrollFadeIn className="lg:col-span-4" delay={0.15}>
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="h-full bg-gradient-to-br from-white/70 to-red-50/50 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <FirstAidAccordion />
                        </motion.div>
                    </ScrollFadeIn>

                    {/* Therapist Directory */}
                    <ScrollFadeIn className="lg:col-span-12" delay={0.2}>
                        <motion.div
                            whileHover={{ scale: 1.002 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ willChange: 'transform' }}
                            className="bg-gradient-to-br from-white/70 to-teal-50/50 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <TherapistDirectory />
                        </motion.div>
                    </ScrollFadeIn>
                </div>

                {/* Disclaimer */}
                <ScrollFadeIn delay={0.25}>
                    <div className="bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-md rounded-2xl border border-gray-200/60 p-5 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                <AlertCircle className="h-5 w-5 text-slate-500" />
                            </div>
                            <div className="flex-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                <h4 className="font-bold text-slate-800 mb-1">Medical Disclaimer</h4>
                                <p>
                                    This application facilitates connection to emergency services. For life-threatening emergencies, call <strong className="text-red-600">108</strong> (India) directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollFadeIn>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3));
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, rgba(16, 185, 129, 0.5), rgba(20, 184, 166, 0.5));
                }
            `}</style>
        </>
    );
}
