"use client";

import { motion } from "framer-motion";
import { Brain, ChevronRight, CheckCircle2 } from "lucide-react";

const quizzes = [
    { id: 1, title: "Diabetes Management", questions: 10, time: "5 min", completed: true, score: "8/10" },
    { id: 2, title: "Heart Health Basics", questions: 8, time: "4 min", completed: false, score: null },
    { id: 3, title: "Nutrition Myths", questions: 12, time: "6 min", completed: false, score: null },
];

export function HealthQuizzes() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Daily Quizzes</h3>
            </div>

            <div className="space-y-3">
                {quizzes.map((quiz, i) => (
                    <motion.button
                        key={quiz.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-4 rounded-xl border ${quiz.completed ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-gray-100 hover:border-indigo-200"} transition-all group`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${quiz.completed ? 'bg-emerald-200 text-emerald-800' : 'bg-indigo-100 text-indigo-700'}`}>
                                {quiz.completed ? 'Completed' : 'New'}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">{quiz.time}</span>
                        </div>

                        <h4 className="font-bold text-gray-900 mb-1">{quiz.title}</h4>
                        <p className="text-xs text-gray-500 mb-3">{quiz.questions} Questions</p>

                        <div className="flex items-center justify-between">
                            {quiz.completed ? (
                                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" /> Score: {quiz.score}
                                </span>
                            ) : (
                                <span className="text-sm font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Start Quiz <ChevronRight className="h-4 w-4" />
                                </span>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
