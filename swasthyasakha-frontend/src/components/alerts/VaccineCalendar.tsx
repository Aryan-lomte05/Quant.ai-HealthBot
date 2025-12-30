"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Bell, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

export function VaccineCalendar() {
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    // December 2025 Grid Generation
    // Dec 1 is Monday. Previous month (Nov) ends on Sunday 30th.
    // So row 1: Sun (30 Nov - dimmed), Mo (1), Tu (2)...

    // Days constant
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Calendar matrix for Dec 2025 (matching the image structure)
    // 30 (Nov), 1, 2, 3, 4, 5, 6
    const calendarDays = [
        { day: 30, type: "prev" }, { day: 1, type: "curr" }, { day: 2, type: "curr" }, { day: 3, type: "curr" }, { day: 4, type: "curr" }, { day: 5, type: "curr" }, { day: 6, type: "curr" },
        { day: 7, type: "curr" }, { day: 8, type: "curr" }, { day: 9, type: "curr" }, { day: 10, type: "curr" }, { day: 11, type: "curr" }, { day: 12, type: "curr" }, { day: 13, type: "curr" },
        { day: 14, type: "curr" }, { day: 15, type: "curr" }, { day: 16, type: "curr" }, { day: 17, type: "curr" }, { day: 18, type: "curr" }, { day: 19, type: "curr" }, { day: 20, type: "curr" },
        { day: 21, type: "curr" }, { day: 22, type: "curr" }, { day: 23, type: "curr" }, { day: 24, type: "curr" }, { day: 25, type: "curr" }, { day: 26, type: "curr" }, { day: 27, type: "curr" },
        { day: 28, type: "curr" }, { day: 29, type: "curr" }, { day: 30, type: "selected" }, { day: 31, type: "curr" }, { day: 1, type: "next" }, { day: 2, type: "next" }, { day: 3, type: "next" },
        { day: 4, type: "next" }, { day: 5, type: "next" }, { day: 6, type: "next" }, { day: 7, type: "next" }, { day: 8, type: "next" }, { day: 9, type: "next" }, { day: 10, type: "next" },
    ];

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 shadow-lg flex flex-col"
        >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 px-4 py-3 border-b border-gray-100/50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-700">Tuesday, 30 December</h3>
                    <button className="p-1 hover:bg-white/50 rounded-lg transition-colors border border-transparent hover:border-gray-200/50">
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">December, 2025</span>
                    <div className="flex gap-0.5">
                        <button className="p-0.5 hover:bg-white/50 rounded-md text-slate-500 transition-colors">
                            <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-0.5 hover:bg-white/50 rounded-md text-slate-500 transition-colors">
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="px-4 py-2 flex flex-col justify-center">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-1">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-[10px] font-bold text-slate-500 py-1">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-0.5">
                    {calendarDays.map((date, i) => (
                        <div key={i} className="flex justify-center items-center aspect-square">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                                    ${date.type === 'selected'
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                        : date.type === 'curr'
                                            ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                            : 'text-slate-300'
                                    }
                                `}
                            >
                                {date.day}
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reminder Toggle (Footer) */}
            <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-colors ${remindersEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                        <Bell className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Sync Reminders</span>
                </div>

                <button
                    onClick={() => setRemindersEnabled(!remindersEnabled)}
                    className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${remindersEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}
                >
                    <motion.div
                        animate={{ x: remindersEnabled ? 18 : 2 }}
                        className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                    />
                </button>
            </div>
        </motion.div>
    );
}
