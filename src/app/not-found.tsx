"use client";

import { useRouter } from "next/navigation";
import { FaTools } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden">
      {/* Icon */}
      <FaTools className="text-[#E5D8C2] text-7xl sm:text-8xl mb-6 animate-bounce" />

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E5D8C2] mb-4 animate-fadeIn">
        🚧 Coming Soon 🚧
      </h1>

      {/* Subtitle */}
      <p className="text-[#E5D8C2] text-base sm:text-lg mb-6 max-w-md animate-fadeIn delay-150">
        This page is currently under construction. Check back later for updates!
      </p>

      {/* Button */}
      <button
        className="px-6 py-3 bg-[#E5D8C2] text-[#232323] font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
        onClick={() => router.push("/")}
      >
        Go Back Home
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
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-fadeIn.delay-150 {
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
}
