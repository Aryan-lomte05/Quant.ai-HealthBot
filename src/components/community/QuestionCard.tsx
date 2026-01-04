import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, ShieldCheck, User, Check, Sparkles } from "lucide-react";

export interface Answer {
    id: string;
    author: string;
    text: string;
    isAI?: boolean; // true if this is an AI-generated response
    isVerifiedDoctor: boolean;
    timestamp: string;
}

export interface Question {
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

interface QuestionCardProps {
    question: Question;
    onUpvote: (id: string) => void;
}

const getTopicColor = (topic: string) => {
    const colors: Record<string, string> = {
        "Diabetes": "bg-blue-50 text-blue-700 border-blue-100",
        "Heart Health": "bg-rose-50 text-rose-700 border-rose-100",
        "Nutrition": "bg-orange-50 text-orange-700 border-orange-100",
        "Mental Health": "bg-purple-50 text-purple-700 border-purple-100",
        "Pregnancy": "bg-pink-50 text-pink-700 border-pink-100",
        "Fitness": "bg-teal-50 text-teal-700 border-teal-100",
    };
    return colors[topic] || "bg-gray-100 text-gray-700 border-gray-200";
};

export function QuestionCard({ question, onUpvote }: QuestionCardProps) {
    const verifiedAnswer = question.answers.find((a) => a.isVerifiedDoctor);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative flex flex-col gap-3 rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-emerald-200/60 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05)]"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 ring-1 ring-gray-100">
                        <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                            {question.author}
                        </h3>
                        <p className="text-[11px] font-medium text-gray-400">{question.timestamp}</p>
                    </div>
                </div>
                {verifiedAnswer ? (
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100/50">
                        <Check className="h-3 w-3" />
                        <span>Verified Answer</span>
                    </div>
                ) : (
                    <span className={`rounded-md border px-2 py-0.5 font-medium text-[10px] ${getTopicColor(question.topic)}`}>
                        {question.topic}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="mb-1">
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {question.text}
                </h3>
                {question.details && (
                    <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">{question.details}</p>
                )}
            </div>

            {/* AI Answer Preview */}
            {!verifiedAnswer && ((question.answers.find(a => a.isAI)) as Answer | undefined) && (
                (() => {
                    const aiAnswer = question.answers.find(a => a.isAI)!;
                    return (
                        <div className="mb-3 mt-1 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-3.5 border border-purple-100/60 shadow-sm">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                                <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">SwasthyaSakha AI</span>
                            </div>
                            <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                                {aiAnswer.text}
                            </p>
                        </div>
                    );
                })()
            )}

            {/* Verified Answer Highlight (if exists) */}
            {verifiedAnswer && (
                <div className="mb-1 mt-1 flex gap-3 rounded-lg bg-emerald-50/60 p-3 text-xs border border-emerald-100/50">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                        <p className="font-bold text-emerald-800 text-[10px] uppercase tracking-wide mb-1">Doctor's Response</p>
                        <p className="text-gray-800 leading-relaxed italic">
                            &quot;{verifiedAnswer.text}&quot;
                        </p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-5 text-xs text-gray-500 font-medium pt-1 mt-auto">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onUpvote(question.id);
                    }}
                    className={`flex items-center gap-1.5 transition-colors hover:text-emerald-600 ${question.hasUserUpvoted ? "text-emerald-600 font-semibold" : ""}`}
                >
                    <motion.div
                        animate={question.hasUserUpvoted ? { scale: [1, 1.4, 1], rotate: [0, -15, 0] } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ThumbsUp className={`h-4 w-4 ${question.hasUserUpvoted ? "fill-current" : ""}`} />
                    </motion.div>
                    <span>{question.upvotes}</span>
                </motion.button>

                <div className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{question.answers.length}</span>
                </div>
            </div>
        </motion.div>
    );
}
