import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AplicacionService } from '../../core/services/aplicacion.service';
import { AuthService } from '../../core/services/auth.service';
import { Aplicacion } from '../../models/aplicacion.model';
import { ModalComponent } from '../../shared/modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-aplicacion-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmDialogComponent],
  template: `
    <div class="sofis-list">
      <div class="sofis-list__header">
        <h1 class="sofis-list__title">
          <svg class="sofis-list__title-icon" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Aplicaciones
        </h1>
        <div class="sofis-list__actions">
          <button *ngIf="authService.isAdmin()" class="sofis-btn sofis-btn--primary" (click)="openForm()">
            + Nueva Aplicación
          </button>
        </div>
      </div>

      <div *ngIf="errorMessage" class="sofis-list__alert sofis-list__alert--error">
        {{ errorMessage }}
        <button class="sofis-list__alert__close" (click)="errorMessage = ''">×</button>
      </div>
      <div *ngIf="successMessage" class="sofis-list__alert sofis-list__alert--success">
        {{ successMessage }}
        <button class="sofis-list__alert__close" (click)="successMessage = ''">×</button>
      </div>

      <table class="sofis-list__table">
        <thead class="sofis-list__table-head">
          <tr>
            <th class="sofis-list__table-header">ID</th>
            <th class="sofis-list__table-header">Nombre</th>
            <th class="sofis-list__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let app of aplicaciones" class="sofis-list__table-row">
            <td class="sofis-list__table-cell">{{ app.idAplicacion }}</td>
            <td class="sofis-list__table-cell">{{ app.nombre }}</td>
            <td class="sofis-list__table-cell">
              <div class="sofis-list__actions-cell">
                <ng-container *ngIf="authService.isAdmin()">
                  <button (click)="openForm(app)" class="sofis-btn sofis-btn--edit">Editar</button>
                  <button (click)="confirmDelete(app)" class="sofis-btn sofis-btn--delete">Eliminar</button>
                </ng-container>
                <span *ngIf="!authService.isAdmin()">-</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="aplicaciones.length === 0" class="sofis-list__empty">
        No hay aplicaciones registradas
      </div>
    </div>

    <app-modal [show]="showForm" [title]="editing ? 'Editar Aplicación' : 'Nueva Aplicación'" size="sm" (closed)="closeForm()">
      <form class="sofis-form" (ngSubmit)="onSubmit()">
        <div class="sofis-form__group">
          <label class="sofis-form__label">ID Aplicación <span>*</span></label>
          <input [(ngModel)]="formData.idAplicacion" name="idAplicacion" class="sofis-form__input" placeholder="Ej: APP001" [disabled]="editing" required>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Nombre <span>*</span></label>
          <input [(ngModel)]="formData.nombre" name="nombre" class="sofis-form__input" placeholder="Nombre de la aplicación" required>
        </div>
        <div class="sofis-form__actions">
          <button type="button" class="sofis-btn sofis-btn--cancel" (click)="closeForm()">Cancelar</button>
          <button type="submit" class="sofis-btn sofis-btn--primary" [disabled]="loading">
            {{ editing ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </app-modal>

    <app-confirm-dialog
      [show]="showConfirm"
      title="Eliminar Aplicación"
      [message]="'¿Está seguro de eliminar la aplicación ' + deletingApp?.nombre + '? Esta acción no se puede deshacer.'"
      confirmText="Eliminar"
      cancelText="Cancelar"
      type="danger"
      (confirm)="onDelete()"
      (cancel)="showConfirm = false">
    </app-confirm-dialog>
  `,
  styles: [`
    .sofis-form__group { margin-bottom: var(--sofis-spacing-lg); }
    .sofis-form__label { display: block; font-size: var(--sofis-font-size-sm); font-weight: 600; margin-bottom: var(--sofis-spacing-xs); color: var(--sofis-text-primary); }
    .sofis-form__label span { color: var(--sofis-danger); }
    .sofis-form__input { width: 100%; padding: var(--sofis-spacing-sm) var(--sofis-spacing-md); border: 2px solid var(--sofis-border); border-radius: var(--sofis-border-radius); font-size: var(--sofis-font-size-base); font-family: var(--sofis-font-family); transition: var(--sofis-transition); }
    .sofis-form__input:focus { outline: none; border-color: var(--sofis-secondary); box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15); }
    .sofis-form__input:disabled { background: var(--sofis-bg-main); }
    .sofis-form__actions { display: flex; gap: var(--sofis-spacing-md); justify-content: flex-end; margin-top: var(--sofis-spacing-xl); }
    .sofis-btn--cancel { background: var(--sofis-bg-main); color: var(--sofis-text-secondary); }
    .sofis-btn--cancel:hover { background: var(--sofis-border); }
  `]
})
export class AplicacionListComponent implements OnInit {
  aplicaciones: Aplicacion[] = [];
  showForm = false;
  showConfirm = false;
  editing = false;
  editingId: string | null = null;
  deletingApp: Aplicacion | null = null;
  formData: any = {};
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private aplicacionService: AplicacionService, public authService: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    this.aplicacionService.getAll().subscribe({
      next: data => this.aplicaciones = data,
      error: err => this.errorMessage = 'Error al cargar aplicaciones'
    });
  }

  openForm(app?: Aplicacion) {
    if (app) {
      this.editing = true;
      this.editingId = app.idAplicacion;
      this.formData = { ...app };
    } else {
      this.editing = false;
      this.editingId = null;
      this.formData = {};
    }
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editing = false;
    this.editingId = null;
    this.formData = {};
  }

  confirmDelete(app: Aplicacion) {
    this.deletingApp = app;
    this.showConfirm = true;
  }

  onDelete() {
    if (this.deletingApp) {
      this.aplicacionService.delete(this.deletingApp.idAplicacion).subscribe({
        next: () => {
          this.successMessage = 'Aplicación eliminada correctamente';
          this.load();
          this.showConfirm = false;
          this.deletingApp = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al eliminar aplicación';
          this.showConfirm = false;
        }
      });
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const request = this.editing && this.editingId
      ? this.aplicacionService.update(this.editingId, this.formData)
      : this.aplicacionService.create(this.formData);
    request.subscribe({
      next: () => {
        this.successMessage = this.editing ? 'Aplicación actualizada' : 'Aplicación creada';
        this.loading = false;
        this.load();
        this.closeForm();
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al guardar';
        this.loading = false;
      }
    });
  }
}