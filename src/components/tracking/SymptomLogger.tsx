"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Thermometer, Zap, AlertCircle, Save, Plus, History, Calendar } from "lucide-react";
import { useState } from "react";
import { useTracking } from "@/context/TrackingContext";
import { Modal } from "@/components/ui/Modal";

const commonSymptomsList = [
    "Headache", "Nausea", "Fatigue", "Cough", "Fever", "Dizziness", "Anxiety", "Insomnia"
];

export function SymptomLogger() {
    const { state, toggleSymptom, setSymptomSeverity, saveDailySymptomLog } = useTracking();
    const { symptoms, symptomSeverity, symptomHistory } = state;

    const [saved, setSaved] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newSymptom, setNewSymptom] = useState("");
    const [customSymptomsList, setCustomSymptomsList] = useState<string[]>([]);

    // History Modal State
    const [showHistory, setShowHistory] = useState(false);

    const handleSave = () => {
        saveDailySymptomLog();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleAddCustom = () => {
        if (newSymptom && !commonSymptomsList.includes(newSymptom) && !customSymptomsList.includes(newSymptom)) {
            setCustomSymptomsList(prev => [...prev, newSymptom]);
            toggleSymptom(newSymptom); // Automatically select it
            setNewSymptom("");
            setIsAdding(false);
        }
    };

    const allDisplaySymptoms = [...commonSymptomsList, ...customSymptomsList];

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-500" />
                    Daily Symptom Log
                </h3>
                <button
                    onClick={() => setShowHistory(true)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                    title="View History"
                >
                    <History className="h-5 w-5" />
                </button>
            </div>

            <div className="mb-6">
                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">What are you feeling today?</label>
                <div className="flex flex-wrap gap-2">
                    {allDisplaySymptoms.map(symptom => (
                        <button
                            key={symptom}
                            onClick={() => toggleSymptom(symptom)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${symptoms.includes(symptom)
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"
                                }`}
                        >
                            {symptom}
                        </button>
                    ))}
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-gray-400 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-600 flex items-center gap-1"
                    >
                        <Plus className="h-3 w-3" /> Add Custom
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Overall Severity</label>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${symptomSeverity < 4 ? "bg-green-100 text-green-700" : symptomSeverity < 7 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        }`}>
                        {symptomSeverity < 4 ? "Mild" : symptomSeverity < 7 ? "Moderate" : "Severe"} ({symptomSeverity}/10)
                    </span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={symptomSeverity}
                    onChange={(e) => { setSymptomSeverity(parseInt(e.target.value)); setSaved(false); }}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1 (Fine)</span>
                    <span>10 (Urgent)</span>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saved}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${saved
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
            >
                {saved ? "Logged Successfully" : <><Save className="h-4 w-4" /> Save Log</>}
            </button>

            {/* Add Custom Symptom Modal */}
            <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Custom Symptom">
                <div className="flex flex-col gap-4">
                    <input
                        value={newSymptom}
                        onChange={(e) => setNewSymptom(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="e.g. Back Pain"
                    />
                    <button
                        onClick={handleAddCustom}
                        disabled={!newSymptom}
                        className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        Add Symptom
                    </button>
                </div>
            </Modal>

            {/* History Modal */}
            <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} title="Symptom History">
                <div className="flex flex-col gap-3">
                    {symptomHistory.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No logged history yet.</p>
                    ) : (
                        symptomHistory.map((log, i) => (
                            <div key={i} className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <Calendar className="h-3 w-3" /> {log.date}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.severity < 4 ? "bg-green-100 text-green-700" : log.severity < 7 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        Severity: {log.severity}/10
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {log.symptoms.map(s => (
                                        <span key={s} className="px-2 py-0.5 bg-white border border-gray-200 rounded-md text-xs text-gray-600">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>
        </motion.div>
    );
}
