import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sofis-modal-overlay" *ngIf="show" (click)="onBackdropClick($event)">
      <div class="sofis-modal-container" [class]="'sofis-modal-' + size" [style.max-width]="maxWidth">
        <div class="sofis-modal-header">
          <h2 class="sofis-modal-title">{{ title }}</h2>
          <button class="sofis-modal-close" (click)="close()">×</button>
        </div>
        <div class="sofis-modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sofis-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--sofis-spacing-md);
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .sofis-modal-container {
      background: var(--sofis-bg-white);
      border-radius: var(--sofis-border-radius-lg);
      box-shadow: var(--sofis-shadow-lg);
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .sofis-modal-sm { max-width: 400px; }
    .sofis-modal-md { max-width: 600px; }
    .sofis-modal-lg { max-width: 800px; }
    .sofis-modal-xl { max-width: 1000px; }

    .sofis-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--sofis-spacing-lg) var(--sofis-spacing-xl);
      border-bottom: 1px solid var(--sofis-border);
      flex-shrink: 0;
    }

    .sofis-modal-title {
      margin: 0;
      font-size: var(--sofis-font-size-xl);
      color: var(--sofis-primary);
      font-weight: 600;
    }

    .sofis-modal-close {
      background: none;
      border: none;
      font-size: 2rem;
      color: var(--sofis-text-muted);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: var(--sofis-transition);
    }

    .sofis-modal-close:hover {
      color: var(--sofis-danger);
    }

    .sofis-modal-body {
      padding: var(--sofis-spacing-xl);
      overflow-y: auto;
      flex: 1;
    }

    @media (max-width: 768px) {
      .sofis-modal-container {
        max-height: 95vh;
      }

      .sofis-modal-header {
        padding: var(--sofis-spacing-md) var(--sofis-spacing-lg);
      }

      .sofis-modal-body {
        padding: var(--sofis-spacing-lg);
      }
    }
  `]
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() maxWidth = '';
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.show) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (this.closeOnBackdrop && (event.target as HTMLElement).classList.contains('sofis-modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.show = false;
    this.closed.emit();
  }
}