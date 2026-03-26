import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/types";

interface Props {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatBox({ messages, onSend, loading }: Props) {
  const [input, setInput] = useState("");
  const [composing, setComposing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-8">메시지를 입력해 대화를 시작하세요</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-indigo-600 text-white rounded-br-sm"
                : "bg-slate-100 text-slate-800 rounded-bl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-4 py-2.5 rounded-2xl rounded-bl-sm">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={(e) => { if (e.key === "Enter" && !composing) { e.preventDefault(); handleSend(); } }}
          placeholder="메시지를 입력하세요"
          className="flex-1 px-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition"
        >
          전송
        </button>
      </div>
    </div>
  );
}