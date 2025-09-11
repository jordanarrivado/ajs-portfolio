"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Sparkle = {
  id: number;
  x: number;
  y: number;
};

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles((prev) => [...prev.slice(-20), newSparkle]); // keep last 20
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            background: getRandomColor(),
            boxShadow: `0 0 8px ${getRandomColor()}`,
          }}
        />
      ))}
    </div>
  );
}

function getRandomColor() {
  const colors = ["#E5D8C2", "#FFEB98", "#80CBFA", "#D6796A", "#ffffff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
