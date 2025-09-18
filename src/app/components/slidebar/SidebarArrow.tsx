"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface SidebarNavProps {
  currentPage: number;
  totalPages: number;
  goPrev: () => void;
  goNext: () => void;
}

export default function SidebarNav({
  currentPage,
  totalPages,
  goPrev,
  goNext,
}: SidebarNavProps) {
  const pathname = usePathname();
  const url = ["/about", "/skills", "/projects"];
  const isActive = url.includes(pathname);

  return (
    <div>
      {!isActive && (
        <div className="flex items-center gap-4 mt-50 text-white">
          <button
            className="p-2 rounded-full bg-[#252525] hover:bg-[#E5D8C2] hover:text-[#232323] transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goPrev}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>

          <span className="text-sm font-medium">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            className="p-2 rounded-full bg-[#252525] hover:bg-[#E5D8C2] hover:text-[#232323] transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
