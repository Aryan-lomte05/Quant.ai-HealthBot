
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SettingsState {
    language: string;
    voiceEnabled: boolean;
    fontSize: number; // Percentage (80-150)
    highContrast: boolean;
    dataSharing: boolean;
    anonymousAnalytics: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
    language: "english",
    voiceEnabled: true,
    fontSize: 100,
    highContrast: false,
    dataSharing: false,
    anonymousAnalytics: true,
};

interface SettingsContextType extends SettingsState {
    updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Load from LocalStorage on Mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("sakha_settings");
            if (stored) {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
            }
        } catch (e) {
            console.error("Failed to load settings:", e);
        }
        setIsLoaded(true);
    }, []);

    // 2. Save to LocalStorage on Change
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("sakha_settings", JSON.stringify(settings));
    }, [settings, isLoaded]);

    // 3. Apply Global Side Effects
    useEffect(() => {
        if (!isLoaded) return;

        // Font Scaling
        document.documentElement.style.fontSize = `${settings.fontSize}%`;

        // High Contrast
        if (settings.highContrast) {
            document.body.classList.add("high-contrast");
            // For Tailwind, we might simply rely on the class, ensuring we have styles for it.
            // We can also force grayscale or specific filters if we want a "cheap" high contrast mode.
            document.documentElement.style.filter = "contrast(1.2)";
        } else {
            document.body.classList.remove("high-contrast");
            document.documentElement.style.filter = "none";
        }

    }, [settings.fontSize, settings.highContrast, isLoaded]);

    const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    // Avoid hydration mismatch by rendering children only after load, or just render with defaults (risk of flicker)
    // We'll render immediately but effects kick in after mount.
    return (
        <SettingsContext.Provider value={{ ...settings, updateSetting, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
