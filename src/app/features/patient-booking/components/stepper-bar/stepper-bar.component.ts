import { Component, inject } from '@angular/core';
import { BookingStateService, VNPTBookingStep } from '../../services/booking-state.service';

@Component({
  selector: 'app-stepper-bar',
  standalone: true,
  template: `
    <div class="vnpt-stepper-container">
      <div class="stepper-track">
        <!-- Step 1 -->
        <div class="step-node" [class.active]="state.currentStep() === 1" [class.completed]="state.currentStep() > 1">
          <div class="circle">
            @if (state.currentStep() > 1) { <span>✓</span> } @else { <span>1</span> }
          </div>
          <span class="label">Nhập thông tin đặt lịch</span>
        </div>

        <div class="track-line" [class.completed]="state.currentStep() > 1"></div>

        <!-- Step 2 -->
        <div class="step-node" [class.active]="state.currentStep() === 2" [class.completed]="state.currentStep() > 2">
          <div class="circle">
            @if (state.currentStep() > 2) { <span>✓</span> } @else { <span>2</span> }
          </div>
          <span class="label">Xác nhận thông tin</span>
        </div>

        <div class="track-line" [class.completed]="state.currentStep() > 2"></div>

        <!-- Step 3 -->
        <div class="step-node" [class.active]="state.currentStep() === 3">
          <div class="circle">
            <span>3</span>
          </div>
          <span class="label">Hoàn thành</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vnpt-stepper-container {
      background: #ffffff;
      border-radius: 16px;
      padding: 1.5rem 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      border: 1px solid #eef2f6;

      .stepper-track {
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .step-node {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        z-index: 2;

        .circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #cbd5e1;
          color: #94a3b8;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        &.active {
          .circle {
            background: #0b57d0;
            border-color: #0b57d0;
            color: #ffffff;
            box-shadow: 0 0 0 4px #eff6ff;
          }
          .label {
            color: #0b57d0;
            font-weight: 700;
          }
        }

        &.completed {
          .circle {
            background: #0b57d0;
            border-color: #0b57d0;
            color: #ffffff;
          }
          .label {
            color: #1e293b;
          }
        }
      }

      .track-line {
        flex: 1;
        height: 2px;
        background: #e2e8f0;
        margin: 0 1.5rem -1.25rem;
        transition: background 0.3s ease;

        &.completed {
          background: #0b57d0;
        }
      }

      @media (max-width: 600px) {
        padding: 1.25rem 1rem;
        .track-line { margin: 0 0.5rem -1.25rem; }
        .step-node .label { font-size: 0.75rem; }
      }
    }
  `]
})
export class StepperBarComponent {
  readonly state = inject(BookingStateService);
}
