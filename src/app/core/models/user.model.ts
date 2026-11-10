export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  cccd: string;
  insuranceCard?: string;
  address: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

export type UserProfile = User;
