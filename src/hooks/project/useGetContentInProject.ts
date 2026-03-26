import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import type { ProjectContentsDto } from "@/types";

export function useGetContentInProject(projectKey: string) {
  const [projectContents, setProjectContents] = useState<ProjectContentsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectKey) return;
    const token = storage.get("accessToken");
    if (!token) { setError("로그인이 필요합니다."); setLoading(false); return; }

    fetch(`/api/project/contents/${encodeURIComponent(projectKey)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => { if (!res.ok) throw new Error("프로젝트 정보를 불러오지 못했습니다."); return res.json(); })
      .then((data: ProjectContentsDto) => { setProjectContents(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [projectKey]);

  return { projectContents, loading, error };
}