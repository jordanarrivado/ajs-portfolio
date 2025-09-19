"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Users,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  BarChart3,
  Download,
  RefreshCw,
  Search,
  Smartphone,
  Monitor,
  Eye,
  Trash2,
  X,
} from "lucide-react";

// Types
interface ChatMessage {
  role: string;
  content: string;
}

interface ChatLog {
  _id: string;
  userAgent: string;
  device: {
    browser: { name: string; version: string };
    os: { name: string; version: string };
    device: { type?: string };
  };
  messages: ChatMessage[];
  aiResponse: string;
  personality?: string;
  timestamp: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Analytics {
  totalConversations: number;
  personalityBreakdown: { _id: string; count: number }[];
  browserBreakdown: { _id: string; count: number }[];
  osBreakdown: { _id: string; count: number }[];
  deviceBreakdown: { _id: string; count: number }[];
  dailyActivity: { _id: string; count: number }[];
  messageStats: { avgLength: number; totalMessages: number };
}

export default function ChatLogDashboard() {
  // State management
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"logs" | "analytics">("logs");
  const [selectedLog, setSelectedLog] = useState<ChatLog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    personality: "",
    startDate: "",
    endDate: "",
    userAgent: "",
  });

  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 12,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Fetch functions
  const fetchChatLogs = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`/api/chatlog?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setChatLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
    if (showLoading) setLoading(false);
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch("/api/chatlog/analytics?days=30");
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
    setAnalyticsLoading(false);
  };

  const deleteChatLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat log?")) return;

    try {
      const response = await fetch(`/api/chatlog/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        fetchChatLogs(false);
        setSelectedLog(null);
        if (activeTab === "analytics") {
          fetchAnalytics();
        }
      }
    } catch (error) {
      console.error("Error deleting chat log:", error);
    }
  };

  // Utility functions
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPersonalityColor = (personality?: string) => {
    switch (personality) {
      case "Funny":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Professional":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Friendly":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400";
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(chatLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chat-logs-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  // Effects
  useEffect(() => {
    fetchChatLogs();
  }, [filters]);

  useEffect(() => {
    if (activeTab === "analytics" && !analytics) {
      fetchAnalytics();
    }
  }, [activeTab]);

  // Filter chat logs by search query
  const filteredLogs = chatLogs.filter(
    (log) =>
      log.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      log.aiResponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.personality || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-sm transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/95 border-gray-700"
            : "bg-white/95 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold">Chat Log Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Monitor and analyze chat interactions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tab Switcher */}
              <div
                className={`flex rounded-lg p-1 ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setActiveTab("logs")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === "logs"
                      ? "bg-blue-500 text-white shadow-sm"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Logs</span>
                  {pagination.totalCount > 0 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === "logs" ? "bg-blue-600" : "bg-gray-500"
                      }`}
                    >
                      {pagination.totalCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === "analytics"
                      ? "bg-blue-500 text-white shadow-sm"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    activeTab === "logs"
                      ? fetchChatLogs(false)
                      : fetchAnalytics()
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  title="Refresh"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                {activeTab === "logs" && (
                  <button
                    onClick={exportData}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    title="Export Data"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  title="Toggle Theme"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "logs" ? (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div
              className={`rounded-lg p-6 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              } shadow-sm`}
            >
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Personality
                  </label>
                  <input
                    type="text"
                    value={filters.personality}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        personality: e.target.value,
                        page: 1,
                      })
                    }
                    placeholder="e.g., Funny, Professional"
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        startDate: e.target.value,
                        page: 1,
                      })
                    }
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        endDate: e.target.value,
                        page: 1,
                      })
                    }
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Items per page
                  </label>
                  <select
                    value={filters.limit}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        limit: parseInt(e.target.value),
                        page: 1,
                      })
                    }
                    className={`w-full px-3 py-2 rounded-md border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  >
                    <option value="6">6 items</option>
                    <option value="12">12 items</option>
                    <option value="24">24 items</option>
                    <option value="48">48 items</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chat Logs Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading chat logs...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(searchQuery ? filteredLogs : chatLogs).map((log) => (
                    <div
                      key={log._id}
                      className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 cursor-pointer ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-750 border-gray-700"
                          : "bg-white hover:bg-gray-50 border-gray-200"
                      } shadow-sm hover:shadow-md border`}
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {log.device.device?.type === "mobile" ? (
                            <Smartphone className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Monitor className="w-4 h-4 text-gray-500" />
                          )}
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded-full ${getPersonalityColor(
                              log.personality
                            )}`}
                          >
                            {log.personality || "Default"}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLog(log);
                            }}
                            className={`p-1.5 rounded-md transition-colors ${
                              darkMode
                                ? "hover:bg-blue-900/50 hover:text-blue-400"
                                : "hover:bg-blue-100 hover:text-blue-600"
                            }`}
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChatLog(log._id);
                            }}
                            className={`p-1.5 rounded-md transition-colors ${
                              darkMode
                                ? "hover:bg-red-900/50 hover:text-red-400"
                                : "hover:bg-red-100 hover:text-red-600"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium text-blue-500">
                            User:
                          </span>
                          <p className="mt-1 line-clamp-2 text-gray-700 dark:text-gray-300">
                            {log.messages[0]?.content || "No message"}
                          </p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-green-500">
                            AI:
                          </span>
                          <p className="mt-1 line-clamp-2 text-gray-600 dark:text-gray-400">
                            {log.aiResponse}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <span className="flex items-center space-x-1">
                            <span>{log.device.browser.name}</span>
                            <span>•</span>
                            <span>{log.device.os.name}</span>
                          </span>
                          <span>{formatDate(log.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {(searchQuery ? filteredLogs : chatLogs).length === 0 &&
                  !loading && (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-500 mb-2">
                        {searchQuery
                          ? "No matching conversations"
                          : "No conversations found"}
                      </h3>
                      <p className="text-gray-400">
                        {searchQuery
                          ? "Try adjusting your search terms or filters"
                          : "Chat logs will appear here as users interact with your bot"}
                      </p>
                    </div>
                  )}

                {/* Pagination */}
                {pagination.totalPages > 1 && !searchQuery && (
                  <div className="flex items-center justify-between pt-6">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                      {Math.min(
                        pagination.currentPage * pagination.limit,
                        pagination.totalCount
                      )}{" "}
                      of {pagination.totalCount} results
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setFilters({ ...filters, page: filters.page - 1 })
                        }
                        disabled={!pagination.hasPrevPage}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pagination.hasPrevPage
                            ? darkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            : "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, pagination.totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (pagination.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (pagination.currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (
                              pagination.currentPage >=
                              pagination.totalPages - 2
                            ) {
                              pageNum = pagination.totalPages - 4 + i;
                            } else {
                              pageNum = pagination.currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() =>
                                  setFilters({ ...filters, page: pageNum })
                                }
                                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                                  pageNum === pagination.currentPage
                                    ? "bg-blue-500 text-white"
                                    : darkMode
                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setFilters({ ...filters, page: filters.page + 1 })
                        }
                        disabled={!pagination.hasNextPage}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pagination.hasNextPage
                            ? darkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            : "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          /* Analytics Tab */
          <div className="space-y-6">
            {analyticsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading analytics...</p>
              </div>
            ) : analytics ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Conversations
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                          {analytics.totalConversations}
                        </p>
                      </div>
                      <MessageSquare className="w-10 h-10 text-blue-500 opacity-75" />
                    </div>
                  </div>

                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Messages
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                          {analytics.messageStats.totalMessages}
                        </p>
                      </div>
                      <Users className="w-10 h-10 text-green-500 opacity-75" />
                    </div>
                  </div>

                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Avg Message Length
                        </p>
                        <p className="text-3xl font-bold text-purple-600">
                          {Math.round(analytics.messageStats.avgLength)} chars
                        </p>
                      </div>
                      <Clock className="w-10 h-10 text-purple-500 opacity-75" />
                    </div>
                  </div>

                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Unique Browsers
                        </p>
                        <p className="text-3xl font-bold text-orange-600">
                          {analytics.browserBreakdown.length}
                        </p>
                      </div>
                      <Globe className="w-10 h-10 text-orange-500 opacity-75" />
                    </div>
                  </div>
                </div>

                {/* Breakdown Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personality Breakdown */}
                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Personality Breakdown</span>
                    </h3>
                    <div className="space-y-4">
                      {analytics.personalityBreakdown.map((item, index) => {
                        const percentage =
                          analytics.totalConversations > 0
                            ? (item.count / analytics.totalConversations) * 100
                            : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-yellow-500",
                          "bg-red-500",
                          "bg-purple-500",
                        ];

                        return (
                          <div key={item._id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">
                                {item._id || "Default"}
                              </span>
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-500">
                                  {percentage.toFixed(1)}%
                                </span>
                                <span className="font-semibold">
                                  {item.count}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`h-2 rounded-full ${
                                darkMode ? "bg-gray-700" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  colors[index % colors.length]
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Browser Breakdown */}
                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      <span>Browser Breakdown</span>
                    </h3>
                    <div className="space-y-4">
                      {analytics.browserBreakdown
                        .slice(0, 5)
                        .map((item, index) => {
                          const percentage =
                            analytics.totalConversations > 0
                              ? (item.count / analytics.totalConversations) *
                                100
                              : 0;
                          const colors = [
                            "bg-red-500",
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-yellow-500",
                            "bg-purple-500",
                          ];

                          return (
                            <div key={item._id} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{item._id}</span>
                                <div className="flex items-center space-x-3">
                                  <span className="text-gray-500">
                                    {percentage.toFixed(1)}%
                                  </span>
                                  <span className="font-semibold">
                                    {item.count}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`h-2 rounded-full ${
                                  darkMode ? "bg-gray-700" : "bg-gray-200"
                                }`}
                              >
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    colors[index % colors.length]
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Daily Activity Chart */}
                <div
                  className={`rounded-lg p-6 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } shadow-sm border`}
                >
                  <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <span>Daily Activity (Last 7 Days)</span>
                  </h3>
                  <div className="flex items-end justify-between space-x-2 h-48">
                    {analytics.dailyActivity.map((day) => {
                      const maxCount = Math.max(
                        ...analytics.dailyActivity.map((d) => d.count),
                        1
                      );
                      const height =
                        maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                      const date = new Date(day._id);

                      return (
                        <div
                          key={day._id}
                          className="flex-1 flex flex-col items-center space-y-2"
                        >
                          <div className="text-xs font-semibold text-blue-500 mb-1">
                            {day.count}
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-700 min-h-4 hover:from-blue-500 hover:to-blue-300 cursor-pointer"
                            style={{ height: `${Math.max(height, 12)}%` }}
                            title={`${
                              day.count
                            } conversations on ${date.toLocaleDateString()}`}
                          />
                          <div className="text-xs text-gray-500 text-center">
                            <div className="font-medium">
                              {date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div>{date.getDate()}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {analytics.dailyActivity.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p>No activity data available</p>
                    </div>
                  )}
                </div>

                {/* Device and OS Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* OS Breakdown */}
                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <h3 className="text-lg font-semibold mb-6">
                      Operating Systems
                    </h3>
                    <div className="space-y-3">
                      {analytics.osBreakdown.slice(0, 5).map((item, index) => {
                        const percentage =
                          analytics.totalConversations > 0
                            ? (item.count / analytics.totalConversations) * 100
                            : 0;
                        const colors = [
                          "bg-indigo-500",
                          "bg-teal-500",
                          "bg-pink-500",
                          "bg-orange-500",
                          "bg-gray-500",
                        ];

                        return (
                          <div
                            key={item._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  colors[index % colors.length]
                                }`}
                              ></div>
                              <span className="text-sm font-medium">
                                {item._id}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {percentage.toFixed(1)}%
                              </span>
                              <span className="text-sm font-semibold">
                                {item.count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device Types */}
                  <div
                    className={`rounded-lg p-6 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-sm border`}
                  >
                    <h3 className="text-lg font-semibold mb-6">Device Types</h3>
                    <div className="space-y-3">
                      {analytics.deviceBreakdown.map((item, index) => {
                        const percentage =
                          analytics.totalConversations > 0
                            ? (item.count / analytics.totalConversations) * 100
                            : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-yellow-500",
                        ];

                        return (
                          <div
                            key={item._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  colors[index % colors.length]
                                }`}
                              ></div>
                              <span className="text-sm font-medium">
                                {item._id}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {percentage.toFixed(1)}%
                              </span>
                              <span className="text-sm font-semibold">
                                {item.count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  No Analytics Data
                </h3>
                <p className="text-gray-400">
                  Analytics will appear here once you have chat interactions
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for viewing individual chat log */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div
            className={`max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 p-6 border-b ${
                darkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-white"
              } rounded-t-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Chat Log Details</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Conversation from {formatDate(selectedLog.timestamp)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h4 className="font-semibold mb-2">Session Info</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Personality:</strong>{" "}
                      {selectedLog.personality || "Default"}
                    </div>
                    <div>
                      <strong>Timestamp:</strong>{" "}
                      {formatDate(selectedLog.timestamp)}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h4 className="font-semibold mb-2">Device Info</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Browser:</strong>{" "}
                      {selectedLog.device.browser.name}{" "}
                      {selectedLog.device.browser.version}
                    </div>
                    <div>
                      <strong>OS:</strong> {selectedLog.device.os.name}{" "}
                      {selectedLog.device.os.version}
                    </div>
                    <div>
                      <strong>Type:</strong>{" "}
                      {selectedLog.device.device?.type || "Desktop"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Conversation</span>
                </h4>
                <div className="space-y-4">
                  {selectedLog.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        msg.role === "user"
                          ? darkMode
                            ? "bg-blue-900/30 border-l-4 border-blue-500"
                            : "bg-blue-50 border-l-4 border-blue-500"
                          : darkMode
                          ? "bg-gray-700 border-l-4 border-gray-500"
                          : "bg-gray-100 border-l-4 border-gray-400"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`text-sm font-semibold px-2 py-1 rounded ${
                            msg.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {msg.role === "user" ? "User" : "System"}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    </div>
                  ))}

                  {/* AI Response */}
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode
                        ? "bg-green-900/30 border-l-4 border-green-500"
                        : "bg-green-50 border-l-4 border-green-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-semibold px-2 py-1 rounded bg-green-500 text-white">
                        AI Assistant
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap break-words">
                      {selectedLog.aiResponse}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedLog(null)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    deleteChatLog(selectedLog._id);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
