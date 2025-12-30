import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, ShieldCheck } from "lucide-react";

export interface Answer {
    id: string;
    author: string;
    text: string;
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
            className="group relative rounded-xl border border-gray-100/80 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
        >
            {/* Header */}
            <div className="mb-2.5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-gray-500">
                    <span className="font-semibold text-gray-900">{question.author}</span>
                    <span>•</span>
                    <span>{question.timestamp}</span>
                </div>
                <span className={`rounded-md border px-2 py-0.5 font-medium text-[10px] ${getTopicColor(question.topic)}`}>
                    {question.topic}
                </span>
            </div>

            {/* Content */}
            <div className="mb-3.5">
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {question.text}
                </h3>
                {question.details && (
                    <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">{question.details}</p>
                )}
            </div>

            {/* Verified Answer */}
            {verifiedAnswer && (
                <div className="mb-3 flex gap-3 rounded-lg bg-emerald-50/60 p-3 text-xs border border-emerald-100/50">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                        <p className="font-bold text-emerald-800 text-[10px] uppercase tracking-wide mb-1">Verified Answer</p>
                        <p className="text-gray-800 leading-relaxed italic">
                            &quot;{verifiedAnswer.text}&quot;
                        </p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-5 text-xs text-gray-500 font-medium pt-1">
                <button
                    onClick={() => onUpvote(question.id)}
                    className={`flex items-center gap-1.5 transition-colors hover:text-emerald-600 ${question.hasUserUpvoted ? "text-emerald-600 font-semibold" : ""
                        }`}
                >
                    <ThumbsUp className={`h-4 w-4 ${question.hasUserUpvoted ? "fill-current" : ""}`} />
                    <span>{question.upvotes}</span>
                </button>

                <div className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{question.answers.length}</span>
                </div>
            </div>
        </motion.div>
    );
}
