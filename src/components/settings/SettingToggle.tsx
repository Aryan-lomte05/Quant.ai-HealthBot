
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SettingToggleProps {
    label: string;
    description?: string;
    isOn: boolean;
    onToggle: () => void;
    icon?: LucideIcon;
}

export function SettingToggle({ label, description, isOn, onToggle, icon: Icon }: SettingToggleProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-3">
                {Icon && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <div>
                    <h4 className="font-medium text-gray-900">{label}</h4>
                    {description && <p className="text-sm text-gray-500">{description}</p>}
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`relative h-7 w-12 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isOn ? "bg-emerald-500" : "bg-gray-200"
                    }`}
            >
                <motion.div
                    className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
                    animate={{ left: isOn ? "26px" : "2px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
}
