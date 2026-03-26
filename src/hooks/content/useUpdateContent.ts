import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import type { ContentUpdateParams } from "@/types";

export function useUpdateContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (contentId: number, params: ContentUpdateParams) => {
    setLoading(true); setError(null);
    const token = storage.get("accessToken");
    if (!token) { setError("로그인이 필요합니다."); setLoading(false); return; }

    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          contentId: contentId.toString(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
      await res.json();
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : "업데이트 실패");
    } finally { setLoading(false); }
  };

  return { handleUpdate, loading, error };
}