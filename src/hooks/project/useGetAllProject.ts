import { useState, useEffect } from 'react';
import client from '@/api/client';
import type { Project } from '@/types';
import toast from 'react-hot-toast';

export function useGetAllProject(userId: number) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await client.get<Project[]>(
          `/api/invite/list/my?userId=${encodeURIComponent(userId)}`
        );
        setProjects(data);
      } catch (e: unknown) {
        toast.error('불러오기 실패');
        setError(e instanceof Error ? e.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  return { projects, setProjects, loading, error };
}