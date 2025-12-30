import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { AlertCircle, Send } from "lucide-react";

interface AskQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: { text: string; details: string; topic: string }) => void;
}

const TOPICS = ["General", "Diabetes", "Heart Health", "Nutrition", "Mental Health", "Pregnancy"];

export function AskQuestionModal({ isOpen, onClose, onSubmit }: AskQuestionModalProps) {
    const [topic, setTopic] = useState("General");
    const [text, setText] = useState("");
    const [details, setDetails] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSubmit({ text, details, topic });
        setText("");
        setDetails("");
        setTopic("General");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ask the Community">
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Privacy Note */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 flex gap-3 items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Your question will be posted anonymously as <strong>NeemTree-47</strong>.
                        Please do not include any personal identifiers like your real name, phone number, or address.
                    </p>
                </div>

                {/* Topic Selection */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Topic</label>
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-emerald-950 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                        {TOPICS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                {/* Question Title */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                        Your Question <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="e.g., Is it safe to eat mangoes with high sugar?"
                        className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-emerald-950 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                    />
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                        More Details (Optional)
                    </label>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Provide context to help others answer better..."
                        className="w-full h-24 rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-emerald-950 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                    >
                        <Send className="h-4 w-4" />
                        Post Question
                    </button>
                </div>

            </form>
        </Modal>
    );
}
