import AuthChecker from '@/components/common/AuthChecker';
import 'react-responsive-modal/styles.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthChecker>{children}</AuthChecker>;
}
