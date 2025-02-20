import AuthLayout from '@/components/Layouts/AuthLayout';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
