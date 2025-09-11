"use client";

import { useEffect } from "react";
import { FaRobot } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden">
      {/* Robot icon */}
      <FaRobot className="text-[#E5D8C2] text-8xl mb-6 animate-bounce" />

      {/* Error message */}
      <h1 className="text-4xl font-extrabold text-[#E5D8C2] mb-4 animate-glitch">
        Oops! Something went wrong.
      </h1>
      <p className="text-[#E5D8C2] mb-6 max-w-md animate-fadeIn delay-150">
        {error.message || "Our little robot ran into a problem. Try again?"}
      </p>

      {/* Retry button */}
      <button
        className="px-6 py-3 bg-[#E5D8C2] text-black font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
        onClick={() => reset()}
      >
        Try Again
      </button>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glitch {
          0% {
            text-shadow: 2px 0 red, -2px 0 cyan;
          }
          20% {
            text-shadow: -2px 0 red, 2px 0 cyan;
          }
          40% {
            text-shadow: 2px 0 red, -2px 0 cyan;
          }
          60% {
            text-shadow: -2px 0 red, 2px 0 cyan;
          }
          80% {
            text-shadow: 2px 0 red, -2px 0 cyan;
          }
          100% {
            text-shadow: none;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-fadeIn.delay-150 {
          animation-delay: 0.15s;
        }
        .animate-glitch {
          animation: glitch 1s infinite;
        }
      `}</style>
    </div>
  );
}
