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
  const [connectionStatus, setConnectionStatus] = useState("checking");
  const boxRef = useRef(null);

  const suggestions = [
    "Tell me about Sunil Rana",
    "What are your skills?",
    "Show me your projects",
    "How can I contact you?",
  ];

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Check if backend is running
  const checkBackendConnection = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/health");
      if (response.ok) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
      }
    } catch (error) {
      setConnectionStatus("disconnected");
      console.log("Backend not running");
    }
  };

  const pushMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, content },
    ]);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    // Add user message
    const newMessage = { role: "user", content: text };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          messages: updatedMessages 
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.reply) {
        pushMessage("bot", data.reply);
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      console.error("❌ Chat Error:", error);
      
      let errorMessage = "⚠️ Service temporarily unavailable. ";
      
      if (error.message.includes("Failed to fetch")) {
        errorMessage += "Backend server is not running. ";
      } else if (error.message.includes("Server error")) {
        errorMessage += "Server error occurred. ";
      }
      
      errorMessage += "Please try again later.";
      pushMessage("bot", errorMessage);
    } finally {
      setTyping(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setOpen(false);
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          role: "bot",
          content: "👋 Hi! I'm your AI assistant. You can ask me about Sunil Rana, his skills, projects, or how to connect with him.",
        },
      ]);
    }, 300);
  };

  return (
    <div>
      {/* Floating Bot Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
          style={{
            background: "transparent",
            animation: "bounce 4s ease-in-out infinite",
          }}
        >
          <img
            src="/bot.png"
            alt="Chat Bot"
            className="w-16 h-16 object-contain"
            style={{
              filter: "drop-shadow(0 5px 12px rgba(99, 102, 241, 0.6))",
            }}
          />
          {/* Connection status indicator */}
          <div 
            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              connectionStatus === "connected" ? "bg-green-500" : 
              connectionStatus === "disconnected" ? "bg-red-500" : "bg-yellow-500"
            }`}
          />
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white dark:bg-gray-900 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col animate-fadeIn z-50">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">AI Assistant</span>
              <div 
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "connected" ? "bg-green-300" : 
                  connectionStatus === "disconnected" ? "bg-red-300" : "bg-yellow-300"
                }`}
              />
            </div>
            <button
              onClick={resetChat}
              className="hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`px-4 py-2 rounded-xl max-w-[85%] text-sm shadow-sm transition-all ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "mr-auto bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                }`}
              >
                {m.content}
              </div>
            ))}

            {typing && (
              <div className="mr-auto bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="p-3 flex flex-wrap gap-2 border-t dark:border-gray-700">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 text-xs rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t dark:border-gray-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none text-sm focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
              disabled={typing}
            />
            <button
              onClick={() => handleSend()}
              disabled={typing || !input.trim()}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Bounce Animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            20% { transform: translateY(-12px) rotate(2deg); }
            40% { transform: translateY(-8px) rotate(-2deg); }
            60% { transform: translateY(-14px) rotate(3deg); }
            80% { transform: translateY(-6px) rotate(-1deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}