'use client';

import { useRequestStore } from '@/lib/store';
import { StatusBadge } from './StatusBadge';
import type { BusRequest } from '@/lib/types';

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: 'blue' | 'yellow' | 'green' | 'red';
}) {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-900',
    yellow: 'bg-yellow-50 border-yellow-100 text-yellow-900',
    green: 'bg-green-50 border-green-100 text-green-900',
    red: 'bg-red-50 border-red-100 text-red-900',
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-0.5 text-xs font-medium opacity-70">{label}</p>
    </div>
  );
}

function RequestRow({
  request: r,
  onUpdateStatus,
}: {
  request: BusRequest;
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}) {
  const dateStr = new Date(r.departureDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const [h, m] = r.departureTime.split(':');
  const d = new Date();
  d.setHours(Number(h), Number(m));
  const timeStr = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{r.senderName}</p>
        <p className="text-xs text-gray-500">{r.senderDepartment}</p>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{r.requestTitle}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{r.visitType}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{r.destination}</td>
      <td className="px-4 py-3 text-center text-sm text-gray-900">
        {r.passengerCount}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <p>{dateStr}</p>
        <p className="text-xs text-gray-400">{timeStr}</p>
      </td>
      <td className="px-4 py-3 text-center">
        <StatusBadge status={r.status} />
      </td>
      <td className="px-4 py-3 text-center">
        {r.status === 'Pending' ? (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onUpdateStatus(r.id, 'Approved')}
              className="rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-500 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => onUpdateStatus(r.id, 'Rejected')}
              className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-500 transition-colors"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}

export function RequestsDashboard() {
  const { requests, updateStatus } = useRequestStore();

  const total = requests.length;
  const pending = requests.filter((r) => r.status === 'Pending').length;
  const approved = requests.filter((r) => r.status === 'Approved').length;
  const rejected = requests.filter((r) => r.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard label="Total Requests" value={total} color="blue" />
        <MetricCard label="Pending" value={pending} color="yellow" />
        <MetricCard label="Approved" value={approved} color="green" />
        <MetricCard label="Rejected" value={rejected} color="red" />
      </div>

      {/* Requests table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">All Requests</h2>
          <span className="text-xs text-gray-400">{total} total</span>
        </div>

        {requests.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-400">No requests submitted yet.</p>
            <p className="mt-1 text-xs text-gray-300">
              Staff members can submit requests from the portal.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Sender</th>
                  <th className="px-4 py-3 text-left">Request Title</th>
                  <th className="px-4 py-3 text-left">Visit Type</th>
                  <th className="px-4 py-3 text-left">Destination</th>
                  <th className="px-4 py-3 text-center">Passengers</th>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((r) => (
                  <RequestRow key={r.id} request={r} onUpdateStatus={updateStatus} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
