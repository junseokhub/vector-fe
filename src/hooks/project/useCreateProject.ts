import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import client from '@/api/client';
import type { Project, CreateProjectParams, ProjectUpdateParams } from '@/types';
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

export function useUpdateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (key: string, params: Partial<ProjectUpdateParams>) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await client.post(`/api/project/update/${key}`, params);
      toast.success('업데이트 성공');
      router.reload();
      return data;
    } catch (e: unknown) {
      toast.error('업데이트 실패');
      setError(e instanceof Error ? e.message : '업데이트 실패');
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading, error };
}

export function useCreateProject(
  createdUserId: number,
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

    let newProject: Project;
    try {
      const { data } = await client.post<Project>('/api/project/create', {
        ...params,
        createdUserId,
      });
      newProject = data;
    } catch (e: unknown) {
      toast.error('프로젝트 생성 실패');
      setError(e instanceof Error ? e.message : '알 수 없는 오류');
      return;
    }

    try {
      await client.post('/api/content/create', {
        title: '[Default] Welcome Intent',
        answer: '안녕하세요.저는 JS챗봇 입니다.',
        projectId: newProject.id,
        projectKey: newProject.key,
        createdUserId,
      }, {
        headers: { userId: createdUserId.toString() },
      });
    } catch (e: unknown) {
      toast.error('콘텐츠 생성 실패');
      setError(e instanceof Error ? e.message : '알 수 없는 오류');
      return;
    }

    setProjects((prev) => [...prev, newProject]);
  };

  return { handleSubmit, error };
}