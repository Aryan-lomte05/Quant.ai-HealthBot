"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Calendar, Activity, TrendingUp, Smile, Sparkles } from "lucide-react";
import { LifestyleTracker } from "@/components/tracking/LifestyleTracker";
import { SymptomLogger } from "@/components/tracking/SymptomLogger";
import { MedicationManager } from "@/components/tracking/MedicationManager";
import { WellnessCheckin } from "@/components/tracking/WellnessCheckin";
import { GoalTracker } from "@/components/tracking/GoalTracker";
import { HealthReports } from "@/components/tracking/HealthReports";
import { TrackingProvider } from "@/context/TrackingContext";
import { Modal } from "@/components/ui/Modal";

import Lenis from "lenis";

import { useState, useEffect } from "react";

// --- Smooth Scroll Provider ---
const SmoothScroll = ({ children, deps }: { children: React.ReactNode, deps?: any[] }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 2,
            autoResize: false, // Manual resize handling
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Force resize when dependencies (tabs) change, with a delay for animations
        const timeout = setTimeout(() => {
            lenis.resize();
        }, 500); // Wait for the 400ms transition + buffer

        return () => {
            clearTimeout(timeout);
            lenis.destroy();
        };
    }, deps || []); // Re-initialize or re-calc when deps change

    return <>{children}</>;
};

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function TrackingPage() {
    return (
        <TrackingProvider>
            <TrackingContent />
        </TrackingProvider>
    );
}

function TrackingContent() {
    const [activeTab, setActiveTab] = useState<'daily' | 'insights' | 'wellness'>('daily');
    const [showTips, setShowTips] = useState(false);

    // Scroll progress for the bar (needs to be inside content now since we moved Provider up? 
    // Actually, we can keep the separate hook usage or move SmoothScroll here.)
    // Let's wrap the whole content in SmoothScroll here to access state.

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001
    });

    const tabs = [
        { id: 'daily', label: 'Daily Tracking', icon: Activity },
        { id: 'insights', label: 'Insights & Goals', icon: TrendingUp },
        { id: 'wellness', label: 'Wellness & Tips', icon: Smile },
    ];

    return (
        <SmoothScroll deps={[activeTab]}>
            <div className="min-h-screen bg-gray-50 pb-24 md:pb-8 pt-12 text-gray-900 px-4 md:px-8">
                {/* Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 origin-[0%] z-50"
                    style={{ scaleX }}
                />

                <motion.div
                    className="max-w-4xl mx-auto space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Header */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Health Tracking</h1>
                            <p className="text-gray-500 mt-1">Focus on what matters most to you today.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </motion.div>

                    {/* Tab Navigation */}
                    <motion.div variants={itemVariants} className="flex p-1 bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-4 z-10">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                        ? "bg-gray-900 text-white shadow-md scale-105"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden md:inline">{tab.label}</span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Content Area - Deck Shuffle Animation */}
                    <div className="relative min-h-screen"> {/* Valid scroll container */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'daily' && (
                                <motion.div
                                    key="daily"
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6 pb-20"
                                >
                                    <LifestyleTracker />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <SymptomLogger />
                                        <MedicationManager />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'insights' && (
                                <motion.div
                                    key="insights"
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6 pb-20"
                                >
                                    <GoalTracker />
                                    <HealthReports />
                                    {/* Spacer to ensure scrollability if content is short */}
                                    <div className="h-24 md:h-0" />
                                </motion.div>
                            )}

                            {activeTab === 'wellness' && (
                                <motion.div
                                    key="wellness"
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6 pb-20"
                                >
                                    <WellnessCheckin />

                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-8 text-white text-center relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-16 -mt-16" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                                                💡
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">Daily Health Insights</h3>
                                            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
                                                Small changes lead to big results. Explore our curated library of health tips tailored for your well-being.
                                            </p>
                                            <button
                                                onClick={() => setShowTips(true)}
                                                className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2"
                                            >
                                                <Sparkles className="h-4 w-4 text-indigo-600" />
                                                Read Today's Tips
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Health Tips Modal */}
                    <Modal isOpen={showTips} onClose={() => setShowTips(false)} title="Health Tips & Insights">
                        <div className="space-y-4">
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <h4 className="font-bold text-orange-800 mb-1">Stay Hydrated</h4>
                                <p className="text-sm text-gray-600">Drinking water before meals can help you feel fuller and aid in weight management. Aim for a glass 30 mins before eating.</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                <h4 className="font-bold text-purple-800 mb-1">Better Sleep</h4>
                                <p className="text-sm text-gray-600">Try to avoid screens 1 hour before bed. The blue light suppresses melatonin, making it harder to fall asleep.</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                <h4 className="font-bold text-green-800 mb-1">Mental Wellness</h4>
                                <p className="text-sm text-gray-600">Taking 5 minutes to practice deep breathing can significantly lower cortisol levels (stress hormone).</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                <p className="text-xs text-gray-400 italic">More personalized tips based on your logs are coming soon!</p>
                            </div>
                        </div>
                    </Modal>
                </motion.div>
            </div>
        </SmoothScroll>
    );
}
