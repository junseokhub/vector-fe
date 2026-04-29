import { useState } from 'react';
import { useRouter } from 'next/navigation';
import client from '@/api/client';
import type { ContentCreateParams } from '@/types';
import toast from 'react-hot-toast';

export function useCreateContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async (payload: ContentCreateParams) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await client.post('/api/content', payload);
      toast.success('생성 성공');
      router.refresh();
      return data;
    } catch (e: unknown) {
      toast.error('생성 실패');
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, loading, error };
}