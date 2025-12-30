import { Search, ArrowUpDown } from "lucide-react";

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    sortBy: "newest" | "upvoted";
    onSortChange: (sort: "newest" | "upvoted") => void;
}

const TOPICS = ["All", "General", "Diabetes", "Heart Health", "Nutrition", "Mental Health", "Pregnancy"];

export function FilterBar({
    searchQuery,
    onSearchChange,
    selectedFilter,
    onFilterChange,
    sortBy,
    onSortChange,
}: FilterBarProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search topics or questions..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    />
                </div>

                {/* Sort Button */}
                <button
                    onClick={() => onSortChange(sortBy === "newest" ? "upvoted" : "newest")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                    <span className="hidden sm:inline">Sort by:</span> {sortBy === "newest" ? "Newest" : "Top Voted"}
                </button>
            </div>

            {/* Topics Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {TOPICS.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => onFilterChange(topic)}
                        className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${selectedFilter === topic
                                ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-700"
                            }`}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>
    );
}
