"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterBar } from "@/components/community/FilterBar";
import { QuestionCard, Question } from "@/components/community/QuestionCard";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import { LeftSidebar } from "@/components/community/LeftSidebar";
import { RightSidebar } from "@/components/community/RightSidebar";

// --- Mock Data ---
const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Can I take my BP tablet if I have light fever?",
    details: "I usually take Telmisartan 40mg at night. I have a fever of 100°F today. Should I skip it?",
    author: "NeemTree-47",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "upvoted">("newest");

  // Handle Asking a Question
  const handleAskQuestion = (newQ: { text: string; details: string; topic: string }) => {
    const questionStub: Question = {
      id: `q-${Date.now()}`,
      author: "NeemTree-47",
      text: newQ.text,
      details: newQ.details,
      topic: newQ.topic,
      upvotes: 0,
      hasUserUpvoted: false,
      timestamp: "Just now",
      answers: [],
    };
    setQuestions([questionStub, ...questions]);
  };

  // Handle Upvote
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
  };

  // Filter & Sort Logic
  const filteredQuestions = questions
    .filter((q) => {
      const matchesSearch =
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.details?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = selectedFilter === "All" || q.topic === selectedFilter;
      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => {
      if (sortBy === "upvoted") return b.upvotes - a.upvotes;
      return 0;
    });

  return (
    <div className="relative h-full flex flex-col overflow-hidden">

      {/* Background with Pastel Bubbles (Maintains Bubble Structure, but Light) */}
      <div className="fixed inset-0 -z-10 bg-gray-50">
        <div className="absolute inset-0" style={{ filter: "blur(100px)", opacity: 0.6 }}>
          <motion.div
            className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-200"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-teal-200"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-[400px] w-[400px] rounded-full bg-blue-100"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Frosted Glass Overlay (Previous Version) */}
      <div className="flex h-full flex-col bg-white/80 backdrop-blur-xl">

        {/* Search Header for Mobile */}
        <div className="border-b border-gray-100 bg-white/50 px-6 py-4 lg:hidden">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 gap-8 p-4 lg:grid-cols-[240px_1fr_280px] lg:p-6">

          {/* Left Sidebar */}
          <LeftSidebar selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />

          {/* Center Field */}
          <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            <div className="hidden lg:block">
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilter={selectedFilter}
                onFilterChange={() => { }}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            <div className="space-y-4 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedFilter === "All" ? "All Questions" : `${selectedFilter} Questions`}
                </h2>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <QuestionCard key={q.id} question={q} onUpvote={handleUpvote} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl border border-dashed border-gray-200 p-8 text-center"
                  >
                    <p className="text-gray-400 font-medium">No questions found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <RightSidebar onAskQuestion={() => setIsModalOpen(true)} />

        </div>
      </div>

      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAskQuestion}
      />

      {/* Mobile Fab */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 lg:hidden"
      >
        <span className="text-3xl font-light leading-none mb-1">+</span>
      </button>

    </div>
  );
}
