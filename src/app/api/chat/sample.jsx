import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import "./App.css";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  baseURL: "https://models.github.ai/inference",
  dangerouslyAllowBrowser: false,
});

function App() {
  const [messages, setMessages] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const res = await openai.chat.completions.create({
        model: "openai/gpt-4.1",
        messages: newMessages,
        temperature: 1,
        top_p: 1,
      });

      const aiReply = res.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">CHAT GEMINI</div>
      {/*
<div className="chat-messages" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${
              msg.role === "user" ? "user-message" : "ai-message"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {error && <div className="message ai-message">{error}</div>}
      </div>
      */}
      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${
              msg.role === "user" ? "user-message" : "ai-message"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {error && <div className="message ai-message">{error}</div>}
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Type your message..."
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
        <button onClick={sendMessage} disabled={loading || !message.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
