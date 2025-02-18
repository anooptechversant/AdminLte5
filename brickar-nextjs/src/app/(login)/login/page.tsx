import { Metadata } from 'next';
import React from 'react';

import LoginForm from '@/components/Login/Form';

export const metadata: Metadata = {
  title: 'Brickar SignIn Page | Brickar Admin',
  description: 'This is Signin Page for Brickar Admin',
};

const SignIn = async () => {
  return <LoginForm />;
};

export default SignIn;
