import { Filter, X, Settings } from "lucide-react";
import { useState } from "react";

export interface FilterValues {
  personality: string;
  startDate: string;
  endDate: string;
  userAgent?: string;
  limit: number;
  page: number;
}

interface FiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  darkMode: boolean;
  totalResults?: number;
  isLoading?: boolean;
}

export function Filters({
  filters,
  onFiltersChange,
  darkMode,
  totalResults,
  isLoading = false,
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const inputClass = `w-full px-3 py-2 rounded-md border text-sm transition-all duration-200 ${
    darkMode
      ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white placeholder-gray-400"
      : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500"
  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed`;

  const hasActiveFilters = Boolean(
    filters.personality ||
      filters.startDate ||
      filters.endDate ||
      filters.userAgent ||
      filters.limit !== 10
  );

  const clearAllFilters = () => {
    onFiltersChange({
      personality: "",
      startDate: "",
      endDate: "",
      userAgent: "",
      limit: 10,
      page: 1,
    });
  };

  const setQuickDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    onFiltersChange({
      ...filters,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      page: 1,
    });
  };

  const getPersonalityOptions = (): string[] => [
    "Funny",
    "Professional",
    "Friendly",
    "Helpful",
    "Casual",
    "Formal",
  ];

  return (
    <div
      className={`rounded-lg p-6 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-sm border transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode
                  ? "bg-blue-900/30 text-blue-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {
                Object.values(filters).filter((v) =>
                  typeof v === "string" ? v : v !== 10 && v !== 1
                ).length
              }{" "}
              active
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {totalResults !== undefined && (
            <span className="text-sm text-gray-500">
              {totalResults.toLocaleString()} results
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1 rounded-md hover:bg-gray-200/30 transition-colors ${
              darkMode ? "hover:bg-gray-600/50" : ""
            }`}
          >
            {isExpanded ? (
              <X className="w-4 h-4" />
            ) : (
              <Settings className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Filters Section */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Personality Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Personality
            </label>
            <select
              className={inputClass}
              value={filters.personality}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  personality: e.target.value,
                  page: 1,
                })
              }
            >
              <option value="">All</option>
              {getPersonalityOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className={inputClass}
              value={filters.startDate}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  startDate: e.target.value,
                  page: 1,
                })
              }
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className={inputClass}
              value={filters.endDate}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  endDate: e.target.value,
                  page: 1,
                })
              }
            />
          </div>

          {/* User Agent */}
          <div>
            <label className="block text-sm font-medium mb-1">User Agent</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Browser / Device"
              value={filters.userAgent || ""}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  userAgent: e.target.value,
                  page: 1,
                })
              }
            />
          </div>

          {/* Limit */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Results per page
            </label>
            <input
              type="number"
              min={1}
              className={inputClass}
              value={filters.limit}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  limit: Number(e.target.value),
                  page: 1,
                })
              }
            />
          </div>

          {/* Quick Date Ranges */}
          <div className="flex items-end space-x-2">
            <button
              type="button"
              className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={() => setQuickDateRange(7)}
            >
              Last 7 days
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={() => setQuickDateRange(30)}
            >
              Last 30 days
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors"
              onClick={clearAllFilters}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Optional Loading State */}
      {isLoading && (
        <div className="mt-4 text-sm text-gray-500">
          Loading filtered results...
        </div>
      )}
    </div>
  );
}
