
"use client";

import { useSettings } from "@/context/SettingsContext"; // Ensure this path is correct
import { SettingSection } from "../SettingSection";
import { SettingToggle } from "../SettingToggle";
import { Globe, Volume2 } from "lucide-react";

export function GeneralSettings() {
    const { language, voiceEnabled, updateSetting } = useSettings();

    return (
        <div className="space-y-6">
            <SettingSection title="Language Preferences" description="Choose your preferred language for the interface and AI responses.">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Globe className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="language-select" className="sr-only">Select Language</label>
                        <select
                            id="language-select"
                            value={language}
                            onChange={(e) => updateSetting("language", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="english">English (Default)</option>
                            <option value="hindi">Hindi (हिंदी)</option>
                            <option value="marathi">Marathi (मराठी)</option>
                        </select>
                    </div>
                </div>
            </SettingSection>

            <SettingSection title="Voice Interaction" description="Control how the AI speaks to you.">
                <SettingToggle
                    label="Enable Text-to-Speech"
                    description="Allow Sakha to read responses aloud automatically."
                    isOn={voiceEnabled}
                    onToggle={() => updateSetting("voiceEnabled", !voiceEnabled)}
                    icon={Volume2}
                />
            </SettingSection>
        </div>
    );
}
