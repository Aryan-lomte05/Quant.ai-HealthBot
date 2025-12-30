"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Target, Trophy, Flame, Edit } from "lucide-react";
import { useTracking } from "@/context/TrackingContext";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export function GoalTracker() {
    const { state, updateGoals } = useTracking();
    const { metrics, goals } = state;
    const { steps, water, sleep } = metrics;

    const [isEditing, setIsEditing] = useState(false);
    const [tempGoals, setTempGoals] = useState(goals);

    // Calculate percentages
    const stepsProgress = Math.min((steps / goals.steps) * 100, 100);
    const waterProgress = Math.min((water / goals.water) * 100, 100);
    const sleepProgress = Math.min((sleep / goals.sleep) * 100, 100);

    // Mock streak based on comprehensive engagement (simple logic)
    const streak = steps >= (goals.steps * 0.5) && water >= (goals.water * 0.5) ? 5 : 4;

    const handleSave = () => {
        updateGoals(tempGoals);
        setIsEditing(false);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-500" />
                    Weekly Goals
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setTempGoals(goals); setIsEditing(true); }}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        title="Edit Goals"
                    >
                        <Edit className="h-3.5 w-3.5" />
                    </button>
                    <div className="bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                        <span className="text-xs font-bold text-orange-700">{streak} Day Streak</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-700">Walk {goals.steps.toLocaleString()} Steps</span>
                        <span className="text-indigo-600 font-bold">{Math.round(stepsProgress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stepsProgress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-indigo-500 rounded-full"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-700">Drink {goals.water} Glasses Water</span>
                        <span className="text-blue-600 font-bold">{Math.round(waterProgress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${waterProgress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-blue-500 rounded-full"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-700">Sleep {goals.sleep}hrs Avg</span>
                        <span className="text-purple-600 font-bold">{Math.round(sleepProgress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sleepProgress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-purple-500 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Edit Goals Modal */}
            <AnimatePresence>
                {isEditing && (
                    <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Daily Goals">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Daily Steps Goal</label>
                                <input
                                    type="number"
                                    value={tempGoals.steps}
                                    onChange={(e) => setTempGoals({ ...tempGoals, steps: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Daily Water Goal (Glasses)</label>
                                <input
                                    type="number"
                                    value={tempGoals.water}
                                    onChange={(e) => setTempGoals({ ...tempGoals, water: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Daily Sleep Goal (Hours)</label>
                                <input
                                    type="number"
                                    value={tempGoals.sleep}
                                    onChange={(e) => setTempGoals({ ...tempGoals, sleep: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                Save Goals
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
