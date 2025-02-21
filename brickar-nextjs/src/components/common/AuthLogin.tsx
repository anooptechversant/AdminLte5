'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useAuth from '@/hooks/useAuth';

import Loader from './Loader';

const AuthLogin = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (userInfo || accessToken)) {
      router.push('/');
    }
  }, [userInfo, accessToken, loading, router]);

  if (loading) {
    return (
      <div className="flex h-[100vh] flex-auto flex-col">
        <Loader />
      </div>
    );
  }

  if (userInfo || accessToken) {
    return (
      <div className="flex h-[100vh] flex-auto flex-col">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLogin;
