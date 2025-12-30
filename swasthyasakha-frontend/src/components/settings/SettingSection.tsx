import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SettingSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function SettingSection({ title, description, children, className = "", delay = 0 }: SettingSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay, ease: "easeOut" }}
            className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </motion.section>
    );
}
