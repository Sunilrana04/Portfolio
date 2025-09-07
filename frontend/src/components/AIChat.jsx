// src/components/AIChat.jsx
import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      role: "bot",
      content: "👋 Hi! I'm your AI assistant. You can ask me about Sunil Rana, his skills, projects, or how to connect with him.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const suggestions = [
    "Tell me about Sunil Rana",
    "Show me projects",
    "What are your skills?",
    "How can I contact you?",
  ];

  useEffect(() => {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  function pushMessage(role, content) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, content },
    ]);
  }

  // ✅ Backend Integrated send function
  async function handleSend(text = input) {
    if (!text.trim()) return;
    const newMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTyping(true);

    try {
      // ✅ Intercept "latest project" prompt
      if (text.toLowerCase().includes("latest project")) {
        setTyping(false);
        return pushMessage(
          "bot",
          "🌟 Sunil Rana's latest project is 'Excel Analysis Platform (MERN + ML)'. Developed a full-stack MERN app to upload Excel files and provide insights, charts, summaries, row-level data, metadata, and analytics. Implemented JWT authentication with email-based password reset and integrated machine learning for advanced data insights."
        );
      }

      // Existing backend call remains unchanged
      
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await res.json();
      setTyping(false);
      pushMessage("bot", data.reply);
    } catch (err) {
      setTyping(false);
      pushMessage(
        "bot",
        "⚠️ Sorry, I couldn't connect to the server. Please try again later."
      );
    }
  }

  function handleEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div>
      {/* Floating Bot Icon with Intermediate Speed Animation */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
          style={{ 
            background: "transparent",
            animation: "bounce 4s ease-in-out infinite"
          }}
        >
          <img
            src="bot.png"
            alt="Chat Bot"
            className="w-16 h-16 object-contain"
            style={{ filter: "drop-shadow(0 5px 12px rgba(99, 102, 241, 0.6))" }}
          />
        </button>
      )}
      
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white dark:bg-gray-900 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
            <span className="font-semibold text-sm">AI Assistant</span>
            <button
              onClick={() => {
                setOpen(false);
                setMessages([
                  {
                    id: Date.now(),
                    role: "bot",
                    content: "👋 Hi! I'm your AI assistant. You can ask me about Sunil Rana, his skills, projects, or how to connect with him.",
                  },
                ]);
              }}
              className="hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-indigo-500"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm shadow-sm transition ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "mr-auto bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {m.content}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="mr-auto bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
              </div>
            )}
          </div>

          {/* Suggestions (only at start) */}
          {messages.length === 1 && (
            <div className="p-3 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-indigo-400"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t dark:border-gray-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 outline-none text-sm"
            />
            <button
              onClick={() => handleSend()}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      
      {/* Intermediate Speed CSS animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            20% {
              transform: translateY(-12px) rotate(2deg);
            }
            40% {
              transform: translateY(-8px) rotate(-2deg);
            }
            60% {
              transform: translateY(-14px) rotate(3deg);
            }
            80% {
              transform: translateY(-6px) rotate(-1deg);
            }
          }
        `}
      </style>
    </div>
  ); 
}
