import Image from 'next/image';
import React, { cloneElement, isValidElement, ReactNode } from 'react';

type AuthLayoutProps = {
  children?: ReactNode;
  content?: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  content,
  ...rest
}) => {
  return (
    <div className="app-layout-blank flex h-[100vh] flex-auto flex-col">
      <div className="grid h-full lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 hidden flex-col justify-between bg-gray-900 bg-cover px-16 py-6 lg:flex xl:col-span-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo/logo.svg`}
            width={95}
            height={19}
            alt="Brickar"
          />
          <div>
            <h2 className="mb-4 text-title-md font-semibold text-white">
              BrickAr helps you find the best in market
            </h2>
            <p className="max-w-2xl text-lg text-white opacity-80">
              The dashboard for monitoring and controlling the service ,
              products and users.
            </p>
          </div>
          <span className="text-white"></span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800">
          <div className="w-full max-w-lg px-8">
            {content && <div className="mb-8">{content}</div>}
            {isValidElement(children)
              ? cloneElement(children, { ...rest })
              : children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
