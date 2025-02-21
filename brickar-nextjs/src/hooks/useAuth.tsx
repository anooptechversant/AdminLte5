'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { apiRequest } from '@/utils/api';

import useLocalStorage from './useLocalStorage';

interface LoginResult {
  success: boolean;
  data?: any;
  error?: string;
}

const useAuth = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    'access_token',
    null,
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    'refresh_token',
    null,
  );
  const [userInfo, setUserInfo] = useLocalStorage<string | null>(
    'user_info',
    null,
  );
  const [loading, setLoading] = useState(false);

  const login = async (
    username: string,
    password: string,
  ): Promise<LoginResult> => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: 'POST',
        path: 'admin/login/',
        data: { username, password },
      });

      if (response?.access_token) {
        setCookie('access_token', response.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
        setCookie('refresh_token', response.refresh_token, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
        setCookie('user_info', response.user_name, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
        setAccessToken(response.access_token);
        setRefreshToken(response.refresh_token);
        setUserInfo(response.user_name || '');
        return { success: true, data: response };
      } else {
        console.error('Invalid login response format:', response);
        return {
          success: false,
          error: 'Server returned invalid response format',
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error?.message || 'Something went wrong during login',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('user_info');
    router.push('/login');
  };

  return { userInfo, accessToken, refreshToken, login, logout, loading };
};

export default useAuth;
