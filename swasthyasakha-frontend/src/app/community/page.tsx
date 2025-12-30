"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenLine, Filter, Sparkles, Plus, AlertCircle, X, Check, Flag, Heart, Share2, MessageCircle, ThumbsUp, ChevronDown, User, Calendar, Tag as TagIcon, ArrowRight, MessageSquareDashed } from "lucide-react";
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
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);

  // Modals
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("General"); // Default to "General"
  const [sortBy, setSortBy] = useState<"newest" | "upvoted">("newest");

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
  };

  const handleAskQuestion = (newQ: { text: string; details: string; topic: string }) => {
    const questionStub: Question = {
      id: `q-${Date.now()}`,
      author: CURRENT_USER_NAME,
      text: newQ.text,
      details: newQ.details,
      topic: newQ.topic,
      upvotes: 0,
      hasUserUpvoted: false,
      timestamp: "Just now",
      answers: [],
    };
    // Add to top of list
    setQuestions([questionStub, ...questions]);
    // Automatically switch to "My Questions" or stay on "General" to see it
    setSelectedFilter("General");
  };

  const handleUpvote = (id: string) => {
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
  };

  const handleAddAnswer = (questionId: string, text: string) => {
    const newAnswer: Answer = {
      id: `a-${Date.now()}`,
      author: CURRENT_USER_NAME,
      text: text,
      isVerifiedDoctor: false,
      timestamp: "Just now"
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, answers: [...q.answers, newAnswer] };
      }
      return q;
    }));

    // Update the modal view as well
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(prev => prev ? { ...prev, answers: [...prev.answers, newAnswer] } : null);
    }
  };


  // --- Filter Logic ---

  const filteredQuestions = questions
    .filter((q) => {
      // 1. Search Query
      const qText = q.text.toLowerCase();
      const qDetails = q.details?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      const matchesSearch = qText.includes(query) || qDetails.includes(query);

      // 2. Category / Topic / My Questions Filter
      let matchesFilter = true;
      if (selectedFilter === "General") {
        matchesFilter = true; // Show ALL
      } else if (selectedFilter === "my_questions") {
        matchesFilter = q.author === CURRENT_USER_NAME;
      } else {
        // Exact Match for Topics
        matchesFilter = q.topic === selectedFilter;
      }

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "upvoted") return b.upvotes - a.upvotes;
      // Default: Newest (We assume mock data order is roughly chronological or we'd parse timestamps)
      return 0;
    });

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
                  {selectedFilter === "General" ? "All Questions" :
                    selectedFilter === "my_questions" ? "My Questions" :
                      `${selectedFilter} Questions`}
                </h2>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
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
                      {searchQuery ? `No results for "${searchQuery}"` : "No questions here yet"}
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
                        Clear Search
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAskModalOpen(true)}
                        className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
                      >
                        Ask a Question
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
