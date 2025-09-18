"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ButtonProps = {
  href: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  rounded?: boolean;
};

export default function Button({
  href,
  title,
  children,
  className,
  rounded,
}: ButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={title}
      className={
        rounded
          ? `w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors ${
              isActive
                ? "bg-[#E5D8C2] text-[#303030] shadow-md shadow-[#E5D8C2]/15"
                : "bg-surface text-text-secondary border border-[#E5D8C2]/40 hover:bg-[#E5D8C2] hover:text-[#232323]"
            }`
          : `${
              className ?? ""
            } px-5 py-2 rounded-lg font-medium shadow-md transition-transform duration-300 hover:scale-105 ${
              isActive
                ? "bg-[#E5D8C2] text-[#111111] shadow-[#E5D8C2]/15"
                : "bg-surface text-text-secondary border border-[#E5D8C2]/40 hover:bg-[#E5D8C2] hover:text-[#232323]"
            }`
      }
    >
      {children}
    </Link>
  );
}
