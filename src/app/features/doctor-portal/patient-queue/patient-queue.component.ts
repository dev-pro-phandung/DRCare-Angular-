import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Appointment } from '../../../core/models/appointment.model';

@Component({
  selector: 'app-patient-queue',
  standalone: true,
  template: `
    <div class="queue-container container">
      <h2>Hàng Đợi Tiếp Nhận Bệnh Nhân (Patient Queue)</h2>
      <p class="subtitle">Danh sách bệnh nhân đến khám trong ngày theo giờ hẹn</p>

      <div class="queue-card">
        @if (appointments.length === 0) {
          <p class="empty">Hiện chưa có bệnh nhân nào trong hàng đợi hôm nay.</p>
        } @else {
          <table class="queue-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã hẹn</th>
                <th>Giờ khám</th>
                <th>Bệnh nhân</th>
                <th>SĐT</th>
                <th>CCCD</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              @for (apt of appointments; track apt.id; let idx = $index) {
                <tr>
                  <td><strong>#{{ idx + 1 }}</strong></td>
                  <td><span class="code">{{ apt.appointmentCode }}</span></td>
                  <td><span class="time">{{ apt.timeRange }}</span></td>
                  <td><strong>{{ apt.patient.fullName }}</strong></td>
                  <td>{{ apt.patient.phone }}</td>
                  <td>{{ apt.patient.cccd }}</td>
                  <td>
                    <span class="badge" [class]="'badge-' + apt.status.toLowerCase()">
                      {{ apt.status === 'UPCOMING' ? 'Đang đợi' : (apt.status === 'COMPLETED' ? 'Đã khám' : 'Đã hủy') }}
                    </span>
                  </td>
                  <td>
                    @if (apt.status === 'UPCOMING') {
                      <button type="button" class="btn-call" (click)="callPatient(apt)">
                        📢 Mời vào khám
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
  styles: [`
    .queue-container {
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

    .queue-card {
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      overflow-x: auto;
    }

    .queue-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th {
        padding: 0.85rem 1rem;
        background: #f8fafc;
        font-size: 0.8rem;
        font-weight: 700;
        color: #64748b;
        border-bottom: 2px solid var(--border-color);
      }

      td {
        padding: 1rem;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.9rem;
      }

      .code {
        font-weight: 700;
        color: var(--primary);
      }

      .time {
        font-weight: 700;
        color: #0f172a;
      }

      .btn-call {
        background: #10b981;
        color: #ffffff;
        border: none;
        padding: 0.4rem 0.85rem;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: #059669;
        }
      }
    }
  `]
})
export class PatientQueueComponent implements OnInit {
  private api = inject(ApiService);
  appointments: Appointment[] = [];

  ngOnInit(): void {
    this.api.getAppointments().subscribe(list => {
      this.appointments = list;
    });
  }

  callPatient(apt: Appointment): void {
    alert(`Đã gửi thông báo mời bệnh nhân ${apt.patient.fullName} (Mã ${apt.appointmentCode}) vào phòng khám!`);
  }
}
