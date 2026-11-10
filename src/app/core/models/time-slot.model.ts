export type SlotSession = 'MORNING' | 'AFTERNOON';

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;               // Định dạng YYYY-MM-DD
  startTime: string;          // Ví dụ: "08:00"
  endTime: string;            // Ví dụ: "08:30"
  session: SlotSession;       // Ca Sáng hoặc Ca Chiều
  maxPatients: number;        // Giới hạn bệnh nhân tối đa trong khung giờ
  bookedPatients: number;     // Số bệnh nhân đã đặt
  isAvailable: boolean;       // Còn trống hay đã kín
}
