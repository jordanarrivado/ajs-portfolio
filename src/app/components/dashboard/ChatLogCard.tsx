import {
  Eye,
  Trash2,
  Smartphone,
  Monitor,
  MessageSquare,
  Bot,
} from "lucide-react";

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatLogCardProps {
  log: {
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
  };
  darkMode: boolean;
  onView: () => void;
  onDelete: () => void;
  formatDate: (timestamp: string) => string;
  isHighlighted?: boolean;
}

export function ChatLogCard({
  log,
  darkMode,
  onView,
  onDelete,
  formatDate,
  isHighlighted = false,
}: ChatLogCardProps) {
  const getDeviceIcon = (deviceType?: string) => {
    if (deviceType === "mobile")
      return <Smartphone className="w-4 h-4 text-gray-500" />;
    return <Monitor className="w-4 h-4 text-gray-500" />;
  };

  const getPersonalityColor = (personality?: string) => {
    switch (personality?.toLowerCase()) {
      case "funny":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "professional":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "friendly":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "helpful":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400";
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const messageCount = log.messages.length;
  const firstMessage = log.messages[0];

  return (
    <div
      className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 cursor-pointer ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-750 border-gray-700"
          : "bg-white hover:bg-gray-50 border-gray-200"
      } shadow-sm hover:shadow-md border ${
        isHighlighted ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
      onClick={onView}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getDeviceIcon(log.device.device?.type)}
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${getPersonalityColor(
              log.personality
            )}`}
          >
            {log.personality || "Default"}
          </span>
          {messageCount > 1 && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {messageCount} messages
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
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
              onDelete();
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

      {/* Content */}
      <div className="space-y-3">
        {/* User Message */}
        <div className="text-sm">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-blue-500">User</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {truncateText(firstMessage?.content || "No message")}
          </p>
        </div>

        {/* AI Response */}
        <div className="text-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-4 h-4 text-green-500" />
            <span className="font-medium text-green-500">AI Response</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {truncateText(log.aiResponse)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <span>{log.device.browser.name}</span>
            <span className="text-gray-400">•</span>
            <span>{log.device.os.name}</span>
          </div>
          <span className="font-medium">{formatDate(log.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
