import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp, MessageCircle, Send, ShieldCheck, User } from "lucide-react";

interface Answer {
    id: string;
    author: string;
    text: string;
    isAI?: boolean; // true if this is an AI-generated response
    isVerifiedDoctor: boolean;
    timestamp: string;
}

interface Question {
    id: string;
    text: string;
    details?: string;
    author: string;
    topic: string;
    upvotes: number;
    hasUserUpvoted: boolean;
    answers: Answer[];
    timestamp: string;
}

interface QuestionDetailModalProps {
    isOpen: boolean;
    question: Question | null;
    onClose: () => void;
    onAddAnswer: (questionId: string, text: string) => void;
    onUpvoteResponse: (questionId: string) => void; // Using existing flow for main upvote only for now
}

export function QuestionDetailModal({
    isOpen,
    question,
    onClose,
    onAddAnswer,
    onUpvoteResponse
}: QuestionDetailModalProps) {
    const [newAnswer, setNewAnswer] = useState("");

    if (!isOpen || !question) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;
        onAddAnswer(question.id, newAnswer);
        setNewAnswer("");
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex h-full max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-gray-900/5"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-white/50 px-6 py-4 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{question.author}</h3>
                                <p className="text-xs text-gray-500">Asked {question.timestamp} • {question.topic}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                        {/* Main Question */}
                        <div className="mb-8">
                            <h2 className="mb-3 text-xl font-bold text-gray-900 leading-snug">
                                {question.text}
                            </h2>
                            {question.details && (
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                    {question.details}
                                </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                    {question.topic}
                                </span>
                            </div>
                        </div>

                        {/* Stats Divider */}
                        <div className="mb-6 flex items-center gap-6 border-y border-gray-100 py-3 text-sm text-gray-500">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onUpvoteResponse(question.id)}
                                className={`flex items-center gap-2 font-medium transition-colors hover:text-emerald-600 ${question.hasUserUpvoted ? "text-emerald-600" : "text-gray-700"}`}
                            >
                                <motion.div
                                    animate={question.hasUserUpvoted ? { scale: [1, 1.4, 1], rotate: [0, -15, 0] } : { scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ThumbsUp className={`h-4 w-4 ${question.hasUserUpvoted ? "fill-current" : ""}`} />
                                </motion.div>
                                <span>{question.upvotes} Upvotes</span>
                            </motion.button>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                <span className="font-medium text-gray-700">{question.answers.length} Answers</span>
                            </div>
                        </div>

                        {/* Answers List */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                                Discussion
                            </h3>

                            {question.answers.length === 0 ? (
                                <div className="py-8 text-center text-gray-400 italic">
                                    No answers yet. Be the first to help!
                                </div>
                            ) : (
                                question.answers.map((answer) => (
                                    <div key={answer.id} className="flex gap-4">
                                        <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${answer.isAI
                                                ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                                                : answer.isVerifiedDoctor
                                                    ? "bg-emerald-100 text-emerald-600"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}>
                                            {answer.isAI ? (
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                                </svg>
                                            ) : answer.isVerifiedDoctor ? <ShieldCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                        </div>
                                        <div className={`w-full rounded-2xl p-4 ${answer.isAI
                                                ? "bg-gradient-to-br from-purple-50/50 to-pink-50/50 ring-1 ring-purple-100"
                                                : answer.isVerifiedDoctor
                                                    ? "bg-emerald-50/50 ring-1 ring-emerald-100"
                                                    : "bg-gray-50"
                                            }`}>
                                            <div className="mb-1 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-bold ${answer.isAI
                                                            ? "text-purple-800"
                                                            : answer.isVerifiedDoctor
                                                                ? "text-emerald-800"
                                                                : "text-gray-900"
                                                        }`}>
                                                        {answer.author}
                                                    </span>
                                                    {answer.isAI && (
                                                        <span className="flex items-center gap-0.5 rounded-md bg-gradient-to-r from-purple-100 to-pink-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700">
                                                            ✨ AI RESPONSE
                                                        </span>
                                                    )}
                                                    {answer.isVerifiedDoctor && (
                                                        <span className="flex items-center gap-0.5 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                                                            <ShieldCheck className="h-3 w-3" /> VERIFIED
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400">{answer.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                {answer.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer - Input */}
                    <div className="border-t border-gray-100 bg-white p-4">
                        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Add your answer..."
                                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newAnswer.trim()}
                                className="absolute right-2 rounded-lg bg-emerald-600 p-2 text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
