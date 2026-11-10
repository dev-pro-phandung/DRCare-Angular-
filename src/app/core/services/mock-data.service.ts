import { Injectable } from '@angular/core';
import { Specialty } from '../models/specialty.model';
import { Doctor } from '../models/doctor.model';
import { TimeSlot } from '../models/time-slot.model';
import { Appointment } from '../models/appointment.model';
import { Province, MedicalFacility, ExamService, ClinicRoom, PatientProfileOption } from '../models/csyt.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  /**
   * Danh sách Tỉnh / Thành phố
   */
  readonly PROVINCES: Province[] = [
    { id: 'p-hn', name: 'Hà Nội' },
    { id: 'p-hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'p-dn', name: 'Đà Nẵng' },
    { id: 'p-ct', name: 'Cần Thơ' },
    { id: 'p-hp', name: 'Hải Phòng' }
  ];

  /**
   * Danh sách Cơ sở khám (CSYT) liên kết VNPT DrCare
   */
  readonly FACILITIES: MedicalFacility[] = [
    {
      id: 'fac-01',
      provinceId: 'p-hn',
      name: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      address: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội'
    },
    {
      id: 'fac-02',
      provinceId: 'p-hn',
      name: 'Bệnh viện Bạch Mai',
      address: '78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội'
    },
    {
      id: 'fac-03',
      provinceId: 'p-hn',
      name: 'Bệnh viện Đại học Y Hà Nội',
      address: 'Số 1 Tôn Thất Tùng, Trung Tự, Đống Đa, Hà Nội'
    },
    {
      id: 'fac-04',
      provinceId: 'p-hcm',
      name: 'Bệnh viện Bưu Điện CS2 (VNPT TP.HCM)',
      address: 'Lô B9, Đường Nguyễn Thị Thập, Quận 7, TP.HCM'
    },
    {
      id: 'fac-05',
      provinceId: 'p-hcm',
      name: 'Bệnh viện Đại học Y Dược TP.HCM',
      address: '215 Hồng Bàng, Phường 11, Quận 5, TP.HCM'
    },
    {
      id: 'fac-06',
      provinceId: 'p-dn',
      name: 'Bệnh viện Đa khoa Đà Nẵng',
      address: '124 Hải Phòng, Thạch Thang, Hải Châu, Đà Nẵng'
    }
  ];

  /**
   * Danh mục Dịch vụ khám
   */
  readonly EXAM_SERVICES: ExamService[] = [
    { id: 'srv-01', name: 'Khám chuyên khoa theo yêu cầu', fee: 300000 },
    { id: 'srv-02', name: 'Khám theo chế độ BHYT (Đúng tuyến / Thông tuyến)', fee: 45000 },
    { id: 'srv-03', name: 'Khám tầm soát sức khỏe tổng quát', fee: 550000 },
    { id: 'srv-04', name: 'Khám Giáo sư / Phó Giáo sư đầu ngành', fee: 450000 }
  ];

  /**
   * Danh mục Phòng khám tại CSYT
   */
  readonly CLINIC_ROOMS: ClinicRoom[] = [
    { id: 'room-102', facilityId: 'fac-01', name: 'Phòng 102 - Khám Nội tổng hợp', specialtyName: 'Nội Tổng Quát' },
    { id: 'room-205', facilityId: 'fac-01', name: 'Phòng 205 - Khám Nhi khoa', specialtyName: 'Nhi Khoa' },
    { id: 'room-301', facilityId: 'fac-01', name: 'Phòng 301 - Khám Tai Mũi Họng', specialtyName: 'Tai Mũi Họng' },
    { id: 'room-402', facilityId: 'fac-01', name: 'Phòng 402 - Khám Sản phụ khoa', specialtyName: 'Sản Phụ Khoa' },
    { id: 'room-501', facilityId: 'fac-01', name: 'Phòng 501 - Khám Tim mạch', specialtyName: 'Tim Mạch' },
    { id: 'room-603', facilityId: 'fac-01', name: 'Phòng 603 - Khám Răng Hàm Mặt', specialtyName: 'Răng Hàm Mặt' },
    // Các phòng ở CSYT khác
    { id: 'room-bm-101', facilityId: 'fac-02', name: 'Phòng 101 - Khoa Khám bệnh theo yêu cầu', specialtyName: 'Nội Tổng Quát' },
    { id: 'room-bm-201', facilityId: 'fac-02', name: 'Phòng 201 - Viện Tim mạch Bạch Mai', specialtyName: 'Tim Mạch' },
    { id: 'room-hcm-101', facilityId: 'fac-05', name: 'Phòng A1 - Khám Nội ĐHYD', specialtyName: 'Nội Tổng Quát' }
  ];

  /**
   * Danh sách hồ sơ người khám lưu sẵn (như trên ảnh: PHAN TIẾN DŨNG)
   */
  readonly PATIENT_PROFILES: PatientProfileOption[] = [
    {
      id: 'prof-01',
      fullName: 'PHAN TIẾN DŨNG',
      label: 'PHAN TIẾN DŨNG (Tôi)',
      phone: '0912345678',
      dob: '1990-08-15',
      gender: 'MALE',
      cccd: '001090008899',
      insuranceCard: 'DN4010123456789'
    },
    {
      id: 'prof-02',
      fullName: 'PHAN TIẾN ĐẠT',
      label: 'PHAN TIẾN ĐẠT (Con trai)',
      phone: '0912345678',
      dob: '2019-06-12',
      gender: 'MALE',
      cccd: '001219001122',
      insuranceCard: 'TE1010998877665'
    },
    {
      id: 'prof-03',
      fullName: 'NGUYỄN THỊ MAI',
      label: 'NGUYỄN THỊ MAI (Mẹ)',
      phone: '0987654321',
      dob: '1965-03-22',
      gender: 'FEMALE',
      cccd: '001165003344',
      insuranceCard: 'GD4010887766554'
    }
  ];

  /**
   * Danh mục 8 Chuyên khoa y tế
   */
  readonly SPECIALTIES: Specialty[] = [
    { id: 'spec-noi', code: 'NOI', name: 'Nội Tổng Quát', icon: '🩺', description: 'Khám tầm soát sức khỏe toàn diện, tiểu đường, huyết áp, tiêu hóa.', doctorCount: 14 },
    { id: 'spec-nhi', code: 'NHI', name: 'Nhi Khoa', icon: '👶', description: 'Chăm sóc sức khỏe toàn diện, tư vấn dinh dưỡng và tiêm chủng cho trẻ nhỏ.', doctorCount: 10 },
    { id: 'spec-tmh', code: 'TMH', name: 'Tai Mũi Họng', icon: '👂', description: 'Nội soi, điều trị viêm amidan, viêm xoang, các bệnh lý họng thanh quản.', doctorCount: 8 },
    { id: 'spec-rhm', code: 'RHM', name: 'Răng Hàm Mặt', icon: '🦷', description: 'Nha khoa tổng quát, niềng răng, nhổ răng khôn không đau và thẩm mỹ nụ cười.', doctorCount: 9 },
    { id: 'spec-san', code: 'SAN', name: 'Sản Phụ Khoa', icon: '🤰', description: 'Khám thai định kỳ, siêu âm 4D/5D, sàng lọc trước sinh và phụ khoa tổng quát.', doctorCount: 11 },
    { id: 'spec-dalieu', code: 'DALIEU', name: 'Da Liễu - Thẩm Mỹ', icon: '✨', description: 'Điều trị mụn, viêm da cơ địa, dị ứng và phục hồi tái tạo làn da.', doctorCount: 7 },
    { id: 'spec-timmach', code: 'TIMMACH', name: 'Tim Mạch', icon: '❤️', description: 'Chẩn đoán bệnh lý mạch vành, rối loạn nhịp tim, siêu âm tim Doppler.', doctorCount: 6 },
    { id: 'spec-mat', code: 'MAT', name: 'Mắt - Nhãn Khoa', icon: '👁️', description: 'Đo khúc xạ, tầm soát cườm khô, đục thủy tinh thể và các tật về mắt.', doctorCount: 5 }
  ];

  /**
   * Danh sách Bác sĩ
   */
  readonly DOCTORS: Doctor[] = [
    {
      id: 'doc-01',
      name: 'Nguyễn Văn Hùng',
      title: 'PGS.TS - Thầy thuốc Ưu tú',
      specialtyId: 'spec-noi',
      specialtyName: 'Nội Tổng Quát',
      hospital: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      address: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      experienceYears: 25,
      rating: 4.9,
      reviewCount: 342,
      consultationFee: 400000,
      bio: 'Chuyên gia đầu ngành về bệnh lý nội tiết chuyển hóa và đái tháo đường.',
      availableDays: [1, 2, 3, 4, 5]
    },
    {
      id: 'doc-02',
      name: 'Trần Thị Thu Hà',
      title: 'BS.CKII',
      specialtyId: 'spec-nhi',
      specialtyName: 'Nhi Khoa',
      hospital: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      address: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1594824813576-96b42b938f38?w=400&auto=format&fit=crop&q=80',
      experienceYears: 18,
      rating: 5.0,
      reviewCount: 512,
      consultationFee: 350000,
      bio: 'Bác sĩ chuyên khoa II Nhi với 18 năm kinh nghiệm, tận tâm, thấu hiểu tâm lý trẻ nhỏ.',
      availableDays: [1, 2, 3, 5, 6]
    },
    {
      id: 'doc-03',
      name: 'Lê Hoàng Nam',
      title: 'ThS.BS',
      specialtyId: 'spec-tmh',
      specialtyName: 'Tai Mũi Họng',
      hospital: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      address: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      experienceYears: 12,
      rating: 4.8,
      reviewCount: 228,
      consultationFee: 300000,
      bio: 'Tốt nghiệp Đại học Y Hà Nội, chuyên gia phẫu thuật nội soi xoang và viêm tai giữa.',
      availableDays: [1, 3, 4, 5, 6]
    },
    {
      id: 'doc-04',
      name: 'Vũ Quốc Bảo',
      title: 'ThS.BS',
      specialtyId: 'spec-timmach',
      specialtyName: 'Tim Mạch',
      hospital: 'Bệnh viện Bạch Mai',
      address: '78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80',
      experienceYears: 15,
      rating: 4.85,
      reviewCount: 310,
      consultationFee: 400000,
      bio: 'Chuyên gia can thiệp tim mạch, tư vấn và điều trị tăng huyết áp vô căn, suy tim.',
      availableDays: [1, 3, 5, 6]
    },
    {
      id: 'doc-05',
      name: 'Đặng Ngọc Lan',
      title: 'BS.CKII - Thầy thuốc Ưu tú',
      specialtyId: 'spec-san',
      specialtyName: 'Sản Phụ Khoa',
      hospital: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
      address: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      experienceYears: 22,
      rating: 4.95,
      reviewCount: 680,
      consultationFee: 450000,
      bio: 'Chuyên gia quản lý thai kỳ nguy cơ cao và siêu âm hình thái thai.',
      availableDays: [1, 2, 4, 5, 6]
    }
  ];

  /**
   * Danh sách khung giờ khám chuẩn VNPT DrCare
   */
  readonly TIME_RANGES = [
    { value: '07:30 - 08:00', label: '07:30 - 08:00 (Sáng)' },
    { value: '08:00 - 08:30', label: '08:00 - 08:30 (Sáng)' },
    { value: '08:30 - 09:00', label: '08:30 - 09:00 (Sáng)' },
    { value: '09:00 - 09:30', label: '09:00 - 09:30 (Sáng)' },
    { value: '09:30 - 10:00', label: '09:30 - 10:00 (Sáng)' },
    { value: '10:00 - 10:30', label: '10:00 - 10:30 (Sáng)' },
    { value: '10:30 - 11:00', label: '10:30 - 11:00 (Sáng)' },
    { value: '13:30 - 14:00', label: '13:30 - 14:00 (Chiều)' },
    { value: '14:00 - 14:30', label: '14:00 - 14:30 (Chiều)' },
    { value: '14:30 - 15:00', label: '14:30 - 15:00 (Chiều)' },
    { value: '15:00 - 15:30', label: '15:00 - 15:30 (Chiều)' },
    { value: '15:30 - 16:00', label: '15:30 - 16:00 (Chiều)' },
    { value: '16:00 - 16:30', label: '16:00 - 16:30 (Chiều)' }
  ];

  generateSlotsForDoctor(doctorId: string, dateStr: string): TimeSlot[] {
    return this.TIME_RANGES.map((t, idx) => ({
      id: `slot-${doctorId}-${dateStr}-${idx}`,
      doctorId,
      date: dateStr,
      startTime: t.value.split(' - ')[0],
      endTime: t.value.split(' - ')[1].split(' ')[0],
      session: idx < 7 ? 'MORNING' : 'AFTERNOON',
      maxPatients: 3,
      bookedPatients: (idx === 1 || idx === 8) ? 3 : 1,
      isAvailable: !(idx === 1 || idx === 8)
    }));
  }

  getInitialAppointments(): Appointment[] {
    return [
      {
        id: 'apt-demo-01',
        appointmentCode: 'DRC-2026-9812',
        billingTarget: 'HOSPITAL_FEE',
        provinceName: 'Hà Nội',
        hospital: 'Bệnh viện Đa khoa Bưu Điện (VNPT)',
        hospitalAddress: 'Số 49 Trần Điền, Định Công, Hoàng Mai, Hà Nội',
        examServiceName: 'Khám chuyên khoa theo yêu cầu',
        clinicRoomName: 'Phòng 102 - Khám Nội tổng hợp',
        doctorName: 'Nguyễn Văn Hùng',
        doctorTitle: 'PGS.TS',
        doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
        specialtyName: 'Nội Tổng Quát',
        date: '10/11/2026',
        timeRange: '08:30 - 09:00',
        session: 'MORNING',
        patient: {
          bookingFor: 'SELF',
          fullName: 'PHAN TIẾN DŨNG',
          phone: '0912345678',
          dob: '1990-08-15',
          gender: 'MALE',
          cccd: '001090008899',
          insuranceCard: 'DN4010123456789',
          symptoms: 'Đau tức ngực nhẹ khi làm việc căng thẳng, muốn kiểm tra tầm soát tim mạch và huyết áp.'
        },
        consultationFee: 300000,
        status: 'UPCOMING',
        qrCodeData: 'DRC:DRC-2026-9812|FAC:fac-01|DATE:10/11/2026|TIME:08:30|PATIENT:001090008899',
        createdAt: '2026-11-09T08:30:00Z'
      }
    ];
  }
}
