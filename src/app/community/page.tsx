"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenLine, Filter, Sparkles, Plus, AlertCircle, X, Check, Flag, Heart, Share2, MessageCircle, ThumbsUp, ChevronDown, User, Calendar, Tag as TagIcon, ArrowRight, ArrowLeft, MessageSquareDashed } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterBar } from "@/components/community/FilterBar";
import { QuestionCard, Question, Answer } from "@/components/community/QuestionCard";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import { QuestionDetailModal } from "@/components/community/QuestionDetailModal";
import { LeftSidebar } from "@/components/community/LeftSidebar";
import { RightSidebar } from "@/components/community/RightSidebar";

// --- Mock Data ---
// In a real app, this would come from an API.
// "NeemTree-47" is assumed to be the Current User for "My Questions" logic.
const CURRENT_USER_NAME = "NeemTree-47";

const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Can I take my BP tablet if I have light fever?",
    details: "I usually take Telmisartan 40mg at night. I have a fever of 100°F today. Should I skip it?",
    author: CURRENT_USER_NAME, // This is My Question
    topic: "Heart Health",
    upvotes: 12,
    hasUserUpvoted: false,
    timestamp: "2h ago",
    answers: [
      {
        id: "a1",
        author: "Dr. Meera",
        text: "Please continue your BP medication as prescribed. Fever does not contraindicate taking antihypertensives.",
        isVerifiedDoctor: true,
        timestamp: "1h ago",
      }
    ],
  },
  {
    id: "q2",
    text: "My father's sugar is 210 after dinner. Is it very dangerous?",
    details: "He is 65 years old and Type 2 diabetic. He ate a sweet at a wedding.",
    author: "CaringSon_22",
    topic: "Diabetes",
    upvotes: 8,
    hasUserUpvoted: true,
    timestamp: "4h ago",
    answers: [
      {
        id: "a3",
        author: "Dr. Rajesh",
        text: "A single reading of 210 mg/dL after a heavy meal isn't an immediate emergency but requires monitoring.",
        isVerifiedDoctor: true,
        timestamp: "3h ago",
      }
    ],
  },
  {
    id: "q3",
    text: "Best exercises for knee pain?",
    details: "I have mild arthritis and walking hurts sometimes.",
    author: "ActiveSenior_01",
    topic: "Fitness",
    upvotes: 5,
    hasUserUpvoted: false,
    timestamp: "1d ago",
    answers: [],
  },
  {
    id: "q4",
    text: "Is it safe to eat Papaya during pregnancy?",
    details: "I heard mixed things about ripe vs raw papaya.",
    author: "NewMom_24",
    topic: "Pregnancy",
    upvotes: 15,
    hasUserUpvoted: false,
    timestamp: "2d ago",
    answers: [
      {
        id: "a4",
        author: "Dr. Anjali",
        text: "Ripe papaya is generally considered safe and nutritious. However, semi-ripe or raw papaya contains latex which should be avoided.",
        isVerifiedDoctor: true,
        timestamp: "1d ago",
      }
    ],
  },
];

