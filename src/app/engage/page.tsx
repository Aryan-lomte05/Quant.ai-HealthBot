"use client";

import { motion } from "framer-motion";
import { BadgeGallery } from "@/components/engage/BadgeGallery";
import { PointsRewards } from "@/components/engage/PointsRewards";
import { Leaderboards } from "@/components/engage/Leaderboards";
import { CommunityChallenges } from "@/components/engage/CommunityChallenges";
import { HealthQuizzes } from "@/components/engage/HealthQuizzes";
import { MiniGames } from "@/components/engage/MiniGames";
import { PatientStories } from "@/components/engage/PatientStories";
import { Podcasts } from "@/components/engage/Podcasts";
import { Documentaries } from "@/components/engage/Documentaries";
import { Infographics } from "@/components/engage/Infographics";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function EngagePage() {
    return (
        <div className="min-h-screen pb-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-6"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-2">
                        Engage & <span className="text-emerald-600 font-serif italic">Thrive</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Track your progress, compete with friends, and explore health content curated just for you.
                    </p>
                </motion.div>

                {/* Top Row: Points & Badges */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <PointsRewards />
                    </motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <BadgeGallery />
                    </motion.div>
                </div>

                {/* Middle Row: Leaderboards & Challenges */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Leaderboards />
                    </motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
                        <CommunityChallenges />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            <HealthQuizzes />
                            <div className="h-full">
                                <MiniGames />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Section Title */}
                <motion.div variants={itemVariants} className="pt-8">
                    <h2 className="text-2xl font-bold text-emerald-950 mb-4">Discover & Learn</h2>
                </motion.div>

                {/* Content Grid: Stories, Podcasts, Docs, Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={itemVariants}>
                        <PatientStories />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Podcasts />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Documentaries />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Infographics />
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}
