import { useState, useEffect } from 'react';
import axios from 'axios';
import client from '@/api/client';
import type { ContentDto } from '@/types';
import toast from 'react-hot-toast';

export function useGetContentDetail(contentKey: string) {
  const [contentDetail, setContentDetail] = useState<ContentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentKey) return;

    const fetchContentDetail = async () => {
      setLoading(true);
      try {
        const { data } = await client.get<ContentDto>(`/api/content/detail/${contentKey}`);
        setContentDetail(data);
        setError(null);
      } catch (e: unknown) {
        toast.error('불러오기 실패');
        setError(e instanceof Error ? e.message : '알 수 없는 오류 발생');
        setContentDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetail();
  }, [contentKey]);

  return { contentDetail, loading, error };
}