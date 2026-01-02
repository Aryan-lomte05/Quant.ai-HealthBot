"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { PanicButton } from "@/components/emergency/PanicButton";
import { LocationShare } from "@/components/emergency/LocationShare";
import { MedicalIDCard } from "@/components/emergency/MedicalIDCard";
import { FirstAidAccordion } from "@/components/emergency/FirstAidAccordion";
import { DisasterAlerts } from "@/components/emergency/DisasterAlerts";
import { PreparednessChecklist } from "@/components/emergency/PreparednessChecklist";
import { MentalHealthSupport } from "@/components/emergency/MentalHealthSupport";
import { TherapistDirectory } from "@/components/emergency/TherapistDirectory";

export default function EmergencyPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-24 px-4 pt-8">
            {/* Stylish Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 via-white to-red-50 border border-red-100 p-8 shadow-sm"
            >
                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-red-100/50 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-700 text-xs font-bold uppercase tracking-wider mb-4"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Live Emergency System
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-red-600 animate-gradient-x pb-2">
                            Emergency Center
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl font-medium">
                            Immediate access to critical response tools. Stay calm, help is just a click away.
                        </p>
                    </div>

                    <div className="hidden md:block transform rotate-12 opacity-90">
                        <ShieldAlert className="h-24 w-24 text-red-100" />
                    </div>
                </div>
            </motion.div>

            {/* Bento Grid Layout */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
            >
                {/* Panic Button: Hero Element */}
                <motion.div variants={item} className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-full">
                    <div className="h-full flex flex-col">
                        <PanicButton />
                    </div>
                </motion.div>

                {/* Location Share: High Priority */}
                <motion.div variants={item} className="md:col-span-2">
                    <LocationShare />
                </motion.div>

                {/* Disaster Alerts: Compact Info */}
                <motion.div variants={item} className="md:col-span-1">
                    <div className="h-full bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <DisasterAlerts />
                    </div>
                </motion.div>

                {/* Mental Health: Medium Priority */}
                <motion.div variants={item} className="md:col-span-1">
                    <div className="h-full flex flex-col justify-between gap-4">
                        <MentalHealthSupport />
                    </div>
                </motion.div>

                {/* First Aid: detailed guide area */}
                <motion.div variants={item} className="md:col-span-2 md:row-span-2">
                    <div className="h-full bg-white rounded-3xl border border-gray-200 overflow-hidden p-1 shadow-sm">
                        <div className="h-full overflow-y-auto custom-scrollbar">
                            <FirstAidAccordion />
                        </div>
                    </div>
                </motion.div>

                {/* Medical ID: Vertical Stack */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-2">
                    <div className="h-full">
                        <MedicalIDCard />
                    </div>
                </motion.div>

                {/* Preparedness: Checklist - Fill the gap */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-2">
                    <div className="h-full">
                        <PreparednessChecklist />
                    </div>
                </motion.div>

                {/* Therapists: Wide footer */}
                <motion.div variants={item} className="md:col-span-4 lg:col-span-4">
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <TherapistDirectory />
                    </div>
                </motion.div>

            </motion.div>

            <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Info className="h-5 w-5 text-slate-500" />
                </div>
                <div className="text-sm text-slate-600">
                    <h4 className="font-bold text-slate-800 mb-1">Medical Disclaimer</h4>
                    <p>
                        This application facilitates connection to emergency services but does not provide direct medical care.
                        In case of a life-threatening emergency, always prioritize calling <strong>108</strong> (India) or your local emergency number directly given network latency risks.
                    </p>
                </div>
            </div>
        </div>
    );
}
