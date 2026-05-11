import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../core/services/cliente.service';
import { AuthService } from '../../core/services/auth.service';
import { Cliente } from '../../models/cliente.model';
import { ModalComponent } from '../../shared/modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmDialogComponent],
  template: `
    <div class="sofis-list">
      <div class="sofis-list__header">
        <h1 class="sofis-list__title">
          <svg class="sofis-list__title-icon" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          Clientes
        </h1>
        <div class="sofis-list__actions">
          <button *ngIf="authService.isAdmin()" class="sofis-btn sofis-btn--primary" (click)="openForm()">
            + Nuevo Cliente
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
            <th class="sofis-list__table-header">Razón Social</th>
            <th class="sofis-list__table-header">Tipo</th>
            <th class="sofis-list__table-header">Sector</th>
            <th class="sofis-list__table-header">Estado</th>
            <th class="sofis-list__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clientes" class="sofis-list__table-row">
            <td class="sofis-list__table-cell">{{ cliente.idCliente }}</td>
            <td class="sofis-list__table-cell">{{ cliente.razonSocial }}</td>
            <td class="sofis-list__table-cell">{{ cliente.tipoCliente }}</td>
            <td class="sofis-list__table-cell">{{ cliente.sector }}</td>
            <td class="sofis-list__table-cell">
              <span class="sofis-list__badge" [class.sofis-list__badge--active]="cliente.estado === 'ACT'" [class.sofis-list__badge--inactive]="cliente.estado !== 'ACT'">
                {{ cliente.estado }}
              </span>
            </td>
            <td class="sofis-list__table-cell">
              <div class="sofis-list__actions-cell">
                <ng-container *ngIf="authService.isAdmin()">
                  <button (click)="openForm(cliente)" class="sofis-btn sofis-btn--edit">Editar</button>
                  <button (click)="confirmDelete(cliente)" class="sofis-btn sofis-btn--delete">Eliminar</button>
                </ng-container>
                <span *ngIf="!authService.isAdmin()">-</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="clientes.length === 0" class="sofis-list__empty">
        No hay clientes registrados
      </div>
    </div>

    <app-modal [show]="showForm" [title]="editing ? 'Editar Cliente' : 'Nuevo Cliente'" size="md" (closed)="closeForm()">
      <form class="sofis-form" (ngSubmit)="onSubmit()">
        <div class="sofis-form__group">
          <label class="sofis-form__label">ID Persona</label>
          <input [(ngModel)]="formData.idPersona" name="idPersona" class="sofis-form__input" type="number" placeholder="Ingrese ID de persona">
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Razón Social <span>*</span></label>
          <input [(ngModel)]="formData.razonSocial" name="razonSocial" class="sofis-form__input" placeholder="Ingrese razón social" required>
        </div>
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Tipo Cliente <span>*</span></label>
            <select [(ngModel)]="formData.tipoCliente" name="tipoCliente" class="sofis-form__select" required>
              <option value="">Seleccionar tipo</option>
              <option value="PN">Persona Natural</option>
              <option value="PJ">Persona Jurídica</option>
            </select>
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Sector</label>
            <input [(ngModel)]="formData.sector" name="sector" class="sofis-form__input" placeholder="Sector">
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Representante Legal</label>
          <input [(ngModel)]="formData.representanteLegal" name="representanteLegal" class="sofis-form__input" placeholder="Representante legal">
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Estado <span>*</span></label>
          <select [(ngModel)]="formData.estado" name="estado" class="sofis-form__select" required>
            <option value="">Seleccionar estado</option>
            <option value="ACT">ACTIVO</option>
            <option value="INA">INACTIVO</option>
          </select>
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
      title="Eliminar Cliente"
      [message]="'¿Está seguro de eliminar el cliente ' + deletingCliente?.razonSocial + '? Esta acción no se puede deshacer.'"
      confirmText="Eliminar"
      cancelText="Cancelar"
      type="danger"
      (confirm)="onDelete()"
      (cancel)="showConfirm = false">
    </app-confirm-dialog>
  `,
  styles: [`
    .sofis-list { background: var(--sofis-bg-white); border-radius: var(--sofis-border-radius-lg); padding: var(--sofis-spacing-xl); box-shadow: var(--sofis-shadow-sm); }
    .sofis-list__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sofis-spacing-xl); flex-wrap: wrap; gap: var(--sofis-spacing-md); }
    .sofis-list__title { display: flex; align-items: center; gap: var(--sofis-spacing-md); font-size: var(--sofis-font-size-xxl); font-weight: 700; color: var(--sofis-primary); margin: 0; }
    .sofis-list__title-icon { width: 32px; height: 32px; stroke: var(--sofis-primary); stroke-width: 2; fill: none; }
    .sofis-list__actions { display: flex; gap: var(--sofis-spacing-sm); }
    .sofis-list__alert { padding: var(--sofis-spacing-md) var(--sofis-spacing-lg); border-radius: var(--sofis-border-radius); margin-bottom: var(--sofis-spacing-lg); display: flex; justify-content: space-between; align-items: center; font-size: var(--sofis-font-size-sm); font-weight: 500; }
    .sofis-list__alert--error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
    .sofis-list__alert--success { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
    .sofis-list__alert__close { background: none; border: none; font-size: 1.5rem; cursor: pointer; opacity: 0.7; padding: 0; line-height: 1; }
    .sofis-list__table { width: 100%; border-collapse: collapse; overflow-x: auto; display: block; }
    .sofis-list__table-head { background: var(--sofis-bg-main); }
    .sofis-list__table-header { padding: var(--sofis-spacing-md) var(--sofis-spacing-lg); text-align: left; font-size: var(--sofis-font-size-sm); font-weight: 700; color: var(--sofis-text-secondary); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid var(--sofis-border); white-space: nowrap; }
    .sofis-list__table-row { border-bottom: 1px solid var(--sofis-border); transition: var(--sofis-transition); }
    .sofis-list__table-row:hover { background: var(--sofis-bg-hover); }
    .sofis-list__table-cell { padding: var(--sofis-spacing-md) var(--sofis-spacing-lg); font-size: var(--sofis-font-size-sm); vertical-align: middle; }
    .sofis-list__actions-cell { display: flex; gap: var(--sofis-spacing-sm); flex-wrap: wrap; }
    .sofis-list__badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: var(--sofis-font-size-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .sofis-list__badge--active { background: #dcfce7; color: #16a34a; }
    .sofis-list__badge--inactive { background: #fee2e2; color: #dc2626; }
    .sofis-list__empty { text-align: center; padding: var(--sofis-spacing-xxl); color: var(--sofis-text-muted); font-size: var(--sofis-font-size-base); }
    .sofis-btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--sofis-spacing-sm); padding: var(--sofis-spacing-sm) var(--sofis-spacing-lg); border-radius: var(--sofis-border-radius); font-size: var(--sofis-font-size-sm); font-weight: 600; font-family: var(--sofis-font-family); cursor: pointer; transition: var(--sofis-transition); border: none; }
    .sofis-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .sofis-btn--primary { background: var(--sofis-primary); color: var(--sofis-text-light); }
    .sofis-btn--primary:hover:not(:disabled) { background: var(--sofis-primary-light); transform: translateY(-1px); box-shadow: var(--sofis-shadow-sm); }
    .sofis-btn--edit { background: var(--sofis-warning); color: white; }
    .sofis-btn--edit:hover:not(:disabled) { background: #e67e22; }
    .sofis-btn--delete { background: var(--sofis-danger); color: white; }
    .sofis-btn--delete:hover:not(:disabled) { background: #c0392b; }
    .sofis-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sofis-spacing-lg); }
    .sofis-form__group { margin-bottom: var(--sofis-spacing-lg); }
    .sofis-form__label { display: block; font-size: var(--sofis-font-size-sm); font-weight: 600; margin-bottom: var(--sofis-spacing-xs); color: var(--sofis-text-primary); }
    .sofis-form__label span { color: var(--sofis-danger); }
    .sofis-form__input, .sofis-form__select { width: 100%; padding: var(--sofis-spacing-sm) var(--sofis-spacing-md); border: 2px solid var(--sofis-border); border-radius: var(--sofis-border-radius); font-size: var(--sofis-font-size-base); font-family: var(--sofis-font-family); transition: var(--sofis-transition); }
    .sofis-form__input:focus, .sofis-form__select:focus { outline: none; border-color: var(--sofis-secondary); box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15); }
    .sofis-form__actions { display: flex; gap: var(--sofis-spacing-md); justify-content: flex-end; margin-top: var(--sofis-spacing-xl); }
    .sofis-btn--cancel { background: var(--sofis-bg-main); color: var(--sofis-text-secondary); }
    .sofis-btn--cancel:hover { background: var(--sofis-border); }
    @media (max-width: 768px) { .sofis-list { padding: var(--sofis-spacing-md); } .sofis-list__header { flex-direction: column; align-items: flex-start; } .sofis-list__form-row { grid-template-columns: 1fr; } }
  `]
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  showForm = false;
  showConfirm = false;
  editing = false;
  editingId: number | null = null;
  deletingCliente: Cliente | null = null;
  formData: any = {};
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private clienteService: ClienteService, public authService: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    this.clienteService.getAll().subscribe({
      next: data => this.clientes = data,
      error: err => this.errorMessage = 'Error al cargar clientes'
    });
  }

  openForm(cliente?: Cliente) {
    if (cliente) {
      this.editing = true;
      this.editingId = cliente.idCliente!;
      this.formData = { ...cliente };
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

  confirmDelete(cliente: Cliente) {
    this.deletingCliente = cliente;
    this.showConfirm = true;
  }

  onDelete() {
    if (this.deletingCliente) {
      this.clienteService.delete(this.deletingCliente.idCliente!).subscribe({
        next: () => {
          this.successMessage = 'Cliente eliminado correctamente';
          this.load();
          this.showConfirm = false;
          this.deletingCliente = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al eliminar cliente';
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
      ? this.clienteService.update(this.editingId, this.formData)
      : this.clienteService.create(this.formData);
    request.subscribe({
      next: () => {
        this.successMessage = this.editing ? 'Cliente actualizado' : 'Cliente creado';
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