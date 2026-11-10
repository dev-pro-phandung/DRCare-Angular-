import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    @if (isOpen) {
      <div class="modal-backdrop" (click)="onCancel()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <span class="warning-icon">⚠️</span>
            <h3>{{ title }}</h3>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">{{ cancelText }}</button>
            <button type="button" class="btn btn-danger" (click)="onConfirm()">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 1rem;
      backdrop-filter: blur(2px);
    }

    .modal-content {
      background: #ffffff;
      border-radius: 16px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      animation: modalScale 0.2s ease-out;
    }

    .modal-header {
      padding: 1.5rem 1.5rem 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .warning-icon {
        font-size: 1.5rem;
      }

      h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        color: #1e293b;
      }
    }

    .modal-body {
      padding: 0 1.5rem 1.5rem;
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .modal-footer {
      background-color: #f8fafc;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      border-top: 1px solid #e2e8f0;

      .btn {
        padding: 0.6rem 1.25rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        border: none;
        transition: all 0.2s;

        &-secondary {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          &:hover { background-color: #f1f5f9; }
        }

        &-danger {
          background-color: #ef4444;
          color: #ffffff;
          &:hover { background-color: #dc2626; }
        }
      }
    }

    @keyframes modalScale {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Xác nhận thao tác';
  @Input() message = 'Bạn có chắc chắn muốn thực hiện hành động này không?';
  @Input() confirmText = 'Đồng ý';
  @Input() cancelText = 'Hủy bỏ';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
