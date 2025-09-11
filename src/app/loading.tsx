"use client";
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#232323]">
      {/* Elegant multi-ring spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#E5D8C2] border-[#3a3a3a] animate-spin-slow"></div>
        <div className="absolute inset-0 rounded-full border-4 border-l-[#E5D8C2] border-[#3a3a3a] animate-spin-slow animation-delay-150"></div>
        <div className="absolute inset-0 rounded-full border-4 border-b-[#E5D8C2] border-[#3a3a3a] animate-spin-slow animation-delay-300"></div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-[#E5D8C2] text-lg font-semibold animate-pulse">
        Loading...
      </p>

      {/* Custom Tailwind animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
