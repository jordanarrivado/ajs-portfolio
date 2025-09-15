"use client";

import ChatbotBox from "./ChatbotBox";
import ChatIntro from "./ChatIntro";
import MiniRobot from "./MiniRobot";

export default function ChatPage() {
  return (
    <div
      className="
        w-full min-h-screen text-white 
        p-3 sm:p-4 lg:p-6 gap-6
        flex flex-col
        lg:grid lg:grid-cols-2
        xl:flex xl:flex-row
      "
    >
      {/* MiniRobot */}
      <div
        className="
          flex justify-center items-center
          lg:col-span-1
        "
      >
        <MiniRobot />
      </div>

      {/* Intro */}
      <div
        className="
          flex flex-col justify-center items-center
          lg:col-span-1
        "
      >
        <ChatIntro />
      </div>

      {/* Chatbot */}
      <div
        className="
          flex flex-col
          lg:col-span-2
          w-full
          h-full
          overflow-hidden
          
        "
        style={{ minHeight: "70vh" }}
      >
        <ChatbotBox />
      </div>
    </div>
  );
}
