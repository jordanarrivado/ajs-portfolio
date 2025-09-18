"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  link: string;
  icon: IconType;
  isSidebar: boolean;
  title: string;
}

export default function SidebarLink({
  link,
  icon: Icon,
  isSidebar,
  title,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const href = `/${link.toLowerCase()}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={title}
      className={`flex items-center justify-center gap-2 text-center text-sm shadow transition
        ${
          isSidebar
            ? "w-10 h-10 rounded-full self-end"
            : "w-32 px-7 py-3 rounded-lg"
        }
        ${
          isActive
            ? "bg-[#E5D8C2] text-[#303030] shadow-[#E5D8C2]/15"
            : "bg-[#252525] text-text-secondary text-[#E5D8C2] border border-[#E5D8C2]/40 hover:bg-[#E5D8C2] hover:text-[#232323]"
        }`}
    >
      {isSidebar ? <Icon className="text-lg" /> : link}
    </Link>
  );
}
