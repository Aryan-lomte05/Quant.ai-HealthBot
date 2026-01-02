import { Home, Tag, UserCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LeftSidebarProps {
    selectedFilter: string;
    onSelectFilter: (filter: string) => void;
    onSearch: (query: string) => void;
    recentSearches: string[];
}

const MAIN_TOOLS = [
    // "All" is now covered by "General" in Topics
    { icon: UserCheck, label: "My Questions", id: "my_questions" },
];

const TOPICS = [
    "General", // Now acts as "All Topics"
    "Diabetes",
    "Heart Health",
    "Nutrition",
    "Mental Health",
    "Pregnancy",
    "Fitness",
    "Skin Care"
];

const TRENDING_TAGS = ["High BP", "Diet Plan", "Yoga", "Insulin", "Meditation"];

export function LeftSidebar({ selectedFilter, onSelectFilter, onSearch, recentSearches }: LeftSidebarProps) {

    const handleToolsClick = (id: string) => {
        onSelectFilter(id);
    };

    return (
        <div className="hidden space-y-6 lg:block">
            {/* Main Tools Bubble */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Feed
                </h3>
                <nav className="space-y-1 relative">
                    {MAIN_TOOLS.map((item) => {
                        const isActive = selectedFilter === item.id;
                        return (
                            <motion.button
                                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                                key={item.label}
                                onClick={() => handleToolsClick(item.id)}
                                className={`relative z-10 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${isActive ? "text-emerald-700" : "text-emerald-900/70 hover:text-emerald-800"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-main-active"
                                        className="absolute inset-0 z-[-1] rounded-2xl bg-white shadow-sm ring-1 ring-emerald-200"
                                        transition={{ type: "spring", stiffness: 240, damping: 22 }}
                                    />
                                )}
                                <item.icon className={`h-4 w-4 relative z-10 ${isActive ? "text-emerald-600" : "text-emerald-700/50"}`} />
                                <span className="relative z-10">{item.label}</span>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* Topics Bubble */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Topics
                </h3>
                <nav className="space-y-1 max-h-[300px] overflow-y-auto scrollbar-hide relative">
                    {TOPICS.map((topic) => {
                        const isActive = selectedFilter === topic;
                        return (
                            <motion.button
                                whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                                key={topic}
                                onClick={() => onSelectFilter(topic)}
                                className={`relative z-10 flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? "text-emerald-700" : "text-emerald-900/70 hover:text-emerald-800"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-topic-active"
                                        className="absolute inset-0 z-[-1] rounded-xl bg-white shadow-sm ring-1 ring-emerald-200"
                                        transition={{ type: "spring", stiffness: 240, damping: 22 }}
                                    />
                                )}
                                <span className="relative z-10">{topic}</span>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* Trending Tags & Recent Bubble */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {TRENDING_TAGS.map((tag) => (
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={tag}
                            onClick={() => onSearch(tag)}
                            className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-white/40 px-2.5 py-1.5 text-[11px] text-emerald-800 hover:bg-white transition-colors cursor-pointer"
                        >
                            <Tag className="h-3 w-3 opacity-40" />
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {recentSearches.length > 0 && (
                    <>
                        <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider border-t border-emerald-200/50 pt-4">
                            Recent Searches
                        </h3>
                        <div className="flex flex-col gap-1">
                            {recentSearches.map((term, idx) => (
                                <motion.button
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={`${term}-${idx}`}
                                    onClick={() => onSearch(term)}
                                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-emerald-900/70 hover:bg-white/40 text-left transition-colors"
                                >
                                    <Clock className="h-3 w-3 opacity-40 shrink-0" />
                                    <span className="truncate">{term}</span>
                                </motion.button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
