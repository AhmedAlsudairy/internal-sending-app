'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session';

export default function Home() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (user.role === 'admin') {
      router.replace('/dashboard');
    } else {
      router.replace('/request');
    }
  }, [user, router]);

  return null;
}

