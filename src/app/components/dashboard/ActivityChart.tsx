interface ActivityData {
  _id: string;
  count: number;
}

interface ActivityChartProps {
  data: ActivityData[];
  darkMode: boolean;
  title?: string;
  icon?: React.ReactNode;
  height?: number;
  showTotal?: boolean;
  colorGradient?: {
    from: string;
    to: string;
  };
}

export function ActivityChart({
  data,
  darkMode,
  title = "Daily Activity (Last 7 Days)",
  icon,
  height = 48,
  showTotal = true,
  colorGradient = { from: "from-blue-600", to: "to-blue-400" },
}: ActivityChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  const avgCount = data.length > 0 ? Math.round(totalCount / data.length) : 0;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        day: date.getDate(),
        full: date.toLocaleDateString(),
      };
    } catch {
      return {
        weekday: "N/A",
        day: 0,
        full: "Invalid Date",
      };
    }
  };

  if (data.length === 0) {
    return (
      <div
        className={`rounded-lg p-6 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm border`}
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </h3>
        <div className="text-center text-gray-500 py-12">
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {icon}
          </div>
          <p className="text-lg font-medium mb-1">No activity data</p>
          <p className="text-sm">
            Activity data will appear here once available
          </p>
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </h3>
        {showTotal && (
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div>
          Average: <span className="font-semibold">{avgCount}</span> per day
        </div>
        <div>
          Peak: <span className="font-semibold">{maxCount}</span>
        </div>
      </div>

      {/* Chart */}
      <div
        className={`flex items-end justify-between space-x-2 h-${height} mb-4`}
      >
        {data.map((day, index) => {
          const chartHeight = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
          const dateInfo = formatDate(day._id);
          const isToday =
            new Date().toDateString() === new Date(day._id).toDateString();
          const isWeekend =
            new Date(day._id).getDay() === 0 ||
            new Date(day._id).getDay() === 6;

          return (
            <div
              key={day._id}
              className="flex-1 flex flex-col items-center group"
            >
              {/* Count Label */}
              <div
                className={`text-xs font-semibold mb-2 transition-all duration-200 ${
                  day.count === maxCount
                    ? "text-blue-600 scale-110"
                    : "text-blue-500"
                } group-hover:scale-125`}
              >
                {day.count > 0 ? day.count : ""}
              </div>

              {/* Bar */}
              <div
                className={`w-full bg-gradient-to-t ${colorGradient.from} ${
                  colorGradient.to
                } rounded-t-lg 
                  transition-all duration-700 ease-out cursor-pointer group-hover:opacity-80 
                  ${isToday ? "ring-2 ring-blue-400 ring-opacity-50" : ""}
                  ${chartHeight < 8 && day.count > 0 ? "min-h-2" : ""}`}
                style={{
                  height: `${Math.max(chartHeight, day.count > 0 ? 8 : 0)}%`,
                  transform: "scaleY(1)",
                  transformOrigin: "bottom",
                }}
                title={`${day.count} conversations on ${dateInfo.full}`}
              />

              {/* Date Labels */}
              <div className="text-xs text-gray-500 text-center mt-2 space-y-1">
                <div
                  className={`font-medium ${isToday ? "text-blue-600" : ""} ${
                    isWeekend ? "text-orange-500" : ""
                  }`}
                >
                  {dateInfo.weekday}
                </div>
                <div className="text-gray-400">{dateInfo.day}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Indicators */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span>Weekend</span>
        </div>
        <div className="flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${
              darkMode ? "bg-gray-600" : "bg-gray-400"
            }`}
          />
          <span>No activity</span>
        </div>
      </div>

      {/* Trend Analysis */}
      {data.length >= 2 && (
        <div
          className={`mt-4 pt-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {(() => {
            const recent = data.slice(-3).reduce((sum, d) => sum + d.count, 0);
            const previous = data
              .slice(-6, -3)
              .reduce((sum, d) => sum + d.count, 0);
            const trend =
              previous > 0 ? ((recent - previous) / previous) * 100 : 0;
            const isPositive = trend >= 0;

            return (
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-gray-500">Trend:</span>
                <span
                  className={`font-semibold flex items-center space-x-1 ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span
                    className={`inline-block w-0 h-0 border-l-2 border-r-2 border-transparent ${
                      isPositive
                        ? "border-b-2 border-b-green-600"
                        : "border-t-2 border-t-red-600"
                    }`}
                  />
                  <span>
                    {isPositive ? "+" : ""}
                    {trend.toFixed(1)}%
                  </span>
                </span>
                <span className="text-gray-400 text-xs">
                  vs previous period
                </span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
