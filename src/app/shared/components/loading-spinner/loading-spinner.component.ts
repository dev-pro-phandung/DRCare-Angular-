import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-overlay" [class.inline]="inline">
      <div class="spinner"></div>
      @if (message) {
        <p class="spinner-msg">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .spinner-overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem;
      gap: 1rem;

      &.inline {
        padding: 1rem;
      }
    }

    .spinner {
      width: 42px;
      height: 42px;
      border: 3.5px solid #e2e8f0;
      border-top-color: #0b57d0;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .spinner-msg {
      font-size: 0.9rem;
      font-weight: 500;
      color: #64748b;
      margin: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Đang tải dữ liệu...';
  @Input() inline: boolean = false;
}
