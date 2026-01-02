
"use client";

import { useSettings } from "@/context/SettingsContext";
import { SettingSection } from "../SettingSection";
import { SettingToggle } from "../SettingToggle";
import { Type, Moon } from "lucide-react";

export function AccessibilitySettings() {
    const { fontSize, highContrast, updateSetting } = useSettings();

    return (
        <div className="space-y-6">
            <SettingSection title="Display" description="Customize reading experience.">

                {/* Font Size Slider */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                <Type className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Text Size</h4>
                                <p className="text-sm text-gray-500">Adjust text scaling across the app.</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">{fontSize}%</span>
                    </div>

                    <div className="px-1">
                        <input
                            type="range"
                            min="80"
                            max="150"
                            step="10"
                            value={fontSize}
                            onChange={(e) => updateSetting("fontSize", Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium px-1">
                            <span>Small</span>
                            <span>Default</span>
                            <span>Large</span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-4" />

                {/* High Contrast */}
                <SettingToggle
                    label="High Contrast Mode"
                    description="Increase contrast for better legibility."
                    isOn={highContrast}
                    onToggle={() => updateSetting("highContrast", !highContrast)}
                    icon={Moon}
                />
            </SettingSection>
        </div>
    );
}
