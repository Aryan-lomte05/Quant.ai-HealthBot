import { Search, ArrowUpDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: "newest" | "upvoted";
    onSortChange: (sort: "newest" | "upvoted") => void;
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
}: FilterBarProps) {
    const { t } = useTranslation();
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('communityPage.searchPlaceholder')}
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
                    <span className="hidden sm:inline">{t('communityPage.sortBy')}</span> {sortBy === "newest" ? t('communityPage.newest') : t('communityPage.topVoted')}
                </button>
            </div>

            {/* Helper Note (Microcopy) */}
            <div className="flex items-center gap-2 px-1 text-xs text-gray-400">
                <span className="inline-block h-1 w-1 rounded-full bg-emerald-400"></span>
                <span>{t('communityPage.filterHelper')} <strong>{t('communityPage.filterHelperTopics')}</strong> {t('communityPage.filterHelperOr')} <strong>{t('communityPage.filterHelperTags')}</strong>.</span>
            </div>
        </div>
    );
}
