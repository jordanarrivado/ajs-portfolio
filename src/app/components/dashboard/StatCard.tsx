interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  darkMode: boolean;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon,
  color,
  darkMode,
  subtitle,
  trend,
}: StatCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-sm border transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color} mb-1`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          {trend && (
            <div
              className={`flex items-center text-xs mt-2 ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              <span
                className={`inline-block w-0 h-0 border-l-2 border-r-2 border-transparent mr-1 ${
                  trend.isPositive
                    ? "border-b-2 border-b-green-600"
                    : "border-t-2 border-t-red-600"
                }`}
              />
              {Math.abs(trend.value)}% from last period
            </div>
          )}
        </div>
        <div className="opacity-75 ml-4">{icon}</div>
      </div>
    </div>
  );
}
