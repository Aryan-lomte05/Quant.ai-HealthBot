"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight, Target, Trophy } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const initialChallenges = [
    {
        id: 1,
        title: "10k Steps Daily",
        participants: 12540,
        daysLeft: 5,
        joined: true,
        progress: 75,
        color: "from-blue-500 to-indigo-600",
        icon: Target,
        desc: "Walk 10,000 steps every day to keep your heart healthy."
    },
    {
        id: 2,
        title: "Hydration Hero",
        participants: 8300,
        daysLeft: 12,
        joined: false,
        progress: 0,
        color: "from-cyan-400 to-blue-500",
        icon: Users,
        desc: "Drink 8 glasses of water daily for better skin and energy."
    }
];

export function CommunityChallenges() {
    const [challenges, setChallenges] = useState(initialChallenges);
    const [selectedChallenge, setSelectedChallenge] = useState<typeof initialChallenges[0] | null>(null);

    const handleJoin = (id: number) => {
        setChallenges(prev => prev.map(c =>
            c.id === id ? { ...c, joined: true, progress: 0 } : c
        ));
        setSelectedChallenge(null);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-emerald-950">Active Challenges</h3>
                    <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                        View All <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {challenges.map((challenge, i) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white shadow-lg`}>
                                    <challenge.icon className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                    {challenge.daysLeft} days left
                                </span>
                            </div>

                            <h4 className="font-bold text-gray-900 mb-1">{challenge.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                <Users className="h-3 w-3" />
                                <span>{challenge.participants.toLocaleString()} joined</span>
                            </div>

                            {challenge.joined ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-emerald-600">In Progress</span>
                                        <span className="text-emerald-600">{challenge.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${challenge.progress}%` }}
                                            className={`h-full bg-gradient-to-r ${challenge.color}`}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSelectedChallenge(challenge)}
                                    className="w-full py-2 rounded-lg border border-emerald-200 text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-colors"
                                >
                                    Join Challenge
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedChallenge}
                onClose={() => setSelectedChallenge(null)}
                title="Join Challenge"
            >
                {selectedChallenge && (
                    <div className="text-center">
                        <div className={`h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br ${selectedChallenge.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                            <Trophy className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedChallenge.title}</h4>
                        <p className="text-gray-500 mb-6">{selectedChallenge.desc}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedChallenge(null)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleJoin(selectedChallenge.id)}
                                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700"
                            >
                                Confirm Join
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
