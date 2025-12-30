import { Home, Tag, Users, Clock } from "lucide-react";

interface LeftSidebarProps {
    selectedFilter: string;
    onSelectFilter: (filter: string) => void;
}

const MAIN_TOOLS = [
    { icon: Home, label: "Homepage", id: "all" },
    { icon: Tag, label: "Tags", id: "tags" },
    { icon: Users, label: "Users", id: "users" },
];

const TOPICS = [
    "Diabetes",
    "Heart Health",
    "Nutrition",
    "Mental Health",
    "Pregnancy",
    "Fitness",
    "Skin Care"
];

export function LeftSidebar({ selectedFilter, onSelectFilter }: LeftSidebarProps) {
    return (
        <div className="hidden space-y-6 lg:block">
            {/* Main Tools Bubble - High Contrast Experiment */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Main Tools
                </h3>
                <nav className="space-y-1">
                    {MAIN_TOOLS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => onSelectFilter(item.id === "all" ? "All" : item.id)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${(item.id === "all" && selectedFilter === "All")
                                    ? "bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200"
                                    : "text-emerald-900/70 hover:bg-white/50 hover:text-emerald-800"
                                }`}
                        >
                            <item.icon className={`h-4 w-4 ${item.id === "all" && selectedFilter === "All" ? "text-emerald-600" : "text-emerald-700/50"}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Topics Bubble */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Health Topics
                </h3>
                <nav className="space-y-1">
                    {TOPICS.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => onSelectFilter(topic)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${selectedFilter === topic
                                    ? "bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200"
                                    : "text-emerald-900/70 hover:bg-white/50 hover:text-emerald-800"
                                }`}
                        >
                            <span>{topic}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Recent Searches Bubble */}
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-100/50 p-4 shadow-sm backdrop-blur-md">
                <h3 className="mb-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Recent
                </h3>
                <div className="flex flex-wrap gap-2">
                    {["High BP", "Diet", "Yoga"].map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-white/40 px-2.5 py-1.5 text-[11px] text-emerald-800 hover:bg-white transition-colors cursor-pointer"
                        >
                            <Clock className="h-3 w-3 opacity-40" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
