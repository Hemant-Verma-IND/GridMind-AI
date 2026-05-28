"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGridState } from "../../context/GridStateContext";
import { X, Send, Sparkles, User } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIAssistant() {
  const { state } = useGridState();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi, I am your GridMind GM Assistant. I am monitoring your energy patterns. Ask me anything about optimizing your loads.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickChips = [
    "What is my recommended task schedule?",
    "Why is my efficiency score changed?",
    "How is my EV helping the grid?",
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const updatedMessages = [...messages, { sender: "user", text } as Message];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, gridState: state }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Communication timeout. Please check your internet connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, lineIndex) => {
      const segments = line.split(/(\*\*.*?\*\*)/g);
      const parsedLine = segments.map((segment, segmentIndex) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={segmentIndex} className="font-extrabold text-[#119785]">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return segment;
      });
      return (
        <span key={lineIndex} className="block min-h-[1.2em]">
          {parsedLine}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <div className="relative w-16 h-16">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-full rounded-full overflow-hidden border-2 border-[#119785] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-[0.95] transition-all duration-200 flex items-center justify-center bg-white cursor-pointer"
          >
            <img 
              src="/images/gm-assistant.png" 
              alt="GM Assistant Bot" 
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </button>
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 z-10 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>
      )}

      {isOpen && (
        <div className="w-[360px] h-[500px] bg-white border border-stone-250 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-200">
          <div className="bg-[#0266A4] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <img 
                  src="/images/gm-assistant.png" 
                  alt="GM Assistant Small Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wide">GM Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-white/80 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 border border-[#0266A4] shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse" />
                  <span>Real-time model active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 border border-stone-200">
                  {msg.sender === "user" ? (
                    <div className="w-full h-full bg-stone-250 text-stone-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  ) : (
                    <img 
                      src="/images/gm-assistant.png" 
                      alt="GM Assistant Avatar" 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${msg.sender === "user" ? "bg-[#119785] text-white rounded-tr-none" : "bg-white border border-stone-250 rounded-tl-none text-[#1E2522]"}`}>
                  {renderFormattedText(msg.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 border border-stone-200">
                  <img 
                    src="/images/gm-assistant.png" 
                    alt="GM Assistant Avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-3 bg-white border border-stone-250 rounded-2xl rounded-tl-none text-stone-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 bg-white border-t border-stone-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickChips.map((chip, index) => (
              <button key={index} onClick={() => handleSendMessage(chip)} className="text-[10px] font-bold border border-[#119785]/20 text-[#119785] bg-[#119785]/5 hover:bg-[#119785] hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-150 flex-shrink-0 cursor-pointer">
                {chip}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-stone-150 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask GM Assistant a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
            />
            <button onClick={() => handleSendMessage(input)} className="p-2 bg-[#119785] text-white hover:bg-[#0D7F6F] rounded-xl transition-colors cursor-pointer">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}