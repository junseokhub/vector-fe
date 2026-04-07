import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import client from '@/api/client';
import { tokenStore } from '@/store/token';
import { authState } from '@/state/authAtom';
import toast from 'react-hot-toast';

export function useLogout() {
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await client.post('/api/auth/logout');
    } catch {
    } finally {
      tokenStore.clear();
      setAuth({ isAuthenticated: false, id: null });
      toast.success('로그아웃 되었습니다.');
      router.push('/login');
    }
  };

  return { handleLogout };
}