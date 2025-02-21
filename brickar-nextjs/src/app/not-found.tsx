import Image from 'next/image';
import Link from 'next/link';

import DefaultLayout from '@/components/Layouts/DefaultLayout';

export default async function DashboardNotFound() {
  return (
    <DefaultLayout>
      <div className="flex h-[90] w-full flex-col items-center justify-center text-center">
        <Image
          src="/images/others/permission.png"
          alt="Not found"
          width={250}
          height={250}
        />
        <h2 className="text-2xl font-medium">
          Page Not Found
          <br />
          We can’t seem to find the page you’re looking for.
        </h2>
        <Link
          href="/"
          className="mt-6 rounded-md bg-gray-800 px-6 py-3 text-white"
        >
          GO TO HOME
        </Link>
      </div>
    </DefaultLayout>
  );
}
