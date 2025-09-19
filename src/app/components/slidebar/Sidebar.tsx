"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { pages } from "./pages";
import SidebarLink from "./SidebarLink";
import SidebarNav from "./SidebarArrow";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isSidebar = ["/about", "/skills", "/projects"].includes(pathname);

  const [currentPage, setCurrentPage] = useState(
    Math.max(
      pages.findIndex((p) => pathname === `/${p.link.toLowerCase()}`),
      0
    )
  );

  // Hide sidebar for specific routes
  if (pathname === "/chatbot" || pathname === "/dashboard") return null;

  const goPrev = () => {
    if (currentPage > 0) {
      const newIndex = currentPage - 1;
      setCurrentPage(newIndex);
      router.push(`/${pages[newIndex].link.toLowerCase()}`);
    }
  };

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      const newIndex = currentPage + 1;
      setCurrentPage(newIndex);
      router.push(`/${pages[newIndex].link.toLowerCase()}`);
    }
  };

  return (
    <aside className="hidden md:flex flex-col gap-3 fixed right-6 top-1/3 items-center z-50">
      {pages.map((item, i) => (
        <SidebarLink
          key={i}
          link={item.link}
          icon={item.icon}
          isSidebar={isSidebar}
          title={item.link}
        />
      ))}

      <SidebarNav
        currentPage={currentPage}
        totalPages={pages.length}
        goPrev={goPrev}
        goNext={goNext}
      />
    </aside>
  );
}
