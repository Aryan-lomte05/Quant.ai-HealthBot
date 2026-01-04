import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { AlertCircle, Send, Loader2, Sparkles } from "lucide-react";

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
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setAiResponse(null);

        try {
            // Call database API to create question and get AI response
            const response = await fetch('/api/community', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    details,
                    topic,
                    getAIResponse: true, // Request AI response
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Show AI response if available
                if (data.question.aiResponse) {
                    setAiResponse(data.question.aiResponse);
                }

                // Trigger parent callback to refresh questions list
                onSubmit({ text, details, topic });

                // Don't close modal immediately if AI response is shown
                if (!data.question.aiResponse) {
                    resetAndClose();
                }
            } else {
                setError(data.message || 'Failed to post question');
            }
        } catch (err) {
            console.error('Error posting question:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetAndClose = () => {
        setText("");
        setDetails("");
        setTopic("General");
        setAiResponse(null);
        setError(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} title="Ask the Community">
            {!aiResponse ? (
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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-3 flex gap-3 items-start">
                            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={resetAndClose}
                            disabled={loading}
                            className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !text.trim()}
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Getting AI Response...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Post Question
                                </>
                            )}
                        </button>
                    </div>

                </form>
            ) : (
                /* AI Response View */
                <div className="space-y-5">
                    <div className="rounded-xl border border-green-100 bg-green-50 p-3 flex gap-3 items-start">
                        <Sparkles className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-green-800 leading-relaxed">
                            <strong>Question posted successfully!</strong> Here's an instant response from SwasthyaSakha AI.
                        </p>
                    </div>

                    {/* Your Question */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Question</label>
                        <p className="text-sm font-bold text-gray-900">{text}</p>
                        {details && <p className="text-xs text-gray-600">{details}</p>}
                    </div>

                    {/* AI Response */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <label className="text-xs font-semibold text-purple-700 uppercase tracking-wider">SwasthyaSakha Response</label>
                        </div>
                        <div className="rounded-xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 border border-purple-100 p-4">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {aiResponse}
                            </p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={resetAndClose}
                        className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            )}
        </Modal>
    );
}
