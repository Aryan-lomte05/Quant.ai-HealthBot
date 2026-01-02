"use client";

import { motion } from "framer-motion";
import { Trophy, CheckCircle2, MapPin } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const leaderboardData = {
    weekly: [
        { id: 1, name: "Priya S.", points: 1250, avatar: "PS", color: "bg-purple-100 text-purple-600", location: "Mumbai", streak: 12 },
        { id: 2, name: "Rahul V.", points: 1100, avatar: "RV", color: "bg-blue-100 text-blue-600", location: "Delhi", streak: 8 },
        { id: 3, name: "Amit K.", points: 950, avatar: "AK", color: "bg-orange-100 text-orange-600", location: "Bangalore", streak: 5 },
    ],
    monthly: [
        { id: 1, name: "Rahul V.", points: 4500, avatar: "RV", color: "bg-blue-100 text-blue-600", location: "Delhi", streak: 15 },
        { id: 2, name: "Priya S.", points: 4100, avatar: "PS", color: "bg-purple-100 text-purple-600", location: "Mumbai", streak: 20 },
        { id: 3, name: "Sneha M.", points: 3800, avatar: "SM", color: "bg-pink-100 text-pink-600", location: "Pune", streak: 25 },
    ]
};

export function Leaderboards() {
    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
    const [selectedUser, setSelectedUser] = useState<any>(null);

    return (
        <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Leaderboard
                    </h3>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {(['weekly', 'monthly'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === tab ? "bg-white text-emerald-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {leaderboardData[activeTab].map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedUser(user)}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className={`font-bold text-lg w-6 text-center ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-700"
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className={`h-10 w-10 rounded-full ${user.color} flex items-center justify-center font-bold text-sm`}>
                                    {user.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">Global Rank #{index + 142}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-600">{user.points}</span>
                                <span className="text-[10px] text-gray-400 uppercase font-medium">pts</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 font-medium">You are ranked <span className="text-emerald-600 font-bold">#24</span> this week</p>
                </div>
            </div>

            <Modal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title="Player Profile"
            >
                {selectedUser && (
                    <div className="flex flex-col items-center">
                        <div className={`h-24 w-24 rounded-full ${selectedUser.color} flex items-center justify-center text-2xl font-bold mb-4`}>
                            {selectedUser.avatar}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{selectedUser.name}</h4>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-6">
                            <MapPin className="h-4 w-4" /> {selectedUser.location}
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full mb-6">
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Points</p>
                                <p className="text-xl font-bold text-emerald-600">{selectedUser.points}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Streak</p>
                                <p className="text-xl font-bold text-orange-500">{selectedUser.streak} Days</p>
                            </div>
                        </div>

                    </div>
                )}
            </Modal >
        </>
    );
}
