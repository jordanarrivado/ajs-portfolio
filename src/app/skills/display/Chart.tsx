"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type DonutChartProps = {
  value: number;
  size?: number;
};

export default function DonutChart({ value, size = 80 }: DonutChartProps) {
  const data = [
    { name: "Confidence", value },
    { name: "Remaining", value: 100 - value },
  ];

  const getColor = (val: number) => {
    if (val >= 85) return "#22C55E"; // green
    if (val >= 70) return "#FACC15"; // amber
    return "#EF4444"; // red
  };

  const glowColor = getColor(value);

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={size} height={size}>
        <defs>
          {/* Soft glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size / 3.5}
          outerRadius={size / 2.2}
          paddingAngle={2}
          dataKey="value"
        >
          {/* Filled part with glow */}
          <Cell fill={glowColor} filter="url(#glow)" />
          {/* Background ring */}
          <Cell fill="rgba(255,255,255,0.08)" />
        </Pie>
      </PieChart>

      {/* Center text */}
      <span
        className="absolute text-xs font-semibold"
        style={{ color: glowColor, textShadow: `0 0 6px ${glowColor}55` }}
      >
        {value}%
      </span>
    </div>
  );
}
