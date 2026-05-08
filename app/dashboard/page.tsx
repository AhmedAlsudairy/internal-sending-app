'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session';
import { NavBar } from '@/components/NavBar';
import { RequestsDashboard } from '@/components/RequestsDashboard';

export default function DashboardPage() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
    else if (user.role === 'staff') router.replace('/request');
  }, [user, router]);

  if (!user || user.role === 'staff') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Requests Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage all submitted bus requests.
          </p>
        </div>
        <RequestsDashboard />
      </main>
    </div>
  );
}
