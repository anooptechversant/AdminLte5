import { redirect } from 'next/navigation';

import useAuth from '@/hooks/useAuth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