export default function CommunityPage() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("General"); // Default to "General"
  const [sortBy, setSortBy] = useState<"newest" | "upvoted">("newest");

  // --- Fetch Questions from Database ---
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedFilter && selectedFilter !== "General") {
        params.append("topic", selectedFilter);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      params.append("sortBy", sortBy);
      params.append("page", page.toString());
      params.append("limit", "3");

      const response = await fetch(`/api/community?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setQuestions(data.questions.map((q: any) => ({
          id: q.id,
          author: q.author,
          text: q.text,
          details: q.details,
          topic: q.topic,
          upvotes: q.upvotes,
          hasUserUpvoted: false, // TODO: Check if current user has upvoted
          timestamp: formatTimestamp(q.timestamp),
          answers: q.answers.map((a: any) => ({
            id: a.id,
            author: a.author,
            text: a.text,
            isAI: a.isAI,
            isVerifiedDoctor: a.isVerifiedDoctor,
            timestamp: formatTimestamp(a.timestamp),
          })),
        })));
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format timestamps
  const formatTimestamp = (timestamp: string | Date): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Fetch questions on mount and when filters change
  useEffect(() => {
    fetchQuestions();
  }, [selectedFilter, searchQuery, sortBy, page]);

  // --- Handlers ---

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setSearchQuery(""); // Reset search on topic change
    setPage(1); // Reset page on filter change
  };

  const handleAskQuestion = () => {
    // Refresh questions list after posting
    fetchQuestions();
  };

  const handleUpvote = async (id: string) => {
    try {
      // Optimistically update UI
      setQuestions((prev) =>
        prev.map((q) => {
          if (q.id === id) {
            const isRemovingVote = q.hasUserUpvoted;
            return {
              ...q,
              upvotes: isRemovingVote ? q.upvotes - 1 : q.upvotes + 1,
              hasUserUpvoted: !isRemovingVote,
            };
          }
          return q;
        })
      );

      // Also update selected question if open
      if (selectedQuestion?.id === id) {
        setSelectedQuestion(prev => prev ? { ...prev, upvotes: prev.hasUserUpvoted ? prev.upvotes - 1 : prev.upvotes + 1, hasUserUpvoted: !prev.hasUserUpvoted } : null);
      }

      // Call API (implement later with user IDs)
      // await fetch(`/api/community/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ action: 'upvote', userId: 'current-user-id' }),
      // });
    } catch (error) {
      console.error("Failed to upvote:", error);
      // Revert on error
      fetchQuestions();
    }
  };

  const handleAddAnswer = async (questionId: string, text: string) => {
    try {
      const response = await fetch(`/api/community/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_answer',
          answerText: text,
          author: CURRENT_USER_NAME,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setQuestions(prev => prev.map(q => {
          if (q.id === questionId) {
            return {
              ...q, answers: data.answers.map((a: any) => ({
                id: a.id,
                author: a.author,
                text: a.text,
                isAI: a.isAI,
                isVerifiedDoctor: a.isVerifiedDoctor,
                timestamp: formatTimestamp(a.timestamp),
              }))
            };
          }
          return q;
        }));

        // Update modal view
        if (selectedQuestion?.id === questionId) {
          const updated = questions.find(q => q.id === questionId);
          if (updated) {
            setSelectedQuestion({
              ...updated, answers: data.answers.map((a: any) => ({
                id: a.id,
                author: a.author,
                text: a.text,
                isAI: a.isAI,
                isVerifiedDoctor: a.isVerifiedDoctor,
                timestamp: formatTimestamp(a.timestamp),
              }))
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to add answer:", error);
    }
  };



  // Filtering is now done on the backend via the API

  return (
    <div className="relative h-full flex flex-col overflow-hidden">

      {/* Background with Pastel Bubbles */}
      <div className="fixed inset-0 -z-10 bg-gray-50">
        <div className="absolute inset-0" style={{ filter: "blur(100px)", opacity: 0.6 }}>
          <motion.div
            className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-200"
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-teal-200"
            animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-[400px] w-[400px] rounded-full bg-blue-100"
            animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Frosted Glass Overlay */}
      <div className="flex h-full flex-col bg-white/80 backdrop-blur-xl">

        {/* Search Header for Mobile */}
        <div className="border-b border-gray-100 bg-white/50 px-6 py-4 lg:hidden">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 gap-8 p-4 lg:grid-cols-[240px_1fr_280px] lg:p-6">

          {/* Left Sidebar */}
          <LeftSidebar
            selectedFilter={selectedFilter}
            onSelectFilter={handleFilterChange}
            onSearch={handleSearch}
            recentSearches={recentSearches}
          />

          {/* Center Field */}
          <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            <div className="hidden lg:block">
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={handleSearch}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            <div className="space-y-4 pb-20">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedFilter === "General" ? t('communityPage.allQuestions') :
                    selectedFilter === "my_questions" ? t('communityPage.myQuestions') :
                      `${selectedFilter} ${t('communityPage.allQuestions').replace('All ', '')}`}
                </h2>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                  </div>
                ) : questions.length > 0 ? (
                  questions.map((q) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      key={q.id}
                      onClick={() => setSelectedQuestion(q)}
                      className="cursor-pointer"
                    >
                      <QuestionCard question={q} onUpvote={(id) => {
                        handleUpvote(id);
                        // prevent bubbling for the card click
                      }} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-emerald-200/50 bg-white/40 px-8 py-16 text-center backdrop-blur-sm"
                  >
                    <div className="mb-4 rounded-full bg-emerald-50 p-4 ring-1 ring-emerald-100">
                      <MessageSquareDashed className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      {searchQuery ? `${t('communityPage.noResults')} "${searchQuery}"` : t('communityPage.noQuestionsYet')}
                    </h3>
                    <p className="mb-6 max-w-xs text-sm text-gray-500">
                      {searchQuery
                        ? "Try checking your spelling or using different keywords."
                        : `Be the first to ask about ${selectedFilter === "General" ? "anything" : selectedFilter}!`
                      }
                    </p>

                    {searchQuery ? (
                      <button
                        onClick={() => handleSearch("")}
                        className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        {t('communityPage.clearSearch')}
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAskModalOpen(true)}
                        className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
                      >
                        {t('communityPage.askQuestion')}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {questions.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-4 pb-20">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-600">
                  {t('communityPage.page')} {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <RightSidebar onAskQuestion={() => setIsAskModalOpen(true)} />

        </div>
      </div>

      {/* Modals */}
      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        onSubmit={handleAskQuestion}
      />

      <QuestionDetailModal
        isOpen={!!selectedQuestion}
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onAddAnswer={handleAddAnswer}
        onUpvoteResponse={handleUpvote}
      />

      {/* Mobile Fab */}
      <button
        onClick={() => setIsAskModalOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 lg:hidden"
      >
        <span className="text-3xl font-light leading-none mb-1">+</span>
      </button>

    </div>
  );
}
