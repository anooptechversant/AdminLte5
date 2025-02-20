'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidError } from 'react-icons/bi';

// import { toast, ToastContainer } from 'react-toastify';
import useAuth from '@/hooks/useAuth';

import Form from '../common/Form/Form';
import FormInput from '../common/Form/FormInput';
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm<FormData>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;
  const router = useRouter();

  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      // Clear previous errors
      setLoginError(null);

      // Attempt login
      const result = await login(data.email, data.password);

      if (result.success) {
        router.push('/');
      } else {
        const errorMessage = result.error || 'Login failed. Please try again.';
        setLoginError(errorMessage);
        // toast.error(errorMessage);

        // Set form error to prevent submission completion
        setError('root', {
          type: 'manual',
          message: errorMessage,
        });

        // Prevent default form submission
        return false;
      }
    } catch (e: any) {
      const errorMessage = e?.message || 'An unexpected error occurred';
      setLoginError(errorMessage);
      // toast.error(errorMessage);

      // Set form error
      setError('root', {
        type: 'manual',
        message: errorMessage,
      });

      return false;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-3">
      {/* <ToastContainer /> */}
      <p className="self-stretch text-center text-2xl font-semibold leading-8 text-gray-800">
        Welcome back!
      </p>
      <p className="self-stretch text-center text-base leading-6 text-gray-500">
        Please enter your credentials to sign in!
      </p>
      {loginError && (
        <div className="flex w-fit items-center justify-center gap-1 rounded-md bg-red-50 p-3 text-sm text-red-500">
          <BiSolidError size={18} />
          <span>{loginError}</span>
        </div>
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <FormInput
          name="email"
          label="Email"
          type="text"
          invalid={!!errors.email}
          errorMessage={errors.email?.message}
          placeholder="Email"
          form={form}
          hasWrapper
          validate={{ required: 'Please enter your email' }}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          invalid={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="Password"
          form={form}
          hasWrapper
          validate={{ required: 'Please enter your password' }}
        />

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-gray-800 bg-gray-900 p-4 text-white transition hover:bg-opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <span className="animate-spin">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_1881_16183" fill="white">
                    <path d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"></path>
                  </mask>
                  <path
                    d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                    stroke="white"
                    strokeWidth="14"
                    mask="url(#path-1-inside-1_1881_16183)"
                  ></path>
                </svg>
              </span>
              Loading...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
