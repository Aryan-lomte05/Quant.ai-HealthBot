"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Footprints, Moon, Droplets, Plus, Minus, Edit2, X } from "lucide-react";
import { useState } from "react";
import { useTracking } from "@/context/TrackingContext";
import { Modal } from "@/components/ui/Modal";

export function LifestyleTracker() {
    const { state, updateMetrics } = useTracking();
    const { steps, water, sleep } = state.metrics;
    const [editingSteps, setEditingSteps] = useState(false);
    const [tempSteps, setTempSteps] = useState(steps.toString());

    const handleStepSave = () => {
        const val = parseInt(tempSteps.replace(/,/g, ''));
        if (!isNaN(val)) {
            updateMetrics('steps', val);
        }
        setEditingSteps(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Steps Card */}
            <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-orange-50 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                <Footprints className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-gray-700">Steps</h3>
                        </div>
                        <button
                            onClick={() => { setTempSteps(steps.toString()); setEditingSteps(true); }}
                            className="p-1.5 rounded-lg bg-orange-50 text-orange-400 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-gray-900">{steps.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">/ 10,000</span>
                    </div>
                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
                            className="h-full bg-orange-500 rounded-full"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Edit Steps Modal */}
            <AnimatePresence>
                {editingSteps && (
                    <Modal isOpen={editingSteps} onClose={() => setEditingSteps(false)} title="Edit Daily Steps">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-gray-500">Enter your manually tracked steps if you are not using a synced device.</p>
                            <input
                                type="number"
                                value={tempSteps}
                                onChange={(e) => setTempSteps(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="e.g. 5000"
                            />
                            <button
                                onClick={handleStepSave}
                                className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
                            >
                                Update Steps
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            {/* Sleep Card */}
            <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-50 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <Moon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-gray-700">Sleep</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-extrabold text-gray-900">{sleep} <span className="text-sm font-normal text-gray-500">hrs</span></span>
                        <div className="flex gap-2">
                            <button onClick={() => updateMetrics('sleep', Math.max(0, sleep - 0.5))} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Minus className="h-4 w-4" /></button>
                            <button onClick={() => updateMetrics('sleep', sleep + 0.5)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Plus className="h-4 w-4" /></button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Water Card */}
            <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Droplets className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-gray-700">Water</h3>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => updateMetrics('water', Math.max(0, water - 1))} className="p-1.5 rounded-lg bg-blue-50 text-blue-400 hover:bg-blue-100 hover:text-blue-600 transition-colors"><Minus className="h-3 w-3" /></button>
                            <button onClick={() => updateMetrics('water', water + 1)} className="p-1.5 rounded-lg bg-blue-50 text-blue-400 hover:bg-blue-100 hover:text-blue-600 transition-colors"><Plus className="h-3 w-3" /></button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-gray-900">{water}</span>
                            <span className="text-sm text-gray-500">/ 8</span>
                        </div>
                    </div>

                    <div className="mt-3 flex gap-1 h-8 items-end">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 rounded-t-sm transition-all duration-300 ${i < water ? 'bg-blue-400 h-full' : 'bg-blue-100 h-2'}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
