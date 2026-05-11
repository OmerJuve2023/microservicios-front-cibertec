import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario.service';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ModalComponent } from '../../shared/modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmDialogComponent],
  template: `
    <div class="sofis-list">
      <div class="sofis-list__header">
        <h1 class="sofis-list__title">
          <svg class="sofis-list__title-icon" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1"/></svg>
          Usuarios
        </h1>
        <div class="sofis-list__actions">
          <button *ngIf="authService.isAdmin()" class="sofis-btn sofis-btn--primary" (click)="openForm()">
            + Nuevo Usuario
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
            <th class="sofis-list__table-header">ID Persona</th>
            <th class="sofis-list__table-header">Usuario</th>
            <th class="sofis-list__table-header">Rol</th>
            <th class="sofis-list__table-header">Estado</th>
            <th class="sofis-list__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let usuario of usuarios" class="sofis-list__table-row">
            <td class="sofis-list__table-cell">{{ usuario.idUsuario }}</td>
            <td class="sofis-list__table-cell">{{ usuario.idPersona }}</td>
            <td class="sofis-list__table-cell">{{ usuario.nombreUsuario }}</td>
            <td class="sofis-list__table-cell">{{ usuario.rol || 'USUARIO' }}</td>
            <td class="sofis-list__table-cell">
              <span class="sofis-list__badge" [class.sofis-list__badge--active]="usuario.estado === 'ACT'" [class.sofis-list__badge--inactive]="usuario.estado !== 'ACT'">
                {{ usuario.estado }}
              </span>
            </td>
            <td class="sofis-list__table-cell">
              <div class="sofis-list__actions-cell">
                <ng-container *ngIf="authService.isAdmin()">
                  <button (click)="openForm(usuario)" class="sofis-btn sofis-btn--edit">Editar</button>
                  <button (click)="confirmDelete(usuario)" class="sofis-btn sofis-btn--delete">Eliminar</button>
                </ng-container>
                <span *ngIf="!authService.isAdmin()">-</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="usuarios.length === 0" class="sofis-list__empty">
        No hay usuarios registrados
      </div>
    </div>

    <app-modal [show]="showForm" [title]="editing ? 'Editar Usuario' : 'Nuevo Usuario'" size="sm" (closed)="closeForm()">
      <form class="sofis-form" (ngSubmit)="onSubmit()">
        <div class="sofis-form__group">
          <label class="sofis-form__label">ID Persona <span>*</span></label>
          <input [(ngModel)]="formData.idPersona" name="idPersona" class="sofis-form__input" type="number" placeholder="ID de persona" required>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Nombre de Usuario <span>*</span></label>
          <input [(ngModel)]="formData.nombreUsuario" name="nombreUsuario" class="sofis-form__input" placeholder="Nombre de usuario" required>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Password <span *ngIf="!editing">*</span></label>
          <input [(ngModel)]="formData.password" name="password" class="sofis-form__input" type="password" placeholder="Password" [required]="!editing">
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Estado <span>*</span></label>
          <select [(ngModel)]="formData.estado" name="estado" class="sofis-form__select" required>
            <option value="">Seleccionar estado</option>
            <option value="ACT">ACTIVO</option>
            <option value="INA">INACTIVO</option>
          </select>
        </div>
        <div *ngIf="authService.isAdmin()" class="sofis-form__group">
          <label class="sofis-form__label">Rol</label>
          <select [(ngModel)]="formData.rol" name="rol" class="sofis-form__select">
            <option value="USUARIO">USUARIO</option>
            <option value="ADMIN">ADMIN</option>
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
      title="Eliminar Usuario"
      [message]="'¿Está seguro de eliminar el usuario ' + deletingUser?.nombreUsuario + '? Esta acción no se puede deshacer.'"
      confirmText="Eliminar"
      cancelText="Cancelar"
      type="danger"
      (confirm)="onDelete()"
      (cancel)="showConfirm = false">
    </app-confirm-dialog>
  `,
  styles: [`
    .sofis-form__group {
      margin-bottom: var(--sofis-spacing-lg);
    }
    .sofis-form__label {
      display: block;
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
      margin-bottom: var(--sofis-spacing-xs);
      color: var(--sofis-text-primary);
    }
    .sofis-form__label span {
      color: var(--sofis-danger);
    }
    .sofis-form__input, .sofis-form__select {
      width: 100%;
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-md);
      border: 2px solid var(--sofis-border);
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-base);
      font-family: var(--sofis-font-family);
      transition: var(--sofis-transition);
    }
    .sofis-form__input:focus, .sofis-form__select:focus {
      outline: none;
      border-color: var(--sofis-secondary);
      box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
    }
    .sofis-form__actions {
      display: flex;
      gap: var(--sofis-spacing-md);
      justify-content: flex-end;
      margin-top: var(--sofis-spacing-xl);
    }
    .sofis-btn--cancel {
      background: var(--sofis-bg-main);
      color: var(--sofis-text-secondary);
    }
    .sofis-btn--cancel:hover {
      background: var(--sofis-border);
    }
  `]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  showForm = false;
  showConfirm = false;
  editing = false;
  editingId: number | null = null;
  deletingUser: Usuario | null = null;
  formData: any = {};
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private usuarioService: UsuarioService, public authService: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    this.usuarioService.getAll().subscribe({
      next: data => this.usuarios = data,
      error: err => this.errorMessage = 'Error al cargar usuarios'
    });
  }

  openForm(usuario?: Usuario) {
    if (usuario) {
      this.editing = true;
      this.editingId = usuario.idUsuario!;
      this.formData = { ...usuario, password: '' };
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

  confirmDelete(usuario: Usuario) {
    this.deletingUser = usuario;
    this.showConfirm = true;
  }

  onDelete() {
    if (this.deletingUser) {
      this.usuarioService.delete(this.deletingUser.idUsuario!).subscribe({
        next: () => {
          this.successMessage = 'Usuario eliminado correctamente';
          this.load();
          this.showConfirm = false;
          this.deletingUser = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al eliminar usuario';
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
      ? this.usuarioService.update(this.editingId, this.formData)
      : this.usuarioService.create(this.formData);
    request.subscribe({
      next: () => {
        this.successMessage = this.editing ? 'Usuario actualizado' : 'Usuario creado';
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