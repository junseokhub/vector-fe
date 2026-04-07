import { useCallback, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import axios from 'axios';
import { tokenStore } from '@/store/token';
import { authState } from '@/state/authAtom';
interface ReissueResponse {
  accessToken: string;
  id: number;
}

const PUBLIC_PATHS = ['/login', '/signup'];

export function useAuthenticate() {
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();
  const isAuthenticating = useRef(false);

  const authenticate = useCallback(async () => {
    if (isAuthenticating.current) return;
    isAuthenticating.current = true;

    try {
      const { data } = await axios.post<ReissueResponse>(
        '/api/auth/reissue',
        {},
        { withCredentials: true }
      );

      tokenStore.set(data.accessToken);
      setAuth({ isAuthenticated: true, id: data.id });
    } catch {
      tokenStore.clear();
      setAuth({ isAuthenticated: false, id: null });
      router.push('/login');
    } finally {
      isAuthenticating.current = false;
    }
  }, [setAuth, router]);

  useEffect(() => {
    if (PUBLIC_PATHS.includes(router.pathname)) return;
    if (tokenStore.get()) return;
    authenticate();
  }, [router.pathname]);

  return { authenticate };
}