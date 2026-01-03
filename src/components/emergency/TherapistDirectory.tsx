"use client";

import { Search, MapPin, User, MessageCircle } from "lucide-react";

export function TherapistDirectory() {
    const therapists = [
        {
            id: 1,
            name: "Dr. Anjali Gupta",
            specialty: "Trauma & Crisis Specialist",
            city: "Mumbai",
            available: true,
        },
        {
            id: 2,
            name: "Dr. Rahul Sharma",
            specialty: "Anxiety & Depression",
            city: "Pune",
            available: true,
        },
        {
            id: 3,
            name: "Dr. Priya Singh",
            specialty: "Clinical Psychologist",
            city: "Online",
            available: false,
        },
    ];

    return (
        <div className="space-y-5 p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800">Find a Therapist</h2>
                <button className="text-sm text-indigo-600 font-medium hover:underline flex-shrink-0">
                    View All
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by city or specialty..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-gray-400 text-sm"
                />
            </div>

            <div className="space-y-3">
                {therapists.map((therapist) => (
                    <div
                        key={therapist.id}
                        className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4 group hover:border-indigo-100 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors flex-shrink-0">
                                <User className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm truncate">
                                    {therapist.name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {therapist.specialty}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">{therapist.city}</span>
                                </div>
                            </div>
                        </div>

                        <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors flex-shrink-0">
                            <MessageCircle className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
