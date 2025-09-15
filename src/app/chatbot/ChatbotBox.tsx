"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}
interface ApiResponse {
  message?: string;
  error?: string;
}
export type Personality = "Professional" | "Casual" | "Funny";

export default function ChatbotBox() {
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

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data: ApiResponse = await res.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.message ?? "Sorry, I couldn't respond.",
      };
      setMessages([...updatedMessages, aiMessage]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="
        w-full h-full flex flex-col
        sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-[85vh]
        rounded-2xl sm:rounded-3xl 
        bg-[#232323] shadow-2xl 
        overflow-hidden relative 
        border border-[#E5D8C2]/10
      "
    >
      <ChatHeader personality={personality} setPersonality={setPersonality} />

      {/* Chat messages container */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
        <ChatMessages
          chatRef={chatRef}
          messages={messages}
          loading={loading}
          error={error}
        />
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        loading={loading}
      />
    </motion.div>
  );
}
