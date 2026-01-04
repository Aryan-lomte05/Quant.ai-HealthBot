import { CheckCircle2, Circle, Plus } from "lucide-react";

interface RightSidebarProps {
    onAskQuestion: () => void;
}

const CHECKLIST_ITEMS = [
    { label: "Visit 5 questions", done: true },
    { label: "Upvote 5 questions", done: false },
    { label: "Ask a question", done: false },
    { label: "Answer a question", done: false },
    { label: "Add 3 credentials", done: false },
];

import { useTranslation } from "@/hooks/useTranslation";

export function RightSidebar({ onAskQuestion }: RightSidebarProps) {
    const { t } = useTranslation();
    const CHECKLIST_ITEMS = [
        { label: t('communityPage.visitQuestions'), done: true },
        { label: t('communityPage.upvoteQuestions'), done: false },
        { label: t('communityPage.askQuestionGoal'), done: false },
        { label: t('communityPage.answerQuestion'), done: false },
        { label: t('communityPage.addCredentials'), done: false },
    ];
    return (
        <div className="hidden space-y-6 lg:block">
            {/* Primary CTA */}
            <button
                onClick={onAskQuestion}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-95"
            >
                <Plus className="h-5 w-5" />
                {t('communityPage.askQuestion')}
            </button>

            {/* Gamification Bubble - High Contrast */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-5 shadow-sm backdrop-blur-md">
                <h3 className="mb-4 text-sm font-bold text-emerald-900 border-b border-emerald-200 pb-2 flex items-center justify-between">
                    {t('communityPage.improveAccount')}
                    <span className="text-xs font-normal text-emerald-700 bg-emerald-200/50 px-2 py-0.5 rounded-full border border-emerald-200">{t('communityPage.level')} 1</span>
                </h3>
                <ul className="space-y-3">
                    {CHECKLIST_ITEMS.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs">
                            {item.done ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            ) : (
                                <Circle className="h-4 w-4 text-emerald-400/50" />
                            )}
                            <span className={`transition-colors ${item.done ? "text-emerald-800/50 line-through" : "text-emerald-900"}`}>
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Bubble */}
            <div className="rounded-[20px] bg-emerald-100/50 p-4 border border-emerald-200 text-[10px] text-emerald-700 backdrop-blur-sm">
                <p className="font-semibold mb-1 text-emerald-900">© 2024 Sakha Health</p>
                <div className="flex gap-3 opacity-80">
                    <span className="hover:text-emerald-900 cursor-pointer">About</span>
                    <span className="hover:text-emerald-900 cursor-pointer">Terms</span>
                    <span className="hover:text-emerald-900 cursor-pointer">Privacy</span>
                </div>
            </div>
        </div>
    );
}
