'use client';

import {AdminSidebar} from '@/components/admin/admin-sidebar';
import {useAuth} from '@/hooks/use-auth';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-muted/40 p-6 md:p-8">{children}</main>
    </div>
  );
}
