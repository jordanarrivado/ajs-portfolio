import { MessageSquare } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <MessageSquare className="w-12 h-12 text-blue-500 animate-bounce" />
        </div>
        <div className="space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-lg font-medium">Loading Dashboard...</p>
          <p className="text-gray-400 text-sm">
            Fetching chat logs and analytics
          </p>
        </div>
      </div>
    </div>
  );
}
