import { Metadata } from 'next';
import React, { Suspense } from 'react';

import AuthLogin from '@/components/common/AuthLogin';
// import Loader from '@/components/common/Loader/LoginLoader';
import Loader from '@/components/common/Loader';
import LoginForm from '@/components/Login/Form';

export const metadata: Metadata = {
  title: 'Brickar SignIn Page | Brickar Admin',
  description: 'This is Signin Page for Brickar Admin',
};

const SignIn = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthLogin>
        <LoginForm />
      </AuthLogin>
    </Suspense>
  );
};

export default SignIn;
