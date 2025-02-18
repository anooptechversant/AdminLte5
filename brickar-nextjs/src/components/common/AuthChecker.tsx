'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo || !accessToken) {
      router.push('/login');
    }
  }, [userInfo, accessToken, router]);

  return <>{children}</>;
};

export default AuthChecker;
