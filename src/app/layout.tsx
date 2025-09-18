import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/slidebar/Sidebar";
import Footer from "./components/Footer";
import SparkleTrail from "./effects/SparkleTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "About Me | Jordan Arrivado",
  description: "Learn more about me, my background, skills, and projects.",
  keywords: [
    "About Me",
    "Profile",
    "Resume",
    "Portfolio",
    "Web Developer",
    "Chatbot",
    "AI Agent",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-[radial-gradient(circle_at_center,_rgba(40,40,40,0.9)_0%,_rgba(60,60,60,0.7)_40%,_rgba(90,90,90,0.5)_70%,_rgba(120,120,120,0.4)_100%)]`}
      >
        <SparkleTrail />

        {/* Navbar always visible at top */}
        <Navbar />

        <div className="flex min-h-screen">
          {/* Sidebar (hidden on mobile, visible on md+) */}
          <div className="hidden md:block">
            {" "}
            <Sidebar />{" "}
          </div>

          {/* Main content (full width on mobile, shrinks next to sidebar on md+) */}
          <main
            className="
              flex-1 
              w-full md:w-auto 
              p-4 sm:p-6 lg:p-2
              max-w-8xl mx-auto   
              overflow-auto
            "
          >
            {children}
          </main>
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}
