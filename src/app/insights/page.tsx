"use client";

import { motion, Variants, useInView } from "framer-motion";
import { DashboardStats } from "@/components/insights/DashboardStats";
import { HeatmapSection } from "@/components/insights/HeatmapSection";
import { TrendCharts } from "@/components/insights/TrendCharts";
import { ImpactStories } from "@/components/insights/ImpactStories";
import { ExplainabilityPanel } from "@/components/insights/ExplainabilityPanel";
import { ModelHistory } from "@/components/insights/ModelHistory";
import { TransparencySection } from "@/components/insights/TransparencySection";
import { BarChart3, Brain } from "lucide-react";
import { useEffect, useRef } from "react";
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

// Scroll-triggered section component - NO LAG!
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{
                duration: 1.2,
                delay,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 60,
                damping: 20
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}


export default function InsightsPage() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.3
            }
        }
    };

    const item: Variants = {
        hidden: { y: 60, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 1.2
            }
        }
    };

    return (
        <SmoothScroll>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">

                {/* Main Content */}
                <div className="relative z-20 max-w-7xl mx-auto space-y-16 pb-24 px-4 pt-12">
                    {/* Premium Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-200/50 pb-10">
                            <div className="flex-1">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-300/30 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm cursor-pointer"
                                >
                                    <BarChart3 className="h-4 w-4" />
                                    Open Data Portal
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-700 bg-clip-text text-transparent tracking-tight leading-tight"
                                >
                                    Data & Transparency
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 1 }}
                                    className="text-lg text-cyan-700/80 max-w-2xl mt-4 leading-relaxed font-medium"
                                >
                                    We believe in ethical AI. Explore our public health impact, understand our model's logic, and verify our funding sources.
                                </motion.p>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                                className="text-right hidden md:block bg-white/60 rounded-2xl px-6 py-4 border border-cyan-200/50 shadow-sm cursor-pointer"
                            >
                                <p className="text-sm font-bold text-cyan-900">Last Updated</p>
                                <p className="text-sm font-mono text-cyan-600/80 mt-1">Dec 30, 2025 • 14:00 IST</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-16"
                    >
                        {/* KPI Cards - Scroll Triggered */}
                        <AnimatedSection>
                            <motion.div
                                variants={item}
                                whileHover={{
                                    y: -8,
                                    transition: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                            >
                                <DashboardStats />
                            </motion.div>
                        </AnimatedSection>

                        {/* Visualizations Grid - Scroll Triggered with Stagger */}
                        <AnimatedSection delay={0.2}>
                            <div className="grid lg:grid-cols-3 gap-8 lg:items-stretch">
                                <motion.div
                                    variants={item}
                                    className="lg:col-span-2 flex"
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <HeatmapSection />
                                </motion.div>
                                <motion.div
                                    variants={item}
                                    className="lg:col-span-1 flex"
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <TrendCharts />
                                </motion.div>
                            </div>
                        </AnimatedSection>

                        {/* Section Divider */}
                        <AnimatedSection delay={0.1}>
                            <motion.div
                                variants={item}
                                className="relative h-px"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
                            </motion.div>
                        </AnimatedSection>

                        {/* Explainability Section - Scroll Triggered */}
                        <AnimatedSection delay={0.2}>
                            <motion.div variants={item} className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1 space-y-4">
                                    <motion.div
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/50 border border-cyan-200/50 text-cyan-700 text-xs font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Brain className="h-3.5 w-3.5" />
                                        AI Explainability
                                    </motion.div>
                                    <h2 className="text-3xl md:text-4xl font-black text-cyan-900 leading-tight">
                                        Inside the Black Box
                                    </h2>
                                    <p className="text-cyan-700/80 leading-relaxed text-base">
                                        Artificial Intelligence shouldn't be a mystery. Here is exactly how SwasthyaSakha processes your data to provide recommendations.
                                    </p>
                                </div>
                                <motion.div
                                    className="lg:col-span-2"
                                    whileHover={{
                                        y: -8,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <ExplainabilityPanel />
                                </motion.div>
                            </motion.div>
                        </AnimatedSection>

                        {/* Section Divider */}
                        <AnimatedSection delay={0.1}>
                            <motion.div
                                variants={item}
                                className="relative h-px"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
                            </motion.div>
                        </AnimatedSection>

                        {/* Impact & History - Scroll Triggered */}
                        <AnimatedSection delay={0.2}>
                            <div className="grid lg:grid-cols-2 gap-8">
                                <motion.div
                                    variants={item}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <ImpactStories />
                                </motion.div>
                                <motion.div
                                    variants={item}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <ModelHistory />
                                </motion.div>
                            </div>
                        </AnimatedSection>

                        {/* Section Divider */}
                        <AnimatedSection delay={0.1}>
                            <motion.div
                                variants={item}
                                className="relative h-px"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
                            </motion.div>
                        </AnimatedSection>

                        {/* Transparency Footer - Scroll Triggered */}
                        <AnimatedSection delay={0.2}>
                            <motion.div
                                variants={item}
                                whileHover={{
                                    y: -8,
                                    transition: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                            >
                                <TransparencySection />
                            </motion.div>
                        </AnimatedSection>
                    </motion.div>
                </div>
            </div>
        </SmoothScroll>
    );
}
