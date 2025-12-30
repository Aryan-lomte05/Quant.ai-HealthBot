"use client";

import { motion } from "framer-motion";
import { DashboardStats } from "@/components/insights/DashboardStats";
import { HeatmapSection } from "@/components/insights/HeatmapSection";
import { TrendCharts } from "@/components/insights/TrendCharts";
import { ImpactStories } from "@/components/insights/ImpactStories";
import { ExplainabilityPanel } from "@/components/insights/ExplainabilityPanel";
import { ModelHistory } from "@/components/insights/ModelHistory";
import { TransparencySection } from "@/components/insights/TransparencySection";
import { BarChart3 } from "lucide-react";

export default function InsightsPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-24 px-4 pt-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8"
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <BarChart3 className="h-4 w-4" />
                        Open Data Portal
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Data & Transparency
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mt-3 leading-relaxed">
                        We believe in ethical AI. Explore our public health impact, understand our model's logic, and verify our funding sources.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-gray-900">Last Updated</p>
                    <p className="text-sm font-mono text-gray-500">Dec 30, 2025 • 14:00 IST</p>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-12"
            >
                {/* KPI Cards */}
                <motion.div variants={item}>
                    <DashboardStats />
                </motion.div>

                {/* Visualizations Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <motion.div variants={item} className="lg:col-span-2">
                        <HeatmapSection />
                    </motion.div>
                    <motion.div variants={item} className="lg:col-span-1">
                        <TrendCharts />
                    </motion.div>
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* Explainability Section */}
                <motion.div variants={item} className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Inside the Black Box</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Artificial Intelligence shouldn't be a mystery. Here is exactly how SwasthyaSakha processes your data to provide recommendations.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ExplainabilityPanel />
                    </div>
                </motion.div>

                <div className="w-full h-px bg-gray-100" />

                {/* Impact & History */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div variants={item}>
                        <ImpactStories />
                    </motion.div>
                    <motion.div variants={item}>
                        <ModelHistory />
                    </motion.div>
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* Transparency Footer */}
                <motion.div variants={item}>
                    <TransparencySection />
                </motion.div>
            </motion.div>
        </div>
    );
}
