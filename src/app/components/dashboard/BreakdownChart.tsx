interface BreakdownItem {
  _id: string;
  count: number;
}

interface BreakdownChartProps {
  title: string;
  data: BreakdownItem[];
  total: number;
  darkMode: boolean;
  maxItems?: number;
  icon?: React.ReactNode;
  showPercentage?: boolean;
  colorScheme?: "default" | "warm" | "cool" | "monochrome";
}

export function BreakdownChart({
  title,
  data,
  total,
  darkMode,
  maxItems = 5,
  icon,
  showPercentage = true,
  colorScheme = "default",
}: BreakdownChartProps) {
  const getColorScheme = (scheme: string) => {
    switch (scheme) {
      case "warm":
        return [
          "bg-red-500",
          "bg-orange-500",
          "bg-yellow-500",
          "bg-pink-500",
          "bg-rose-500",
          "bg-amber-500",
          "bg-orange-400",
          "bg-red-400",
        ];
      case "cool":
        return [
          "bg-blue-500",
          "bg-cyan-500",
          "bg-teal-500",
          "bg-indigo-500",
          "bg-sky-500",
          "bg-blue-400",
          "bg-cyan-400",
          "bg-teal-400",
        ];
      case "monochrome":
        return [
          "bg-gray-700",
          "bg-gray-600",
          "bg-gray-500",
          "bg-gray-400",
          "bg-gray-800",
          "bg-slate-600",
          "bg-slate-500",
          "bg-slate-400",
        ];
      default:
        return [
          "bg-blue-500",
          "bg-green-500",
          "bg-yellow-500",
          "bg-red-500",
          "bg-purple-500",
          "bg-pink-500",
          "bg-indigo-500",
          "bg-teal-500",
        ];
    }
  };

  const colors = getColorScheme(colorScheme);
  const displayData = data.slice(0, maxItems);
  const hasMoreItems = data.length > maxItems;

  if (data.length === 0) {
    return (
      <div
        className={`rounded-lg p-6 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm border`}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {icon}
          </div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-6 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-sm border transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
          }`}
        >
          {data.length} items
        </span>
      </div>

      <div className="space-y-4">
        {displayData.map((item, index) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;
          const isLargest = index === 0 && data.length > 1;

          return (
            <div key={item._id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      colors[index % colors.length]
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isLargest ? "text-blue-600 dark:text-blue-400" : ""
                    }`}
                  >
                    {item._id || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {showPercentage && (
                    <span className="text-gray-500 text-xs">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                  <span
                    className={`font-semibold ${
                      isLargest ? "text-blue-600 dark:text-blue-400" : ""
                    }`}
                  >
                    {item.count.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className={`h-2 rounded-full overflow-hidden ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    colors[index % colors.length]
                  } ${isLargest ? "opacity-100" : "opacity-80"}`}
                  style={{
                    width: `${percentage}%`,
                    transform: `scaleX(${percentage / 100})`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Show remaining items count */}
      {hasMoreItems && (
        <div
          className={`mt-4 pt-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="text-center">
            <span className="text-sm text-gray-500">
              +{data.length - maxItems} more items
            </span>
            <div className="mt-2">
              <div
                className={`inline-flex space-x-1 ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } rounded-full px-3 py-1`}
              >
                {data
                  .slice(maxItems, Math.min(maxItems + 3, data.length))
                  .map((item, index) => (
                    <div key={item._id} className="text-xs text-gray-500">
                      {item._id}
                      {index < 2 && data.length > maxItems + index + 1
                        ? ","
                        : ""}
                    </div>
                  ))}
                {data.length > maxItems + 3 && (
                  <div className="text-xs text-gray-500">...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div
        className={`mt-4 pt-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } text-center`}
      >
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">{total.toLocaleString()}</span>{" "}
          items
        </p>
      </div>
    </div>
  );
}
