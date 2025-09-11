"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBell, FaCog } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-surface/90 sticky top-2 z-50">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/icon.png"
          alt="Arrivado, Jordan S."
          width={70}
          height={25}
          priority
        />
      </Link>

      {/* Center: Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
        {/* Portfolio Button */}
        <Link
          href="/"
          className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105 ${
            pathname !== "/chatbot"
              ? "bg-[#E5D8C2] text-[#111111] shadow-[#E5D8C2]/15"
              : "bg-surface text-text-secondary border border-gray-700 hover:bg-gray-700 hover:text-text-primary"
          }`}
        >
          Portfolio
        </Link>

        {/* Chatbot Button */}
        <Link
          href="/chatbot"
          className={`px-5 py-2 rounded-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105 ${
            pathname === "/chatbot"
              ? "bg-[#E5D8C2] text-[#111111] shadow-[#E5D8C2]/15"
              : "bg-surface text-text-secondary border border-gray-700 hover:bg-[#E5D8C2] hover:text-[#232323]"
          }`}
        >
          Chatbot
        </Link>
      </div>

      {/* Right: Circle Buttons */}
      <div className="flex gap-3">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-gray-700 hover:bg-gray-700 transition-colors">
          <FaBell className="text-[#E5D8C2] hover:text-white" size={18} />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-gray-700 hover:bg-gray-700 transition-colors">
          <FaCog className="text-[#E5D8C2] hover:text-white" size={18} />
        </button>
      </div>
    </nav>
  );
}
