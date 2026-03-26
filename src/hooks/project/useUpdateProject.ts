import { storage } from "@/lib/storage";
import { ProjectUpdateParams } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

export function useUpdateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (key: string, params: Partial<ProjectUpdateParams>) => {
    setLoading(true); setError(null);
    const token = storage.get("accessToken");
    if (!token) { setError("로그인이 필요합니다."); setLoading(false); return null; }

    try {
      const res = await fetch(`/api/project/update/${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
      const data = await res.json();
      router.reload();
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "업데이트 실패");
      return null;
    } finally { setLoading(false); }
  };

  return { handleUpdate, loading, error };
}