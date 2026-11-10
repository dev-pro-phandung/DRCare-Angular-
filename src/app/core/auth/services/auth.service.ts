import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock current user info (Bệnh nhân đã đăng nhập vào VNPT DrCare)
  readonly currentUser = signal<UserProfile>({
    id: 'user-001',
    fullName: 'Nguyễn Văn An',
    phone: '0912345678',
    email: 'an.nguyen@gmail.com',
    dob: '1992-05-18',
    gender: 'MALE',
    cccd: '001092008899',
    insuranceCard: 'DN4010123456789',
    address: 'Số 12 ngõ 45 Cầu Giấy, Hà Nội',
    role: 'PATIENT'
  });

  getCurrentUser(): UserProfile {
    return this.currentUser();
  }
}
