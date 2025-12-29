"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { PanicButton } from "@/components/emergency/PanicButton";
import { LocationShare } from "@/components/emergency/LocationShare";
import { MedicalIDCard } from "@/components/emergency/MedicalIDCard";
import { FirstAidAccordion } from "@/components/emergency/FirstAidAccordion";
import { DisasterAlerts } from "@/components/emergency/DisasterAlerts";
import { PreparednessChecklist } from "@/components/emergency/PreparednessChecklist";
import { MentalHealthSupport } from "@/components/emergency/MentalHealthSupport";
import { TherapistDirectory } from "@/components/emergency/TherapistDirectory";

export default function EmergencyPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-3xl text-red-900 shadow-sm"
            >
                <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="font-bold text-xl md:text-2xl">Emergency Center</h1>
                    <p className="text-sm md:text-base text-red-700/80">
                        Quick access to critical services. Stay calm, help is always available.
                    </p>
                </div>
            </motion.div>

            {/* Critical Section - Panic & Location */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="order-1 lg:order-1">
                    <PanicButton />
                </div>
                <div className="order-2 lg:order-2">
                    <LocationShare />
                </div>
            </div>

            <div className="border-t border-gray-100 my-8" />

            {/* Medical & First Aid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <MedicalIDCard />
                </div>
                <div className="lg:col-span-2">
                    <FirstAidAccordion />
                </div>
            </div>

            {/* Tools Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <DisasterAlerts />
                    <div className="mt-6">
                        <PreparednessChecklist />
                    </div>
                </div>
                <div className="space-y-6">
                    <MentalHealthSupport />
                    <TherapistDirectory />
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100">
                <Info className="h-5 w-5 shrink-0 text-blue-600" />
                <p>
                    <strong>Disclaimer:</strong> This app helps connect you to services but is not a substitute for professional medical care. In life-threatening emergencies, always call 108 immediately.
                </p>
            </div>
        </div>
    );
}
