"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsSidebar, SettingsTab } from "@/components/settings/SettingsSidebar";

import { GeneralSettings } from "@/components/settings/sections/GeneralSettings";
import { PrivacySecurity } from "@/components/settings/sections/PrivacySecurity";
import { EthicsCompliance } from "@/components/settings/sections/EthicsCompliance";
import { AccessibilitySettings } from "@/components/settings/sections/AccessibilitySettings";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");

    return (
        <div className="min-h-full bg-gray-50/50 p-4 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Settings & Ethics</h1>
                    <p className="text-gray-500">Manage your preferences, privacy, and compliance controls.</p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Content Panel */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {activeTab === "general" && <GeneralSettings />}
                                {activeTab === "privacy" && <PrivacySecurity />}
                                {activeTab === "ethics" && <EthicsCompliance />}
                                {activeTab === "accessibility" && <AccessibilitySettings />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
