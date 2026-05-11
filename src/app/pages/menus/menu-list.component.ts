import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { AuthService } from '../../core/services/auth.service';
import { Menu } from '../../models/menu.model';
import { ModalComponent } from '../../shared/modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmDialogComponent],
  template: `
    <div class="sofis-list">
      <div class="sofis-list__header">
        <h1 class="sofis-list__title">
          <svg class="sofis-list__title-icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          Menús
        </h1>
        <div class="sofis-list__actions">
          <button *ngIf="authService.isAdmin()" class="sofis-btn sofis-btn--primary" (click)="openForm()">
            + Nuevo Menú
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
            <th class="sofis-list__table-header">Aplicación</th>
            <th class="sofis-list__table-header">Nombre</th>
            <th class="sofis-list__table-header">Nivel</th>
            <th class="sofis-list__table-header">Ruta</th>
            <th class="sofis-list__table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let menu of menus" class="sofis-list__table-row">
            <td class="sofis-list__table-cell">{{ menu.idMenu }}</td>
            <td class="sofis-list__table-cell">{{ menu.idAplicacion }}</td>
            <td class="sofis-list__table-cell">{{ menu.nombre }}</td>
            <td class="sofis-list__table-cell">{{ menu.nivelMenu }}</td>
            <td class="sofis-list__table-cell">{{ menu.ruta }}</td>
            <td class="sofis-list__table-cell">
              <div class="sofis-list__actions-cell">
                <ng-container *ngIf="authService.isAdmin()">
                  <button (click)="openForm(menu)" class="sofis-btn sofis-btn--edit">Editar</button>
                  <button (click)="confirmDelete(menu)" class="sofis-btn sofis-btn--delete">Eliminar</button>
                </ng-container>
                <span *ngIf="!authService.isAdmin()">-</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="menus.length === 0" class="sofis-list__empty">
        No hay menús registrados
      </div>
    </div>

    <app-modal [show]="showForm" [title]="editing ? 'Editar Menú' : 'Nuevo Menú'" size="md" (closed)="closeForm()">
      <form class="sofis-form" (ngSubmit)="onSubmit()">
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">ID Menú <span>*</span></label>
            <input [(ngModel)]="formData.idMenu" name="idMenu" class="sofis-form__input" placeholder="Ej: MNU001" [disabled]="editing" required>
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">ID Aplicación <span>*</span></label>
            <input [(ngModel)]="formData.idAplicacion" name="idAplicacion" class="sofis-form__input" placeholder="Ej: APP001" required>
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Nombre <span>*</span></label>
          <input [(ngModel)]="formData.nombre" name="nombre" class="sofis-form__input" placeholder="Nombre del menú" required>
        </div>
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Nivel <span>*</span></label>
            <select [(ngModel)]="formData.nivelMenu" name="nivelMenu" class="sofis-form__select" (ngModelChange)="onNivelChange($event)" required>
              <option value="">Seleccionar nivel</option>
              <option value="1">Nivel 1 (Principal)</option>
              <option value="2">Nivel 2 (Submenú)</option>
            </select>
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Menú Padre</label>
            <input [(ngModel)]="formData.idMenuPadre" name="idMenuPadre" class="sofis-form__input" placeholder="ID del menú padre">
          </div>
        </div>
        <div class="sofis-form__row">
          <div class="sofis-form__group">
            <label class="sofis-form__label">Orden</label>
            <input [(ngModel)]="formData.orden" name="orden" class="sofis-form__input" type="number" placeholder="Orden">
          </div>
          <div class="sofis-form__group">
            <label class="sofis-form__label">Icono</label>
            <input [(ngModel)]="formData.icono" name="icono" class="sofis-form__input" placeholder="Nombre del icono">
          </div>
        </div>
        <div class="sofis-form__group">
          <label class="sofis-form__label">Ruta</label>
          <input [(ngModel)]="formData.ruta" name="ruta" class="sofis-form__input" placeholder="Ej: /dashboard">
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
      title="Eliminar Menú"
      [message]="'¿Está seguro de eliminar el menú ' + deletingMenu?.nombre + '? Esta acción no se puede deshacer.'"
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
    .sofis-form__input:disabled { background: var(--sofis-bg-main); }
    .sofis-form__actions { display: flex; gap: var(--sofis-spacing-md); justify-content: flex-end; margin-top: var(--sofis-spacing-xl); }
    .sofis-btn--cancel { background: var(--sofis-bg-main); color: var(--sofis-text-secondary); }
    .sofis-btn--cancel:hover { background: var(--sofis-border); }
    @media (max-width: 600px) { .sofis-form__row { grid-template-columns: 1fr; } }
  `]
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  showForm = false;
  showConfirm = false;
  editing = false;
  editingId: string | null = null;
  deletingMenu: Menu | null = null;
  formData: any = {};
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private menuService: MenuService, public authService: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    this.menuService.getAll().subscribe({
      next: data => this.menus = data,
      error: err => this.errorMessage = 'Error al cargar menús'
    });
  }

  onNivelChange(nivel: string) {
    if (nivel === '1') {
      this.formData.idMenuPadre = null;
    }
  }

  openForm(menu?: Menu) {
    if (menu) {
      this.editing = true;
      this.editingId = menu.idMenu;
      this.formData = { ...menu };
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

  confirmDelete(menu: Menu) {
    this.deletingMenu = menu;
    this.showConfirm = true;
  }

  onDelete() {
    if (this.deletingMenu) {
      this.menuService.delete(this.deletingMenu.idMenu).subscribe({
        next: () => {
          this.successMessage = 'Menú eliminado correctamente';
          this.load();
          this.showConfirm = false;
          this.deletingMenu = null;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Error al eliminar menú';
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
      ? this.menuService.update(this.editingId, this.formData)
      : this.menuService.create(this.formData);
    request.subscribe({
      next: () => {
        this.successMessage = this.editing ? 'Menú actualizado' : 'Menú creado';
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