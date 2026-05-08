import type { RequestStatus } from '@/lib/types';

interface Props {
  status: RequestStatus;
}

const variants: Record<RequestStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300',
  Approved: 'bg-green-100 text-green-800 ring-1 ring-green-300',
  Rejected: 'bg-red-100 text-red-800 ring-1 ring-red-300',
};

const dots: Record<RequestStatus, string> = {
  Pending: 'bg-yellow-500',
  Approved: 'bg-green-500',
  Rejected: 'bg-red-500',
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
