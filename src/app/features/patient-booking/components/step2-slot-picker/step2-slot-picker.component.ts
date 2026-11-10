import { Component, inject } from '@angular/core';
import { BookingStateService } from '../../services/booking-state.service';
import { ApiService } from '../../../../core/services/api.service';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd-currency.pipe';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-step2-slot-picker',
  standalone: true,
  imports: [VndCurrencyPipe, LoadingSpinnerComponent],
  templateUrl: './step2-slot-picker.component.html',
  styleUrl: './step2-slot-picker.component.scss'
})
export class Step2SlotPickerComponent {
  readonly state = inject(BookingStateService);
  private api = inject(ApiService);

  isSubmitting = false;

  get data() {
    return this.state.formData();
  }

  get feeAmount(): number {
    return this.data.examService?.fee || 300000;
  }

  get targetLabel(): string {
    switch (this.data.billingTarget) {
      case 'BHYT': return 'BHYT (Đúng tuyến / Thông tuyến)';
      case 'HOSPITAL_FEE': return 'Viện phí (Tự chi trả viện phí)';
      case 'SERVICE': return 'Dịch vụ (Khám theo yêu cầu)';
      default: return 'Viện phí';
    }
  }

  goBack(): void {
    this.state.setStep(1);
  }

  confirmBooking(): void {
    const f = this.data;
    this.isSubmitting = true;

    this.api.createAppointment({
      billingTarget: f.billingTarget,
      provinceName: f.provinceName,
      hospital: f.facility ? f.facility.name : 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      hospitalAddress: f.facility ? f.facility.address : 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      examServiceName: f.examService ? f.examService.name : 'Khám chuyên khoa',
      clinicRoomName: f.clinicRoom ? f.clinicRoom.name : 'Phòng 102 - Khám Nội tổng hợp',
      doctorId: f.doctorId,
      doctorName: f.doctor ? f.doctor.name : 'Nguyễn Văn Hùng',
      doctorTitle: f.doctor ? f.doctor.title : 'PGS.TS',
      doctorAvatar: f.doctor?.avatar,
      specialtyName: f.doctor ? f.doctor.specialtyName : 'Nội Tổng Quát',
      date: f.examDate,
      timeRange: f.examTime,
      session: f.examTime.includes('Chiều') ? 'AFTERNOON' : 'MORNING',
      patient: {
        bookingFor: 'SELF',
        fullName: f.patientProfile ? f.patientProfile.fullName : 'PHAN TIẾN DŨNG',
        phone: f.patientProfile ? f.patientProfile.phone : '0912345678',
        dob: f.patientProfile ? f.patientProfile.dob : '1990-08-15',
        gender: f.patientProfile ? f.patientProfile.gender : 'MALE',
        cccd: f.patientProfile ? f.patientProfile.cccd : '001090008899',
        insuranceCard: f.insuranceCard,
        symptoms: f.symptoms || 'Khám tổng quát định kỳ'
      },
      consultationFee: this.feeAmount,
      attachedFiles: f.attachedFiles
    }).subscribe({
      next: (apt) => {
        this.isSubmitting = false;
        this.state.setConfirmedAppointment(apt);
      },
      error: (err) => {
        console.error('Error confirming booking', err);
        this.isSubmitting = false;
      }
    });
  }
}
