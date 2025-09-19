import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Log Dashboard | Jordan Arrivado Portfolio",
  description:
    "Admin dashboard for viewing and analyzing chat bot interactions",
  robots: "noindex, nofollow", // Prevent indexing of admin dashboard
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
