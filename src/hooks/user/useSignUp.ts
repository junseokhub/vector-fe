import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import client from '@/api/client';
import type { SignUpParams } from '@/types';
import toast from 'react-hot-toast';

export function useSignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/api/user/sign-up', {
        username,
        email,
        password,
      } as SignUpParams);

      toast.success('회원가입 성공! 로그인 해주세요.');
      router.push('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error('회원가입 실패: ' + (error.message ?? '알 수 없는 오류'));
      }
    }
  };

  return { username, setUsername, email, setEmail, password, setPassword, handleSubmit };
}