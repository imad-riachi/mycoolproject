import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Welcome to your SAAS dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <div className='container py-6'>{children}</div>
      </main>
    </div>
  );
}
