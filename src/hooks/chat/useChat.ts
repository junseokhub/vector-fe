import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/storage";
import type { ChatMessage } from "@/types";

export function useChat(projectKey: string, userId: number) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const key = `chat_session_${projectKey}_${userId}`;
    const saved = sessionStorage.getItem(key) ?? uuidv4();
    sessionStorage.setItem(key, saved);
    setSessionId(saved);
  }, [projectKey, userId]);

  const sendMessage = async (text: string) => {
    if (!sessionId) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.get("accessToken")}`,
        },
        body: JSON.stringify({ text, projectKey, userId, sessionId }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.output }]);
    } catch (e) {
      console.error(e);
      alert("에러 발생");
    } finally { setLoading(false); }
  };

  return { messages, sendMessage, loading };
}