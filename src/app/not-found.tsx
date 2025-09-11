"use client";

import { useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden">
      {/* Main content */}
      <FaRobot className="text-[#E5D8C2] text-8xl mb-6 animate-bounce" />
      <h1 className="text-5xl font-extrabold text-[#E5D8C2] mb-4 animate-fadeIn">
        404
      </h1>
      <p className="text-{#E5D8C2} mb-6 max-w-md animate-fadeIn delay-150">
        Oops! The page you are looking for does not exist. Maybe the robot took
        it?
      </p>
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
