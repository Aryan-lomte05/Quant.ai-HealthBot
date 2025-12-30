"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pill, Check, Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTracking } from "@/context/TrackingContext";
import { Modal } from "@/components/ui/Modal";

export function MedicationManager() {
    const { state, toggleMedication, addMedication } = useTracking();
    const { medications } = state;

    const [isAdding, setIsAdding] = useState(false);
    const [newMed, setNewMed] = useState({ name: "", dose: "", time: "08:00" });

    const handleAdd = () => {
        if (newMed.name && newMed.dose) {
            // Convert time to AM/PM format for display
            const [hours, minutes] = newMed.time.split(':');
            const h = parseInt(hours);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const displayH = h % 12 || 12;
            const displayTime = `${displayH}:${minutes} ${ampm}`;

            addMedication({ name: newMed.name, dose: newMed.dose, time: displayTime });
            setNewMed({ name: "", dose: "", time: "08:00" });
            setIsAdding(false);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Pill className="h-5 w-5 text-purple-500" />
                    Medications
                </h3>
                <button
                    onClick={() => setIsAdding(true)}
                    className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            <div className="space-y-3">
                {medications.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No medications added yet.</p>
                )}

                <AnimatePresence>
                    {medications.map(med => (
                        <motion.div
                            key={med.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${med.taken
                                ? "bg-purple-50/50 border-purple-100 opacity-70"
                                : "bg-white border-gray-100 hover:border-purple-200 shadow-sm"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${med.taken ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-400"}`}>
                                    <Pill className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${med.taken ? "text-gray-500 line-through" : "text-gray-900"}`}>{med.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{med.dose}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {med.time}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleMedication(med.id)}
                                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all ${med.taken
                                    ? "bg-purple-500 border-purple-500 text-white"
                                    : "border-gray-200 text-transparent hover:border-purple-300"
                                    }`}
                            >
                                <Check className="h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">Total: {medications.length} | Taken: {medications.filter(m => m.taken).length}</p>
            </div>

            {/* Add Medication Modal */}
            <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add New Medication">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Medication Name</label>
                        <input
                            value={newMed.name}
                            onChange={e => setNewMed({ ...newMed, name: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g. Aspirin"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Dossage</label>
                            <input
                                value={newMed.dose}
                                onChange={e => setNewMed({ ...newMed, dose: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g. 100mg"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Time</label>
                            <input
                                type="time"
                                value={newMed.time}
                                onChange={e => setNewMed({ ...newMed, time: e.target.value })}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={!newMed.name || !newMed.dose}
                        className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        Add Medication
                    </button>
                </div>
            </Modal>
        </motion.div>
    );
}
