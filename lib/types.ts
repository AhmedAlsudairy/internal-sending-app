export type UserRole = 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  department: string;
  email: string;
  role: UserRole;
}

export type VisitType =
  | 'Internal Campus Visit'
  | 'Field Trip (Internal)'
  | 'Academic Event Transfer';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface BusRequest {
  id: string;
  // Auto-filled from session
  senderName: string;
  senderDepartment: string;
  senderEmail: string;
  // Manual fields
  requestTitle: string;
  sendTo: string;
  visitType: VisitType;
  destination: string;
  passengerCount: number;
  departureDate: string;
  departureTime: string;
  returnTime?: string;
  notes?: string;
  // System
  status: RequestStatus;
  createdAt: string;
}
