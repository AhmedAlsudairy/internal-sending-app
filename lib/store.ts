'use client';

import { useState, useEffect } from 'react';
import type { BusRequest, RequestStatus } from './types';

const STORE_KEY = 'uni_bus_requests';

function loadRequests(): BusRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORE_KEY);
    return stored ? (JSON.parse(stored) as BusRequest[]) : [];
  } catch {
    return [];
  }
}

function saveRequests(requests: BusRequest[]): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(requests));
}

export function useRequestStore() {
  const [requests, setRequests] = useState<BusRequest[]>([]);

  useEffect(() => {
    setRequests(loadRequests());
  }, []);

  const addRequest = (
    req: Omit<BusRequest, 'id' | 'status' | 'createdAt'>
  ): BusRequest => {
    const newReq: BusRequest = {
      ...req,
      id: crypto.randomUUID(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [newReq, ...requests];
    setRequests(updated);
    saveRequests(updated);
    return newReq;
  };

  const updateStatus = (id: string, status: RequestStatus): void => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status } : r
    );
    setRequests(updated);
    saveRequests(updated);
  };

  return { requests, addRequest, updateStatus };
}
