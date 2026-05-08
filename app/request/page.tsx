'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session';
import { NavBar } from '@/components/NavBar';
import { BusRequestForm } from '@/components/BusRequestForm';

export default function RequestPage() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
    else if (user.role === 'admin') router.replace('/dashboard');
  }, [user, router]);

  if (!user || user.role === 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">New Bus Request</h1>
          <p className="mt-1 text-sm text-gray-500">
            Submit an internal visit bus request for transport department review.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <BusRequestForm />
        </div>
      </main>
    </div>
  );
}
