import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import client from '@/api/client';
import { tokenStore } from '@/store/token';
import { authState } from '@/state/authAtom';
import type { LoginParams, LoginResponse } from '@/types';
import toast from 'react-hot-toast';

export function useLogin() {
  const setAuth = useSetRecoilState(authState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await client.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      } as LoginParams);

      tokenStore.set(data.accessToken);
      setAuth({ isAuthenticated: true, id: data.id });

      router.push('/project');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          toast.error('로그인 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit };
}