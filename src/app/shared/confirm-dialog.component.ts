import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sofis-modal" *ngIf="show">
      <div class="sofis-modal__backdrop" (click)="onCancel()"></div>
      <div class="sofis-modal__dialog">
        <div class="sofis-modal__header">
          <h3 class="sofis-modal__title">{{ title }}</h3>
          <button class="sofis-modal__close" (click)="onCancel()">×</button>
        </div>
        <div class="sofis-modal__body">
          <div class="sofis-modal__icon" [class]="'sofis-modal__icon--' + type">
            <svg *ngIf="type === 'warning'" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <svg *ngIf="type === 'danger'" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p class="sofis-modal__message">{{ message }}</p>
        </div>
        <div class="sofis-modal__footer">
          <button class="sofis-btn sofis-btn--cancel" (click)="onCancel()">
            {{ cancelText }}
          </button>
          <button class="sofis-btn sofis-btn--confirm" [class]="'sofis-btn--' + type" (click)="onConfirm()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sofis-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--sofis-spacing-md);
    }

    .sofis-modal__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }

    .sofis-modal__dialog {
      background: var(--sofis-bg-white);
      border-radius: var(--sofis-border-radius-lg);
      box-shadow: var(--sofis-shadow-lg);
      width: 100%;
      max-width: 400px;
      position: relative;
      animation: modalSlideIn 0.3s ease;
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .sofis-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--sofis-spacing-lg) var(--sofis-spacing-xl);
      border-bottom: 1px solid var(--sofis-border);
    }

    .sofis-modal__title {
      margin: 0;
      font-size: var(--sofis-font-size-lg);
      color: var(--sofis-text-primary);
    }

    .sofis-modal__close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--sofis-text-muted);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: var(--sofis-transition);
    }

    .sofis-modal__close:hover {
      color: var(--sofis-text-primary);
    }

    .sofis-modal__body {
      padding: var(--sofis-spacing-xl);
      text-align: center;
    }

    .sofis-modal__icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--sofis-spacing-lg);
    }

    .sofis-modal__icon svg {
      width: 32px;
      height: 32px;
      stroke-width: 2;
      fill: none;
    }

    .sofis-modal__icon--warning {
      background: #fef3c7;
    }

    .sofis-modal__icon--warning svg {
      stroke: #f59e0b;
    }

    .sofis-modal__icon--danger {
      background: #fee2e2;
    }

    .sofis-modal__icon--danger svg {
      stroke: var(--sofis-danger);
    }

    .sofis-modal__message {
      margin: 0;
      color: var(--sofis-text-secondary);
      font-size: var(--sofis-font-size-base);
      line-height: 1.6;
    }

    .sofis-modal__footer {
      display: flex;
      gap: var(--sofis-spacing-md);
      padding: var(--sofis-spacing-lg) var(--sofis-spacing-xl);
      border-top: 1px solid var(--sofis-border);
      justify-content: flex-end;
    }

    .sofis-btn {
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-lg);
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
      cursor: pointer;
      transition: var(--sofis-transition);
      border: none;
      font-family: var(--sofis-font-family);
    }

    .sofis-btn--cancel {
      background: var(--sofis-bg-main);
      color: var(--sofis-text-secondary);
    }

    .sofis-btn--cancel:hover {
      background: var(--sofis-border);
    }

    .sofis-btn--confirm {
      color: white;
    }

    .sofis-btn--warning {
      background: #f59e0b;
    }

    .sofis-btn--warning:hover {
      background: #d97706;
    }

    .sofis-btn--danger {
      background: var(--sofis-danger);
    }

    .sofis-btn--danger:hover {
      background: #c0392b;
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() show = false;
  @Input() title = 'Confirmar';
  @Input() message = '¿Está seguro de realizar esta acción?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() type: 'warning' | 'danger' = 'danger';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}