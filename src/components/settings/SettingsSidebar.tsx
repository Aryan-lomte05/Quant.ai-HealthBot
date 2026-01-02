
import { motion } from "framer-motion";
import { Settings, Shield, Lock, Accessibility, Volume2, Globe, FileText, Scale } from "lucide-react";

export type SettingsTab = "general" | "privacy" | "ethics" | "accessibility";

interface SettingsSidebarProps {
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

const MENU_ITEMS = [
    { id: "general", label: "General", icon: Settings, desc: "Language, Voice" },
    { id: "privacy", label: "Privacy & Security", icon: Lock, desc: "Data, Audit Logs" },
    { id: "ethics", label: "Ethics & Compliance", icon: Scale, desc: "AI Fairness, GDPR" },
    { id: "accessibility", label: "Accessibility", icon: Accessibility, desc: "Text Size, Contrast" },
] as const;

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
    return (
        <div className="w-full space-y-2 lg:w-64 shrink-0">
            <h2 className="mb-4 px-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                Settings
            </h2>
            <nav className="space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => onTabChange(item.id as SettingsTab)}
                            whileHover={{ x: 4, backgroundColor: "rgba(249, 250, 251, 1)" }}
                            transition={{ duration: 0.2 }}
                            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-200 ${isActive
                                    ? "bg-emerald-50 text-emerald-900"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-settings-tab"
                                    className="absolute inset-0 rounded-xl bg-emerald-50"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                                />
                            )}
                            <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isActive ? "bg-emerald-100/50 text-emerald-600" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                }`}>
                                <item.icon className="h-4 w-4" />
                            </div>
                            <div className="relative z-10 flex-1">
                                <p className="text-sm font-semibold">{item.label}</p>
                                <p className={`text-[10px] ${isActive ? "text-emerald-700/70" : "text-gray-400"}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </nav>

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white shadow-lg shadow-emerald-500/20">
                <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 shrink-0 opacity-80" />
                    <div>
                        <p className="text-xs font-medium opacity-90">Trust Center</p>
                        <p className="mt-1 text-[10px] opacity-75 leading-relaxed">
                            Your data is encrypted and handled according to DPDP Act 2023 standards.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
