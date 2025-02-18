import Link from 'next/link';

import DefaultLayout from '@/components/Layouts/DefaultLayout';

export default async function DashboardNotFound() {
  return (
    <DefaultLayout>
      <div className="flex h-screen w-full  items-center justify-center text-center">
        <h2 className="text-4xl font-light">
          Page Not Found
          <br />
          We can’t seem to find the page you’re looking for.
        </h2>
        <Link
          href="/"
          className="bg-light-green mt-6 rounded-md px-6 py-3 text-white"
        >
          GO TO DASHBOARD
        </Link>
      </div>
    </DefaultLayout>
  );
}
