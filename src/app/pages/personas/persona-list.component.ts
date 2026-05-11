import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaService } from '../../core/services/persona.service';
import { AuthService } from '../../core/services/auth.service';
import { Persona } from '../../models/persona.model';
import { ModalComponent } from '../../shared/modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmDialogComponent],
  template: `
    <div class="sofis-list">
      <div class="sofis-list__header">
        <h1 class="sofis-list__title">
          <svg class="sofis-list__title-icon" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Personas
        </h1>
        <div class="sofis-list__actions">
          <button *ngIf="authService.isAdmin()" class="sofis-btn sofis-btn--primary" (click)="openForm()">
            + Nueva Persona
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
            <th class="sofis-list__table-header">Apellido</th>
            <th class="sofis-list__table-header">Email</th>
            <th class="sofis-list__table-header">Teléfono</th>
            <th class="sofis-list__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let persona of personas" class="sofis-list__table-row">
            <td class="sofis-list__table-cell">{{ persona.idPersona }}</td>
            <td class="sofis-list__table-cell">{{ persona.nombre }}</td>
            <td class="sofis-list__table-cell">{{ persona.apellido }}</td>
            <td class="sofis-list__table-cell">{{ persona.email }}</td>
            <td class="sofis-list__table-cell">{{ persona.telefono }}</td>
            <td class="sofis-list__table-cell">
              <div class="sofis-list__actions-cell">
                <ng-container *ngIf="authService.isAdmin()">
                  <button (click)="openForm(persona)" class="sofis-btn sofis-btn--edit">Editar</button>
                  <button (click)="confirmDelete(persona)" class="sofis-btn sofis-btn--delete">Eliminar</button>
                </ng-container>
                <span *ngIf="!authService.isAdmin()">-</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="personas.length === 0" class="sofis-list__empty">
        No hay personas registradas
      </div>
    </div>

    <app-modal [show]="showForm" [title]="editing ? 'Editar Persona' : 'Nueva Persona'" size="md" (closed)="closeForm()">
      <form class="sofis-form" (ngSubmit)="onSubmit()">
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Nombre <span>*</span></label>
            <input [(ngModel)]="formData.nombre" name="nombre" class="sofis-form__input" placeholder="Nombre" required>
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Apellido <span>*</span></label>
            <input [(ngModel)]="formData.apellido" name="apellido" class="sofis-form__input" placeholder="Apellido" required>
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Email <span>*</span></label>
          <input [(ngModel)]="formData.email" name="email" class="sofis-form__input" type="email" placeholder="email@ejemplo.com" required>
        </div>
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Teléfono</label>
            <input [(ngModel)]="formData.telefono" name="telefono" class="sofis-form__input" placeholder="Teléfono">
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Tipo Documento</label>
            <input [(ngModel)]="formData.tipoDocumento" name="tipoDocumento" class="sofis-form__input" placeholder="D, C, etc.">
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Doc. Identidad</label>
          <input [(ngModel)]="formData.docIdentidad" name="docIdentidad" class="sofis-form__input" placeholder="Número de documento">
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Dirección</label>
          <input [(ngModel)]="formData.direccion" name="direccion" class="sofis-form__input" placeholder="Dirección">
        </div>
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Distrito</label>
            <input [(ngModel)]="formData.distrito" name="distrito" class="sofis-form__input" placeholder="Distrito">
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Provincia</label>
            <input [(ngModel)]="formData.provincia" name="provincia" class="sofis-form__input" placeholder="Provincia">
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Departamento</label>
          <input [(ngModel)]="formData.departamento" name="departamento" class="sofis-form__input" placeholder="Departamento">
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
      title="Eliminar Persona"
      [message]="'¿Está seguro de eliminar a ' + deletingPersona?.nombre + ' ' + deletingPersona?.apellido + '? Esta acción no se puede deshacer.'"
      confirmText="Eliminar"
      cancelText="Cancelar"
      type="danger"
      (confirm)="onDelete()"
      (cancel)="showConfirm = false">
    </app-confirm-dialog>
  `,
  styles: [`
    .sofis-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sofis-spacing-lg); }
    .sofis-form__group { margin-bottom: var(--sofis-spacing-lg); }
    .sofis-form__label { display: block; font-size: var(--sofis-font-size-sm); font-weight: 600; margin-bottom: var(--sofis-spacing-xs); color: var(--sofis-text-primary); }
    .sofis-form__label span { color: var(--sofis-danger); }
    .sofis-form__input, .sofis-form__select { width: 100%; padding: var(--sofis-spacing-sm) var(--sofis-spacing-md); border: 2px solid var(--sofis-border); border-radius: var(--sofis-border-radius); font-size: var(--sofis-font-size-base); font-family: var(--sofis-font-family); transition: var(--sofis-transition); }
    .sofis-form__input:focus, .sofis-form__select:focus { outline: none; border-color: var(--sofis-secondary); box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15); }
    .sofis-form__actions { display: flex; gap: var(--sofis-spacing-md); justify-content: flex-end; margin-top: var(--sofis-spacing-xl); }
    .sofis-btn--cancel { background: var(--sofis-bg-main); color: var(--sofis-text-secondary); }
    .sofis-btn--cancel:hover { background: var(--sofis-border); }
    @media (max-width: 600px) { .sofis-form__row { grid-template-columns: 1fr; } }
  `]
})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];
  showForm = false;
  showConfirm = false;
  editing = false;
  editingId: number | null = null;
  deletingPersona: Persona | null = null;
  formData: any = {};
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private personaService: PersonaService, public authService: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    this.personaService.getAll().subscribe({
      next: data => this.personas = data,
      error: err => this.errorMessage = 'Error al cargar personas'
    });
  }

  openForm(persona?: Persona) {
    if (persona) {
      this.editing = true;
      this.editingId = persona.idPersona!;
      this.formData = { ...persona };
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

  confirmDelete(persona: Persona) {
    this.deletingPersona = persona;
    this.showConfirm = true;
  }

  onDelete() {
    if (this.deletingPersona) {
      this.personaService.delete(this.deletingPersona.idPersona!).subscribe({
        next: () => {
          this.successMessage = 'Persona eliminada correctamente';
          this.load();
          this.showConfirm = false;
          this.deletingPersona = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al eliminar persona';
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
      ? this.personaService.update(this.editingId, this.formData)
      : this.personaService.create(this.formData);
    request.subscribe({
      next: () => {
        this.successMessage = this.editing ? 'Persona actualizada' : 'Persona creada';
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