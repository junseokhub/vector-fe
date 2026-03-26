import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import type { ContentCreateParams } from "@/types";

export function useCreateContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async (payload: ContentCreateParams & { userId: number }) => {
    setLoading(true); setError(null);
    const { userId, ...params } = payload;
    const token = storage.get("accessToken");
    if (!token) { setError("로그인이 필요합니다."); setLoading(false); return null; }

    try {
      const res = await fetch("/api/content/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId.toString(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
      const data = await res.json();
      router.refresh();
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
      return null;
    } finally { setLoading(false); }
  };

  return { handleCreate, loading, error };
}