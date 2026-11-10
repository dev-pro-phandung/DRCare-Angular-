import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Doctor } from '../../../core/models/doctor.model';

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  template: `
    <div class="schedule-container container">
      <h2>Lịch Trực Bác Sĩ (Doctor Portal)</h2>
      <p class="subtitle">Xem và quản lý ca khám trong tuần</p>
      
      <div class="schedule-card">
        @if (doctor) {
          <div class="doctor-badge">
            <img [src]="doctor.avatar" class="avatar" />
            <div>
              <h3>{{ doctor.title }} {{ doctor.name }}</h3>
              <p>Chuyên khoa: {{ doctor.specialtyName }} - {{ doctor.hospital }}</p>
            </div>
          </div>
        }

        <div class="week-table">
          <div class="day-col">
            <span class="day-head">Thứ Hai</span>
            <div class="shift morning">08:00 - 11:30 (Đang khám)</div>
            <div class="shift afternoon">13:30 - 17:00 (Đang khám)</div>
          </div>
          <div class="day-col">
            <span class="day-head">Thứ Ba</span>
            <div class="shift morning">08:00 - 11:30 (Đang khám)</div>
            <div class="shift off">Nghỉ</div>
          </div>
          <div class="day-col">
            <span class="day-head">Thứ Tư</span>
            <div class="shift morning">08:00 - 11:30 (Đang khám)</div>
            <div class="shift afternoon">13:30 - 17:00 (Đang khám)</div>
          </div>
          <div class="day-col">
            <span class="day-head">Thứ Năm</span>
            <div class="shift morning">08:00 - 11:30 (Đang khám)</div>
            <div class="shift afternoon">13:30 - 17:00 (Đang khám)</div>
          </div>
          <div class="day-col">
            <span class="day-head">Thứ Sáu</span>
            <div class="shift morning">08:00 - 11:30 (Đang khám)</div>
            <div class="shift afternoon">13:30 - 17:00 (Đang khám)</div>
          </div>
          <div class="day-col">
            <span class="day-head">Thứ Bảy</span>
            <div class="shift morning">08:00 - 11:30 (Ca sáng)</div>
            <div class="shift off">Nghỉ</div>
          </div>
          <div class="day-col">
            <span class="day-head">Chủ Nhật</span>
            <div class="shift off">Nghỉ</div>
            <div class="shift off">Nghỉ</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .schedule-container {
      padding: 3rem 1.5rem;

      h2 {
        font-size: 2rem;
        font-weight: 800;
        margin: 0 0 0.5rem;
      }

      .subtitle {
        color: #64748b;
        margin: 0 0 2rem;
      }
    }

    .schedule-card {
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);

      .doctor-badge {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 2rem;

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }

        h3 {
          margin: 0 0 0.25rem;
          font-size: 1.25rem;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.9rem;
        }
      }

      .week-table {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.75rem;

        .day-col {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;

          .day-head {
            display: block;
            background: #f8fafc;
            padding: 0.6rem;
            text-align: center;
            font-weight: 700;
            font-size: 0.85rem;
            border-bottom: 1px solid var(--border-color);
          }

          .shift {
            padding: 0.75rem 0.5rem;
            font-size: 0.75rem;
            text-align: center;
            border-bottom: 1px solid #f1f5f9;

            &.morning {
              background: #f0fdf4;
              color: #166534;
            }

            &.afternoon {
              background: #eff6ff;
              color: #1e40af;
            }

            &.off {
              background: #f8fafc;
              color: #94a3b8;
            }
          }
        }
      }
    }

    @media (max-width: 900px) {
      .schedule-card .week-table {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DoctorScheduleComponent implements OnInit {
  private api = inject(ApiService);
  doctor: Doctor | null = null;

  ngOnInit(): void {
    this.api.getDoctors().subscribe(docs => {
      if (docs.length > 0) {
        this.doctor = docs[0];
      }
    });
  }
}

