"use client";

import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { DashboardStats } from "@/components/insights/DashboardStats";
import { HeatmapSection } from "@/components/insights/HeatmapSection";
import { TrendCharts } from "@/components/insights/TrendCharts";
import { ImpactStories } from "@/components/insights/ImpactStories";
import { ExplainabilityPanel } from "@/components/insights/ExplainabilityPanel";
import { ModelHistory } from "@/components/insights/ModelHistory";
import { TransparencySection } from "@/components/insights/TransparencySection";
import { BarChart3, TrendingUp, Brain, Shield, Activity, Database } from "lucide-react";
import { useRef, useEffect } from "react";
import Lenis from "lenis";

// --- Smooth Scroll Provider ---
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};


export default function InsightsPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Zoom Animation for Header
    const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const headerOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);



    // Floating icons animation
    const icon1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const icon2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const icon3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const icon4Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const icon5Y = useTransform(scrollYProgress, [0, 1], [0, -90]);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const item: Variants = {
        hidden: { y: 40, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    };

    return (
        <SmoothScroll>
            <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                {/* Floating Decorative Icons - Scroll Animated */}
                {/* Floating Decorative Icons - Optimized Count & Animation */}
                {/* Icon 1 */}
                <motion.div
                    className="fixed top-20 left-[10%] z-10 pointer-events-none will-change-transform"
                    style={{ y: icon1Y }}
                >
                    <div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-400/10 backdrop-blur-[2px] flex items-center justify-center border border-white/10"
                    >
                        <Activity className="w-8 h-8 text-emerald-600/50" />
                    </div>
                </motion.div>

                {/* Icon 2 */}
                <motion.div
                    className="fixed top-40 right-[8%] z-10 pointer-events-none will-change-transform"
                    style={{ y: icon2Y }}
                >
                    <div
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-400/10 to-cyan-400/10 backdrop-blur-[2px] flex items-center justify-center border border-white/10"
                    >
                        <Brain className="w-10 h-10 text-teal-600/50" />
                    </div>
                </motion.div>

                {/* Icon 3 - Removed others for performance */}
                <motion.div
                    className="fixed top-[60%] left-[5%] z-10 pointer-events-none will-change-transform"
                    style={{ y: icon3Y }}
                >
                    <div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 backdrop-blur-[2px] flex items-center justify-center border border-white/10"
                    >
                        <Database className="w-7 h-7 text-cyan-600/50" />
                    </div>
                </motion.div>



                {/* Main Content */}
                <div className="relative z-20 max-w-7xl mx-auto space-y-16 pb-24 px-4 pt-12">
                    {/* Premium Header with Zoom Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ scale: headerScale, opacity: headerOpacity, y: headerY }}
                        className="relative will-change-transform"
                    >
                        {/* Header Background Glow */}
                        <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl blur-2xl" />

                        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-200/50 pb-10">
                            <div className="flex-1">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/30 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm"
                                >
                                    <BarChart3 className="h-4 w-4" />
                                    Open Data Portal
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-tight leading-tight"
                                >
                                    Data & Transparency
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-emerald-700/80 max-w-2xl mt-4 leading-relaxed font-medium"
                                >
                                    We believe in ethical AI. Explore our public health impact, understand our model's logic, and verify our funding sources.
                                </motion.p>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-right hidden md:block backdrop-blur-sm bg-white/40 rounded-2xl px-6 py-4 border border-emerald-200/50 shadow-sm"
                            >
                                <p className="text-sm font-bold text-emerald-900">Last Updated</p>
                                <p className="text-sm font-mono text-emerald-600/80 mt-1">Dec 30, 2025 • 14:00 IST</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-16"
                    >
                        {/* KPI Cards */}
                        <motion.div variants={item}>
                            <DashboardStats />
                        </motion.div>

                        {/* Visualizations Grid - Aligned Heights */}
                        <div className="grid lg:grid-cols-3 gap-8 lg:items-stretch">
                            <motion.div variants={item} className="lg:col-span-2 flex">
                                <HeatmapSection />
                            </motion.div>
                            <motion.div variants={item} className="lg:col-span-1 flex">
                                <TrendCharts />
                            </motion.div>
                        </div>

                        {/* Section Divider */}
                        <motion.div
                            variants={item}
                            className="relative h-px"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
                        </motion.div>

                        {/* Explainability Section with Premium Layout */}
                        <motion.div variants={item} className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200/50 text-emerald-700 text-xs font-semibold">
                                    <Brain className="h-3.5 w-3.5" />
                                    AI Explainability
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-emerald-900 leading-tight">
                                    Inside the Black Box
                                </h2>
                                <p className="text-emerald-700/80 leading-relaxed text-base">
                                    Artificial Intelligence shouldn't be a mystery. Here is exactly how SwasthyaSakha processes your data to provide recommendations.
                                </p>
                            </div>
                            <div className="lg:col-span-2">
                                <ExplainabilityPanel />
                            </div>
                        </motion.div>

                        {/* Section Divider */}
                        <motion.div
                            variants={item}
                            className="relative h-px"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
                        </motion.div>

                        {/* Impact & History with Enhanced Cards */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <motion.div variants={item}>
                                <ImpactStories />
                            </motion.div>
                            <motion.div variants={item}>
                                <ModelHistory />
                            </motion.div>
                        </div>

                        {/* Section Divider */}
                        <motion.div
                            variants={item}
                            className="relative h-px"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
                        </motion.div>

                        {/* Transparency Footer */}
                        <motion.div variants={item}>
                            <TransparencySection />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </SmoothScroll>
    );
}
