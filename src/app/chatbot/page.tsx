"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MiniRobot from "./MiniRobot";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

type Personality = "Professional" | "Casual" | "Funny";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [personality, setPersonality] = useState<Personality>("Funny");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, personality }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data: ApiResponse = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.message ?? "Sorry, I couldn't respond.",
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const introText: string = `Hey there 👋 I’m Cuteness — Jordan Arrivado’s personal AI sidekick. 
  Think of me as his hype-agent, portfolio tour guide 🤖. 
  Salary? Please. Jordan can barely afford good coffee ☕—yet here I am, making his projects sound cooler than they actually are (don’t tell him I said that🤫).`;

  return (
    <div className="flex h-[81vh] p-6 gap-1">
      {/* LEFT SIDE - Robot + Intro */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex-shrink-0">
          <MiniRobot />
        </div>
        <div className="text-[#E5D8C2] max-w-sm">
          <p className="text-base leading-relaxed whitespace-pre-line">
            {introText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02, duration: 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: introText.length * 0.02 + 0.5, duration: 1 }}
            className="mt-3 italic text-sm opacity-80"
          >
            ✨ Motto: Powered by code, fueled by coffee, paid in compliments.
          </motion.p>
        </div>
      </div>

      {/* RIGHT SIDE - Chatbox */}
      <div className="w-1/2 flex">
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotate: -5,
            boxShadow: "0 0 0px rgba(229,216,194,0.35)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            boxShadow: "0 0 30px rgba(229,216,194,0)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
          className="w-full max-w-md mx-auto flex flex-col h-[80vh] rounded-3xl bg-[#232323] shadow-2xl overflow-hidden relative border border-[#E5D8C2]/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#232323] p-6 rounded-t-3xl border-b border-[#E5D8C2]/20 shadow-inner">
            <h1 className="text-[#E5D8C2] text-2xl font-extrabold tracking-wider drop-shadow-md">
              Jordan’s Agent
            </h1>
            <div className="relative">
              <select
                name="personalities"
                className="appearance-none bg-[#313131] text-[#E5D8C2] text-sm font-medium px-4 py-2 rounded-xl border border-[#E5D8C2]/30 focus:outline-none focus:ring-2 focus:ring-[#E5D8C2]/60 transition cursor-pointer shadow-md"
                value={personality}
                onChange={(e) => setPersonality(e.target.value as Personality)}
              >
                <option value="" disabled>
                  Personality
                </option>
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Funny">Funny</option>
              </select>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 relative overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#E5D8C2]/30 scrollbar-track-[#232323]"
          >
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                messages.length === 0
                  ? "opacity-80 scale-100"
                  : "opacity-10 scale-90"
              } animate-bounce-slow`}
            >
              <Image
                src="/robot.png"
                alt="Robot Avatar"
                width={180}
                height={180}
                className="drop-shadow-[0_0_10px_#E5D8C2]"
              />
              <p className="mt-3 italic text-sm opacity-80 text-center">
                Powered by AI
              </p>
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[75%] break-words transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-[#E5D8C2] text-[#232323] rounded-br-none shadow-md hover:shadow-lg"
                      : "bg-gradient-to-br from-[#2c271f]/90 to-[#1c1c1c]/80 backdrop-blur-md text-[#E5D8C2] border border-[#E5D8C2]/40 rounded-bl-none shadow-inner hover:border-[#E5D8C2]/70"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <p>
                      {msg.content.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02, duration: 0.03 }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </p>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl max-w-[75%] bg-gray-700 text-white animate-pulse">
                  Typing<span className="animate-bounce">...</span>
                </div>
              </div>
            )}

            {error && <div className="text-red-400 text-sm">{error}</div>}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-[#E5D8C2]/20 px-5 py-6 bg-[#232323] rounded-b-3xl">
            <input
              className="flex-1 px-6 py-4 rounded-2xl bg-[#313131] text-white placeholder-[#E5D8C2]/70 focus:outline-none focus:ring-2 focus:ring-[#E5D8C2]/60 shadow-inner"
              placeholder="Ask about me..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="ml-3 text-xl font-bold text-[#232323] bg-[#E5D8C2] py-3 px-5 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
