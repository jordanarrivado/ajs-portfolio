import { RefObject } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: { role: "user" | "assistant"; content: string }[];
  chatRef: RefObject<HTMLDivElement | null>;
  loading: boolean;
  error: string | null;
}

export default function ChatMessages({
  messages,
  chatRef,
  loading,
  error,
}: Props) {
  return (
    <div
      ref={chatRef}
      className="
        flex-1 relative overflow-y-auto
        p-3 sm:p-4 md:p-6 h-[55vh] md:h-[67vh]
        space-y-2 sm:space-y-3 md:space-y-4
        scrollbar-thin scrollbar-thumb-[#E5D8C2]/30 scrollbar-track-[#232323]
      "
    >
      {/* Empty state robot */}
      <div
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          transition-all duration-700
          ${
            messages.length === 0
              ? "opacity-80 scale-100"
              : "opacity-10 scale-90"
          } 
          animate-bounce-slow
        `}
      >
        <Image
          src="/robot.png"
          alt="Robot Avatar"
          width={120}
          height={120}
          className="
            w-[120px] h-[120px] 
            sm:w-[160px] sm:h-[160px] 
            md:w-[180px] md:h-[180px] 
            drop-shadow-[0_0_10px_#E5D8C2]
          "
        />
        <p className="mt-2 sm:mt-3 italic text-xs sm:text-sm md:text-base opacity-80 text-center">
          Powered by AI
        </p>
      </div>

      {/* Messages */}
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} msg={msg} />
      ))}

      {/* Typing indicator */}
      {loading && (
        <div className="flex justify-start">
          <div
            className="
              p-2 sm:p-3 md:p-4 
              rounded-lg sm:rounded-xl 
              max-w-[90%] sm:max-w-[80%] md:max-w-[75%] 
              bg-gray-700 text-white 
              text-sm sm:text-base md:text-lg 
              animate-pulse
            "
          >
            Typing<span className="animate-bounce">...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-xs sm:text-sm md:text-base">
          {error}
        </div>
      )}
    </div>
  );
}
