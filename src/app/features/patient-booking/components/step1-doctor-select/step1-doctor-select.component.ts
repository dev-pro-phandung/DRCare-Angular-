import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { BookingStateService } from '../../services/booking-state.service';
import { Province, MedicalFacility, ExamService, ClinicRoom, PatientProfileOption, BillingTarget, AttachedFile } from '../../../../core/models/csyt.model';
import { Doctor } from '../../../../core/models/doctor.model';

@Component({
  selector: 'app-step1-doctor-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './step1-doctor-select.component.html',
  styleUrl: './step1-doctor-select.component.scss'
})
export class Step1DoctorSelectComponent implements OnInit {
  private api = inject(ApiService);
  readonly state = inject(BookingStateService);

  // Dữ liệu danh mục
  provinces: Province[] = [];
  facilities: MedicalFacility[] = [];
  filteredFacilities: MedicalFacility[] = [];
  examServices: ExamService[] = [];
  clinicRooms: ClinicRoom[] = [];
  filteredRooms: ClinicRoom[] = [];
  patientProfiles: PatientProfileOption[] = [];
  doctors: Doctor[] = [];
  timeRanges: { value: string; label: string }[] = [];

  // Model form binding
  selectedProfileId = 'prof-01';
  billingTarget: BillingTarget = 'HOSPITAL_FEE'; // Mặc định Viện phí
  selectedProvinceId = 'p-hn';
  selectedFacilityId = 'fac-01';
  selectedServiceId = 'srv-01';
  selectedRoomId = 'room-102';
  selectedDoctorId = 'doc-01';
  examDate = '10/11/2026';
  examTime = '08:30 - 09:00';
  insuranceCard = '';
  symptoms = '';
  attachedFiles: AttachedFile[] = [];

  ngOnInit(): void {
    // Tải dữ liệu ban đầu từ API Service
    this.api.getProvinces().subscribe(p => this.provinces = p);
    this.api.getExamServices().subscribe(s => this.examServices = s);
    this.api.getPatientProfiles().subscribe(prof => {
      this.patientProfiles = prof;
      this.applySavedState();
    });
    this.api.getTimeRanges().subscribe(t => this.timeRanges = t);

    this.api.getFacilities().subscribe(f => {
      this.facilities = f;
      this.onProvinceChange();
    });

    this.api.getClinicRooms().subscribe(r => {
      this.clinicRooms = r;
      this.onFacilityChange();
    });

    this.api.getDoctors().subscribe(d => this.doctors = d);
  }

  applySavedState(): void {
    const saved = this.state.formData();
    if (saved) {
      this.selectedProfileId = saved.selectedProfileId || 'prof-01';
      this.billingTarget = saved.billingTarget || 'HOSPITAL_FEE';
      this.selectedProvinceId = saved.provinceId || 'p-hn';
      this.selectedFacilityId = saved.facilityId || 'fac-01';
      this.selectedServiceId = saved.examServiceId || 'srv-01';
      this.selectedRoomId = saved.clinicRoomId || 'room-102';
      this.selectedDoctorId = saved.doctorId || 'doc-01';
      this.examDate = saved.examDate || '10/11/2026';
      this.examTime = saved.examTime || '08:30 - 09:00';
      this.insuranceCard = saved.insuranceCard || '';
      this.symptoms = saved.symptoms || '';
      this.attachedFiles = saved.attachedFiles || [];
    }
  }

  onProvinceChange(): void {
    this.filteredFacilities = this.facilities.filter(f => f.provinceId === this.selectedProvinceId);
    if (this.filteredFacilities.length > 0) {
      this.selectedFacilityId = this.filteredFacilities[0].id;
      this.onFacilityChange();
    }
  }

  onFacilityChange(): void {
    this.filteredRooms = this.clinicRooms.filter(r => r.facilityId === this.selectedFacilityId);
    if (this.filteredRooms.length > 0) {
      this.selectedRoomId = this.filteredRooms[0].id;
    }
  }

  setBillingTarget(target: BillingTarget): void {
    this.billingTarget = target;
    if (target === 'BHYT') {
      const currentProfile = this.patientProfiles.find(p => p.id === this.selectedProfileId);
      if (currentProfile?.insuranceCard) {
        this.insuranceCard = currentProfile.insuranceCard;
      }
    } else {
      this.insuranceCard = '';
    }
  }

  onProfileChange(): void {
    const prof = this.patientProfiles.find(p => p.id === this.selectedProfileId);
    if (prof && this.billingTarget === 'BHYT' && prof.insuranceCard) {
      this.insuranceCard = prof.insuranceCard;
    }
  }

  // Giả lập tải tệp tài liệu y tế
  triggerFileUpload(): void {
    if (this.attachedFiles.length >= 5) {
      alert('Bạn chỉ có thể đính kèm tối đa 5 tệp tin.');
      return;
    }

    const demoFiles: AttachedFile[] = [
      { id: 'f-' + Date.now(), name: 'Ket_qua_xet_nghiem_mau_0811.pdf', sizeStr: '1.2 MB', type: 'PDF' },
      { id: 'f-' + Date.now(), name: 'Don_thuoc_tai_kham_cu.jpg', sizeStr: '850 KB', type: 'JPG' },
      { id: 'f-' + Date.now(), name: 'The_BHYT_hai_mat.png', sizeStr: '2.1 MB', type: 'PNG' },
      { id: 'f-' + Date.now(), name: 'Phim_chup_XQuang_nguc.jpg', sizeStr: '3.4 MB', type: 'JPG' }
    ];

    const nextFile = demoFiles[this.attachedFiles.length % demoFiles.length];
    this.attachedFiles.push({
      ...nextFile,
      id: 'file-' + Date.now() + '-' + Math.random().toString(36).substring(7)
    });
  }

  removeFile(index: number): void {
    this.attachedFiles.splice(index, 1);
  }

  submitStep1(): void {
    const currentProv = this.provinces.find(p => p.id === this.selectedProvinceId);
    const currentFac = this.facilities.find(f => f.id === this.selectedFacilityId);
    const currentSrv = this.examServices.find(s => s.id === this.selectedServiceId);
    const currentRoom = this.clinicRooms.find(r => r.id === this.selectedRoomId);
    const currentDoc = this.doctors.find(d => d.id === this.selectedDoctorId) || null;
    const currentProfile = this.patientProfiles.find(p => p.id === this.selectedProfileId) || null;

    this.state.updateFormData({
      selectedProfileId: this.selectedProfileId,
      patientProfile: currentProfile,
      billingTarget: this.billingTarget,
      provinceId: this.selectedProvinceId,
      provinceName: currentProv ? currentProv.name : 'Hà Nội',
      facilityId: this.selectedFacilityId,
      facility: currentFac || null,
      examServiceId: this.selectedServiceId,
      examService: currentSrv || null,
      clinicRoomId: this.selectedRoomId,
      clinicRoom: currentRoom || null,
      doctorId: this.selectedDoctorId,
      doctor: currentDoc,
      examDate: this.examDate,
      examTime: this.examTime,
      insuranceCard: this.insuranceCard,
      symptoms: this.symptoms,
      attachedFiles: this.attachedFiles
    });

    this.state.setStep(2);
  }
}
