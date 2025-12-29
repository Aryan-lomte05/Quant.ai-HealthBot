"use client";

import { motion } from "framer-motion";
import { Brain, ChevronRight, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const quizzes = [
    { id: 1, title: "Diabetes Management", questions: 10, time: "5 min", completed: true, score: "8/10", color: "bg-emerald-100 text-emerald-600" },
    { id: 2, title: "Heart Health Basics", questions: 8, time: "4 min", completed: false, score: null, color: "bg-red-100 text-red-600" },
    { id: 3, title: "Nutrition Myths", questions: 12, time: "6 min", completed: false, score: null, color: "bg-orange-100 text-orange-600" },
];

const mockQuestions = [
    { q: "Which of these is good for heart health?", options: ["Deep fried food", "Whole Grains", "High sugar drinks"], correct: 1 },
    { q: "What is a healthy blood pressure reading?", options: ["120/80", "160/100", "90/50"], correct: 0 },
    { q: "How much water should you drink daily?", options: ["1 Glass", "8 Glasses", "20 Glasses"], correct: 1 },
];

export function HealthQuizzes() {
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const startQuiz = (quiz: any) => {
        setSelectedQuiz(quiz);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setQuizStarted(false);
    };

    const handleAnswer = (index: number) => {
        if (index === mockQuestions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }

        if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    return (
        <>
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
                            onClick={() => !quiz.completed && startQuiz(quiz)}
                            disabled={quiz.completed}
                            className={`w-full text-left p-4 rounded-xl border ${quiz.completed ? "bg-emerald-50/50 border-emerald-100 cursor-default" : "bg-white border-gray-100 hover:border-indigo-200 cursor-pointer"} transition-all group`}
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

            <Modal
                isOpen={!!selectedQuiz}
                onClose={() => setSelectedQuiz(null)}
                title={selectedQuiz?.title}
            >
                {selectedQuiz && (
                    <div className="min-h-[300px] flex flex-col">
                        {!quizStarted ? (
                            <div className="text-center py-8">
                                <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                                    <Brain className="h-10 w-10" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to start?</h4>
                                <p className="text-gray-500 mb-8">This quiz contains {mockQuestions.length} questions. Good luck!</p>
                                <button
                                    onClick={() => setQuizStarted(true)}
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                                >
                                    Start Now
                                </button>
                            </div>
                        ) : showResult ? (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <span className="text-3xl font-bold text-emerald-600">{score}/{mockQuestions.length}</span>
                                </motion.div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h4>
                                <p className="text-gray-500 mb-8">You showed great knowledge!</p>
                                <button
                                    onClick={() => setSelectedQuiz(null)}
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                                >
                                    Finish
                                </button>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-gray-400 mb-4">
                                        <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
                                        <span className="text-indigo-600">{Math.round(((currentQuestion) / mockQuestions.length) * 100)}% Completed</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                                        <div
                                            className="h-full bg-indigo-600 transition-all duration-300"
                                            style={{ width: `${((currentQuestion) / mockQuestions.length) * 100}%` }}
                                        />
                                    </div>

                                    <h5 className="text-lg font-bold text-gray-900 mb-6">
                                        {mockQuestions[currentQuestion].q}
                                    </h5>

                                    <div className="space-y-3">
                                        {mockQuestions[currentQuestion].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(idx)}
                                                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 font-medium text-gray-700 transition-all"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}
