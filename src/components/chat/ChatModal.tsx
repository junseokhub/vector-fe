"use client";

import { useChat } from "@/hooks/chat/useChat";import ChatBox from "./ChatBox";

interface Props { projectKey: string; userId: number; onClose: () => void }

export default function ChatModal({ projectKey, userId, onClose }: Props) {
  const { messages, sendMessage, loading } = useChat(projectKey, userId);

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-semibold text-sm">AI 채팅</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition text-sm font-bold">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatBox messages={messages} onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}