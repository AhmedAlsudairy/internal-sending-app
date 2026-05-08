'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from './types';

interface SessionContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const SESSION_KEY = 'uni_bus_session';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setHydrated(true);
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-900 border-t-transparent" />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
