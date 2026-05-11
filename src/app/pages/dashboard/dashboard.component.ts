import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="sofis-dashboard">
      <div class="sofis-dashboard__header">
        <div class="sofis-dashboard__welcome">
          <h1 class="sofis-dashboard__title">Bienvenido, {{ authService.getCurrentUser() }}</h1>
          <p class="sofis-dashboard__subtitle">Panel de control - SOFIS Enterprise Solutions</p>
        </div>
        <div class="sofis-dashboard__badge">
          <span class="sofis-dashboard__rol" [class.sofis-dashboard__rol--admin]="authService.getUserRol() === 'ADMIN'">
            <svg *ngIf="authService.getUserRol() === 'ADMIN'" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            {{ authService.getUserRol() }}
          </span>
        </div>
      </div>

      <div class="sofis-dashboard__admin-section" *ngIf="authService.isAdmin()">
        <div class="sofis-dashboard__section-header">
          <svg viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <h2>Administración</h2>
          <span>Gestión completa del sistema</span>
        </div>
        <div class="sofis-dashboard__cards">
          <a routerLink="/usuarios" class="sofis-dashboard__card">
            <div class="sofis-dashboard__card-icon sofis-dashboard__card-icon--admin">
              <svg viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1"/></svg>
            </div>
            <div class="sofis-dashboard__card-content">
              <h3>Usuarios</h3>
              <p>Crear, editar y eliminar usuarios del sistema</p>
            </div>
            <div class="sofis-dashboard__card-badge">ADMIN</div>
            <span class="sofis-dashboard__card-arrow">→</span>
          </a>
          
          <a routerLink="/menus" class="sofis-dashboard__card">
            <div class="sofis-dashboard__card-icon sofis-dashboard__card-icon--menus">
              <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </div>
            <div class="sofis-dashboard__card-content">
              <h3>Menús</h3>
              <p>Configurar estructura de menús</p>
            </div>
            <div class="sofis-dashboard__card-badge">ADMIN</div>
            <span class="sofis-dashboard__card-arrow">→</span>
          </a>
          
          <a routerLink="/aplicaciones" class="sofis-dashboard__card">
            <div class="sofis-dashboard__card-icon sofis-dashboard__card-icon--aplicaciones">
              <svg viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div class="sofis-dashboard__card-content">
              <h3>Aplicaciones</h3>
              <p>Gestionar aplicaciones del sistema</p>
            </div>
            <div class="sofis-dashboard__card-badge">ADMIN</div>
            <span class="sofis-dashboard__card-arrow">→</span>
          </a>
        </div>
      </div>

      <div class="sofis-dashboard__general-section">
        <div class="sofis-dashboard__section-header">
          <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <h2>Gestión de Datos</h2>
          <span>{{ authService.isAdmin() ? 'Registros y consultas' : 'Consultar y visualizar información' }}</span>
        </div>
        <div class="sofis-dashboard__cards">
          <a routerLink="/personas" class="sofis-dashboard__card">
            <div class="sofis-dashboard__card-icon sofis-dashboard__card-icon--personas">
              <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <div class="sofis-dashboard__card-content">
              <h3>Personas</h3>
              <p>Directorio de personas registradas</p>
            </div>
            <div class="sofis-dashboard__card-action">
              {{ authService.isAdmin() ? 'Ver, crear, editar' : 'Solo lectura' }}
            </div>
            <span class="sofis-dashboard__card-arrow">→</span>
          </a>
          
          <a routerLink="/clientes" class="sofis-dashboard__card">
            <div class="sofis-dashboard__card-icon sofis-dashboard__card-icon--clientes">
              <svg viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div class="sofis-dashboard__card-content">
              <h3>Clientes</h3>
              <p>Gestión de clientes empresarial</p>
            </div>
            <div class="sofis-dashboard__card-action">
              {{ authService.isAdmin() ? 'Ver, crear, editar' : 'Solo lectura' }}
            </div>
            <span class="sofis-dashboard__card-arrow">→</span>
          </a>
        </div>
      </div>

      <div class="sofis-dashboard__info">
        <div class="sofis-dashboard__info-item">
          <svg viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Sesión activa como <strong>{{ authService.getUserRol() }}</strong></span>
        </div>
        <div class="sofis-dashboard__info-item" *ngIf="!authService.isAdmin()">
          <svg viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          <span>Tienes acceso de solo lectura. Contacta al administrador para más permisos.</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sofis-dashboard {
      background: var(--sofis-bg-white);
      border-radius: var(--sofis-border-radius-lg);
      padding: var(--sofis-spacing-xl);
      box-shadow: var(--sofis-shadow-sm);
    }

    .sofis-dashboard__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--sofis-spacing-xxl);
      padding-bottom: var(--sofis-spacing-lg);
      border-bottom: 2px solid var(--sofis-border);
    }

    .sofis-dashboard__title {
      font-size: var(--sofis-font-size-xxl);
      color: var(--sofis-primary);
      margin: 0 0 var(--sofis-spacing-xs);
    }

    .sofis-dashboard__subtitle {
      color: var(--sofis-text-secondary);
      margin: 0;
      font-size: var(--sofis-font-size-base);
    }

    .sofis-dashboard__badge {
      text-align: right;
    }

    .sofis-dashboard__rol {
      display: inline-flex;
      align-items: center;
      gap: var(--sofis-spacing-sm);
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-lg);
      background: var(--sofis-bg-main);
      color: var(--sofis-text-secondary);
      border-radius: 20px;
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
      text-transform: uppercase;
    }

    .sofis-dashboard__rol--admin {
      background: var(--sofis-accent);
      color: var(--sofis-primary);
    }

    .sofis-dashboard__rol svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
    }

    .sofis-dashboard__admin-section {
      margin-bottom: var(--sofis-spacing-xxl);
    }

    .sofis-dashboard__general-section {
      margin-bottom: var(--sofis-spacing-xl);
    }

    .sofis-dashboard__section-header {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-md);
      margin-bottom: var(--sofis-spacing-lg);
      padding-bottom: var(--sofis-spacing-md);
      border-bottom: 1px dashed var(--sofis-border);
    }

    .sofis-dashboard__section-header svg {
      width: 24px;
      height: 24px;
      stroke: var(--sofis-primary);
      stroke-width: 2;
      fill: none;
    }

    .sofis-dashboard__section-header h2 {
      margin: 0;
      font-size: var(--sofis-font-size-lg);
      color: var(--sofis-primary);
    }

    .sofis-dashboard__section-header span {
      color: var(--sofis-text-muted);
      font-size: var(--sofis-font-size-sm);
    }

    .sofis-dashboard__cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--sofis-spacing-lg);
    }

    .sofis-dashboard__card {
      background: var(--sofis-bg-main);
      border-radius: var(--sofis-border-radius);
      padding: var(--sofis-spacing-lg);
      text-decoration: none;
      transition: var(--sofis-transition);
      position: relative;
      border: 2px solid transparent;
      display: flex;
      align-items: flex-start;
      gap: var(--sofis-spacing-md);
    }

    .sofis-dashboard__card:hover {
      border-color: var(--sofis-secondary);
      transform: translateY(-2px);
      box-shadow: var(--sofis-shadow-md);
    }

    .sofis-dashboard__card-icon {
      width: 50px;
      height: 50px;
      border-radius: var(--sofis-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .sofis-dashboard__card-icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
    }

    .sofis-dashboard__card-icon--admin {
      background: linear-gradient(135deg, var(--sofis-accent) 0%, #e09000 100%);
      color: var(--sofis-primary);
    }

    .sofis-dashboard__card-icon--usuarios {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .sofis-dashboard__card-icon--personas {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .sofis-dashboard__card-icon--clientes {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .sofis-dashboard__card-icon--aplicaciones {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }

    .sofis-dashboard__card-icon--menus {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
    }

    .sofis-dashboard__card-content {
      flex: 1;
    }

    .sofis-dashboard__card-content h3 {
      font-size: var(--sofis-font-size-lg);
      color: var(--sofis-text-primary);
      margin: 0 0 var(--sofis-spacing-xs);
    }

    .sofis-dashboard__card-content p {
      color: var(--sofis-text-secondary);
      margin: 0;
      font-size: var(--sofis-font-size-sm);
      line-height: 1.5;
    }

    .sofis-dashboard__card-badge {
      position: absolute;
      top: var(--sofis-spacing-md);
      right: var(--sofis-spacing-md);
      background: var(--sofis-accent);
      color: var(--sofis-primary);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: var(--sofis-font-size-xs);
      font-weight: 700;
    }

    .sofis-dashboard__card-action {
      position: absolute;
      bottom: var(--sofis-spacing-md);
      right: var(--sofis-spacing-md);
      font-size: var(--sofis-font-size-xs);
      color: var(--sofis-text-muted);
      background: var(--sofis-bg-white);
      padding: 2px 8px;
      border-radius: 8px;
    }

    .sofis-dashboard__card-arrow {
      position: absolute;
      bottom: var(--sofis-spacing-lg);
      right: var(--sofis-spacing-lg);
      font-size: var(--sofis-font-size-xl);
      color: var(--sofis-secondary);
      opacity: 0;
      transform: translateX(-10px);
      transition: var(--sofis-transition);
    }

    .sofis-dashboard__card:hover .sofis-dashboard__card-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .sofis-dashboard__info {
      margin-top: var(--sofis-spacing-xl);
      padding: var(--sofis-spacing-lg);
      background: var(--sofis-bg-main);
      border-radius: var(--sofis-border-radius);
      display: flex;
      flex-direction: column;
      gap: var(--sofis-spacing-md);
    }

    .sofis-dashboard__info-item {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-sm);
      color: var(--sofis-text-secondary);
      font-size: var(--sofis-font-size-sm);
    }

    .sofis-dashboard__info-item svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      flex-shrink: 0;
    }

    .sofis-dashboard__info-item strong {
      color: var(--sofis-primary);
    }

    @media (max-width: 768px) {
      .sofis-dashboard__header {
        flex-direction: column;
        gap: var(--sofis-spacing-md);
      }

      .sofis-dashboard__badge {
        text-align: left;
      }

      .sofis-dashboard__section-header {
        flex-wrap: wrap;
      }

      .sofis-dashboard__section-header span {
        width: 100%;
        margin-left: 36px;
      }

      .sofis-dashboard__card {
        flex-direction: column;
      }

      .sofis-dashboard__card-badge,
      .sofis-dashboard__card-action {
        position: static;
        display: inline-block;
        margin-bottom: var(--sofis-spacing-sm);
      }
    }
  `]
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
}