"use client";

import { User, Droplet, StickyNote, Phone, AlertCircle } from "lucide-react";

export function MedicalIDCard() {
    // Static placeholder data
    const medicalData = {
        name: "John Doe",
        bloodGroup: "O+",
        allergies: ["Peanuts", "Penicillin"],
        conditions: ["Asthma"],
        emergencyContact: "+91 98765 43210 (Sister)",
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
            <div className="bg-emerald-600 px-6 py-4 flex items-start justify-between">
                <div>
                    <h2 className="text-white text-xl font-bold flex items-center gap-2">
                        <User className="h-5 w-5" /> Medical ID
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1">Show this to first responders</p>
                </div>
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    ID
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                        <p className="font-medium text-gray-900 text-lg">{medicalData.name}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <Droplet className="h-3 w-3 text-red-500" /> Blood Type
                        </label>
                        <p className="font-black text-gray-900 text-2xl">{medicalData.bloodGroup}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                        <label className="text-xs font-semibold text-red-600 uppercase tracking-wider flex items-center gap-1 mb-1">
                            <AlertCircle className="h-3 w-3" /> Allergies
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {medicalData.allergies.map((allergy) => (
                                <span key={allergy} className="px-2 py-1 bg-white rounded-md text-sm font-medium text-red-700 shadow-sm border border-red-100">
                                    {allergy}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <label className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1 mb-1">
                            <StickyNote className="h-3 w-3" /> Conditions
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {medicalData.conditions.map((condition) => (
                                <span key={condition} className="px-2 py-1 bg-white rounded-md text-sm font-medium text-blue-700 shadow-sm border border-blue-100">
                                    {condition}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <Phone className="h-3 w-3" /> Emergency Contact
                    </label>
                    <a href="tel:+919876543210" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                            <Phone className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">+91 98765 43210</p>
                            <p className="text-xs text-gray-500">Sister</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
