export interface Doctor {
  id: string;
  name: string;
  title: string;              // PGS.TS, BS.CKII, ThS.BS, Bác sĩ
  specialtyId: string;
  specialtyName: string;
  hospital: string;           // Cơ sở y tế / Bệnh viện liên kết VNPT DrCare
  address: string;
  avatar: string;
  experienceYears: number;
  rating: number;             // Điểm đánh giá (1 - 5)
  reviewCount: number;        // Số lượt đánh giá
  consultationFee: number;    // Giá khám niêm yết (VNĐ)
  bio: string;                // Tóm tắt quá trình công tác
  availableDays: number[];    // 0: CN, 1: T2, ..., 6: T7
}
