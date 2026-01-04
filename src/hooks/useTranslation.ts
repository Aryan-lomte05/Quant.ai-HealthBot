"use client";

import { useSettings } from "@/context/SettingsContext";
import { translations, Language } from "@/lib/i18n/translations";

export function useTranslation() {
    const { language } = useSettings();

    // Normalize language key to lowercase to match our types
    const currentLang = (language?.toLowerCase() || "english") as Language;

    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = translations[currentLang] || translations.english;
        let fallback: any = translations.english;

        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                current = undefined;
            }

            if (fallback && fallback[key] !== undefined) {
                fallback = fallback[key];
            } else {
                fallback = undefined;
            }
        }

        const result = current !== undefined ? current : fallback;

        // If result is still an object (not a leaf string), return empty string or path
        // ideally we shouldn't ask for a non-leaf node.
        if (typeof result === 'object' && result !== null) {
            return path;
        }

        return (result as string) || path;
    };

    return { t, language: currentLang };
}
