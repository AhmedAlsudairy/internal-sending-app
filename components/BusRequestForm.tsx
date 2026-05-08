'use client';

import { useState } from 'react';
import { useSession } from '@/lib/session';
import { useRequestStore } from '@/lib/store';
import type { VisitType } from '@/lib/types';

const DEPARTMENTS = [
  'Faculty of Engineering',
  'Faculty of Medicine',
  'Faculty of Science',
  'Faculty of Arts & Humanities',
  'Faculty of Business Administration',
  'Faculty of Computer Science & IT',
  'Transport Department',
  'Student Affairs Office',
  "Registrar's Office",
];

const VISIT_TYPES: VisitType[] = [
  'Internal Campus Visit',
  'Field Trip (Internal)',
  'Academic Event Transfer',
];

interface FormState {
  requestTitle: string;
  sendTo: string;
  visitType: VisitType | '';
  destination: string;
  passengerCount: string;
  departureDate: string;
  departureTime: string;
  returnTime: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  requestTitle: '',
  sendTo: '',
  visitType: '',
  destination: '',
  passengerCount: '',
  departureDate: '',
  departureTime: '',
  returnTime: '',
  notes: '',
};

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
        {value}
      </div>
    </div>
  );
}

export function BusRequestForm() {
  const { user } = useSession();
  const { addRequest } = useRequestStore();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      senderName: user.name,
      senderDepartment: user.department,
      senderEmail: user.email,
      requestTitle: form.requestTitle,
      sendTo: form.sendTo,
      visitType: form.visitType as VisitType,
      destination: form.destination,
      passengerCount: Number(form.passengerCount),
      departureDate: form.departureDate,
      departureTime: form.departureTime,
      returnTime: form.returnTime || undefined,
      notes: form.notes || undefined,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl mb-4">
          ✅
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Request Submitted!</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xs">
          Your bus request has been submitted and is pending approval from the
          transport department.
        </p>
        <button
          onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
          className="mt-6 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Sender Info (auto-filled) ── */}
      <section>
        <h2 className="mb-4 border-b border-blue-100 pb-2 text-sm font-semibold uppercase tracking-wide text-blue-900">
          Sender Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ReadonlyField label="Full Name" value={user.name} />
          <ReadonlyField label="Department / Faculty" value={user.department} />
          <ReadonlyField label="Email Address" value={user.email} />
        </div>
      </section>

      {/* ── Request Details ── */}
      <section>
        <h2 className="mb-4 border-b border-blue-100 pb-2 text-sm font-semibold uppercase tracking-wide text-blue-900">
          Request Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Request Title */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Title / Why We Request It <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Transport students to internal lab training"
              value={form.requestTitle}
              onChange={(e) => set('requestTitle', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Send To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send Request To <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.sendTo}
              onChange={(e) => set('sendTo', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select department…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Visit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.visitType}
              onChange={(e) => set('visitType', e.target.value as VisitType)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select type…</option>
              {VISIT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination / Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Main Campus Gate B"
              value={form.destination}
              onChange={(e) => set('destination', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Passenger Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Student Passengers <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              max={200}
              placeholder="e.g. 30"
              value={form.passengerCount}
              onChange={(e) => set('passengerCount', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section>
        <h2 className="mb-4 border-b border-blue-100 pb-2 text-sm font-semibold uppercase tracking-wide text-blue-900">
          Schedule
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              min={todayISO}
              value={form.departureDate}
              onChange={(e) => set('departureDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              required
              value={form.departureTime}
              onChange={(e) => set('departureTime', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Time{' '}
              <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="time"
              value={form.returnTime}
              onChange={(e) => set('returnTime', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </section>

      {/* ── Notes ── */}
      <section>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes{' '}
          <span className="text-xs font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Any special requirements or additional information…"
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </section>

      <div className="flex justify-end border-t border-gray-100 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
