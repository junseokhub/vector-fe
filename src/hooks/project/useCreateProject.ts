import { useState } from 'react';
import client from '@/api/client';
import type { Project, CreateProjectParams } from '@/types';
import toast from 'react-hot-toast';

export function useCreateProject(
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (params: CreateProjectParams) => {
    if (!params.name.trim()) {
      alert('프로젝트 이름을 입력하세요.');
      return;
    }
    if (params.dimensions <= 0) {
      alert('dimensions는 0보다 큰 숫자여야 합니다.');
      return;
    }

    try {
      const { data } = await client.post<Project>('/api/project', params);
      setProjects((prev) => [...prev, data]);
      toast.success('프로젝트가 생성되었습니다.');
    } catch (e: unknown) {
      toast.error('프로젝트 생성 실패');
      setError(e instanceof Error ? e.message : '알 수 없는 오류');
    }
  };

  return { handleSubmit, error };
}
