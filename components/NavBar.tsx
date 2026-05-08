'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session';

export function NavBar() {
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl">
            🎓
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">University Portal</p>
            <p className="mt-0.5 text-xs leading-none text-blue-200">
              Internal Bus Request System
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          {user.role === 'staff' && (
            <Link
              href="/request"
              className="rounded-md px-3 py-1.5 text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              New Request
            </Link>
          )}
          {user.role === 'admin' && (
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="mt-0.5 text-xs leading-none text-blue-200">{user.department}</p>
          </div>
          <span
            className={`hidden sm:inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
              user.role === 'admin'
                ? 'bg-purple-400/20 text-purple-200'
                : 'bg-blue-400/20 text-blue-100'
            }`}
          >
            {user.role === 'admin' ? 'Admin' : 'Staff'}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
