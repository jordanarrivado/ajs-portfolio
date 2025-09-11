"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const pages = ["About", "Skills", "Projects"];
  const pathname = usePathname();
  const router = useRouter();

  // track current page index
  const [currentPage, setCurrentPage] = useState(
    Math.max(
      pages.findIndex((p) => pathname === `/${p.toLowerCase()}`),
      0
    )
  );
  if (pathname === "/chatbot") {
    return null;
  }

  const goPrev = () => {
    if (currentPage > 0) {
      const newIndex = currentPage - 1;
      setCurrentPage(newIndex);
      router.push(`/${pages[newIndex].toLowerCase()}`);
    }
  };

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      const newIndex = currentPage + 1;
      setCurrentPage(newIndex);
      router.push(`/${pages[newIndex].toLowerCase()}`);
    }
  };

  return (
    <aside className="hidden md:flex flex-col gap-3 fixed right-6 top-1/3 items-center z-50">
      {pages.map((item, i) => {
        const href = `/${item.toLowerCase()}`;
        const isActive = pathname === href;

        return (
          <Link
            key={i}
            href={href}
            className={`w-32 text-center px-7 py-3 rounded-lg shadow transition text-sm ${
              isActive
                ? "bg-[#E5D8C2] text-[#111111] shadow-[#E5D8C2]/15"
                : "bg-[#25252525] text-text-secondary border border-gray-700 hover:bg-[#E5D8C2] hover:text-[#232323]"
            }`}
          >
            {item}
          </Link>
        );
      })}

      {/* Navigation Arrows */}
      <div className="flex items-center gap-4 mt-50 text-white">
        <button
          className="p-2 rounded-full bg-[#252525] hover:bg-[#E5D8C2] hover:text-[#232323] transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goPrev}
          disabled={currentPage === 0}
        >
          <FaArrowLeft />
        </button>

        <span className="text-sm font-medium">
          {currentPage + 1} / {pages.length}
        </span>

        <button
          className="p-2 rounded-full bg-[#252525] hover:bg-[#E5D8C2] hover:text-[#232323] transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
}
