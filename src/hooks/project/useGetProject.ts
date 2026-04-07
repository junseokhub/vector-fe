import { useState, useEffect } from 'react';
import client from '@/api/client';
import type { Project } from '@/types';
import toast from 'react-hot-toast';

export function useGetProject(projectKey: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectKey) return;

    const fetchProject = async () => {
      try {
        const { data } = await client.get<Project>(
          `/api/project/search?key=${encodeURIComponent(projectKey)}`
        );
        setProject(data);
      } catch (e: unknown) {
        toast.error('불러오기 실패');
        setError(e instanceof Error ? e.message : '알 수 없는 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectKey]);

  return { project, setProject, loading, error };
}