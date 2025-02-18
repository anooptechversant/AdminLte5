import 'react-responsive-modal/styles.css';

import AuthChecker from '@/components/common/AuthChecker';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthChecker>{children}</AuthChecker>;
}
