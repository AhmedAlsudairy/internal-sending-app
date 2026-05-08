'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session';
import type { User } from '@/lib/types';

const MOCK_USERS: User[] = [
  {
    id: 'staff-001',
    name: 'Ahmed AL-sudairy',
    department: 'Faculty of Engineering',
    email: 'ahmed.sudairy@university.edu',
    role: 'staff',
  },
  {
    id: 'admin-001',
    name: 'Hamida ALmamari',
    department: 'Transport Department',
    email: 'hamida.almamari@university.edu',
    role: 'admin',
  },
];

export default function LoginPage() {
  const { user, login } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/dashboard' : '/request');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-950 to-blue-700 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-6xl">🎓</div>
          <h1 className="text-3xl font-bold text-white">University Portal</h1>
          <p className="mt-1 text-sm text-blue-200">
            Internal Bus Request System
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-900">Sign In</h2>
          <p className="mb-6 mt-1 text-sm text-gray-500">
            Select your account to continue
          </p>

          <div className="space-y-3">
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => login(u)}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-gray-100 p-4 text-left transition-all hover:border-blue-500 hover:bg-blue-50"
              >
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {u.name.charAt(0)}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {u.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {u.department}
                  </p>
                  <p className="truncate text-xs text-gray-400">{u.email}</p>
                </div>

                {/* Role badge */}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    u.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {u.role === 'admin' ? 'Admin' : 'Staff'}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Demo environment · select an account to explore the system
          </p>
        </div>
      </div>
    </div>
  );
}
