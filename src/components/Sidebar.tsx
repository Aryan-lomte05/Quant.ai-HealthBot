"use client";

import { motion } from "framer-motion";
import {
    Home,
    MessageSquare,
    Compass,
    Activity,
    BarChart3,
    Bell,
    Phone,
    Users,
    Heart,
    Gamepad2,
    Settings,
    X,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/lib/auth";

const navigationSections = [
    {
        title: "MAIN",
        items: [
            { icon: Home, label: "Home", href: "/" },
            { icon: MessageSquare, label: "Chat", href: "/chat" },
            { icon: Compass, label: "Explore", href: "/explore" },
        ],
    },
    {
        title: "HEALTH",
        items: [
            { icon: Activity, label: "Tracking", href: "/tracking" },
            { icon: BarChart3, label: "Insights", href: "/insights" },
            { icon: Bell, label: "Alerts", href: "/alerts" },
            { icon: Phone, label: "Emergency", href: "/emergency" },
        ],
    },
    {
        title: "COMMUNITY",
        items: [
            { icon: Users, label: "Community", href: "/community" },
            { icon: Heart, label: "Family", href: "/family" },
            { icon: Gamepad2, label: "Engage", href: "/engage" },
        ],
    },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    return (
        <div className="h-screen bg-white border-r border-emerald-100 flex flex-col" style={{ width: "280px" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                        <span className="text-white text-lg">🩺</span>
                    </div>
                    <h1 className="text-gray-900 font-bold text-lg">SwasthyaSakha</h1>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {navigationSections.map((section) => (
                    <div key={section.title}>
                        {/* Section Header */}
                        <div className="px-2 mb-3">
                            <h3 className="text-[11px] font-bold tracking-wider text-emerald-500 uppercase">
                                {section.title}
                            </h3>
                        </div>

                        {/* Section Items */}
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link key={item.label} href={item.href}>
                                        <motion.div
                                            whileHover={{ x: 2 }}
                                            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${isActive
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {/* Icon */}
                                            <Icon
                                                className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive
                                                    ? "text-emerald-500"
                                                    : "text-teal-500 group-hover:text-emerald-500"
                                                    }`}
                                            />

                                            {/* Label */}
                                            <span className={`text-[15px] font-medium transition-colors ${isActive ? "text-gray-900" : "group-hover:text-gray-900"
                                                }`}>
                                                {item.label}
                                            </span>

                                            {/* Active Dot */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeDot"
                                                    className="ml-auto w-2 h-2 rounded-full bg-emerald-500"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Additional Bottom Items */}
                <div className="space-y-0.5 pt-2 border-t border-emerald-50">
                    <Link href="/settings">
                        <motion.div
                            whileHover={{ x: 2 }}
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-600 hover:bg-gray-50 transition-all"
                        >
                            <Settings className="w-5 h-5 text-teal-500 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-[15px] font-medium group-hover:text-gray-900">Settings</span>
                        </motion.div>
                    </Link>


                    {/* Logout Button */}
                    <button onClick={handleLogout}>
                        <motion.div
                            whileHover={{ x: 2 }}
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-600 hover:bg-red-50 transition-all"
                        >
                            <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" />
                            <span className="text-[15px] font-medium group-hover:text-red-600">Logout</span>
                        </motion.div>
                    </button>
                </div>
            </nav>

            {/* User Profile - Fixed at Bottom */}
            <div className="border-t border-emerald-50 p-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-semibold truncate">John Doe</p>
                        <p className="text-emerald-600 text-xs font-medium">Premium Plan</p>
                    </div>
                    <Settings className="w-4 h-4 text-gray-400 hover:text-emerald-500 transition-colors flex-shrink-0" />
                </div>
            </div>
        </div>
    );
}
