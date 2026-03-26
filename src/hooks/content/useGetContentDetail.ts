import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import type { ContentDto } from "@/types";

export function useGetContentDetail(contentKey: string) {
  const [contentDetail, setContentDetail] = useState<ContentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentKey) return;
    const token = storage.get("accessToken");
    if (!token) { setError("로그인이 필요합니다."); setLoading(false); return; }

    fetch(`/api/content/detail/${contentKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => { if (!res.ok) throw new Error("데이터 로딩 실패"); return res.json(); })
      .then((data) => { setContentDetail(data); setError(null); })
      .catch((e) => { setError(e.message); setContentDetail(null); })
      .finally(() => setLoading(false));
  }, [contentKey]);

  return { contentDetail, loading, error };
}