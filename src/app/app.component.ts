import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="sofis-layout">
      <nav *ngIf="authService.isLoggedIn()" class="sofis-navbar">
        <div class="sofis-navbar__container">
          <a routerLink="/dashboard" class="sofis-navbar__brand">
            <div class="sofis-navbar__logo">S</div>
            <div class="sofis-navbar__brand-text">
              <span class="sofis-navbar__brand-name">SOFIS</span>
              <span class="sofis-navbar__brand-tagline">Enterprise Solutions</span>
            </div>
          </a>

          <div class="sofis-navbar__menu">
            <a routerLink="/dashboard" class="sofis-navbar__link">Dashboard</a>
            <a routerLink="/personas" class="sofis-navbar__link">Personas</a>
            <a routerLink="/usuarios" class="sofis-navbar__link">Usuarios</a>
            <a routerLink="/clientes" class="sofis-navbar__link">Clientes</a>
            <a routerLink="/aplicaciones" class="sofis-navbar__link">Aplicaciones</a>
            <a routerLink="/menus" class="sofis-navbar__link">Menús</a>
          </div>

          <div class="sofis-navbar__user">
            <span class="sofis-navbar__username">{{ authService.getCurrentUser() }}</span>
            <span class="sofis-navbar__rol">{{ authService.getUserRol() }}</span>
            <button class="sofis-btn sofis-btn--logout" (click)="logout()">Cerrar Sesión</button>
          </div>
        </div>
      </nav>

      <main class="sofis-main">
        <router-outlet></router-outlet>
      </main>

      <footer *ngIf="authService.isLoggedIn()" class="sofis-footer">
        <div class="sofis-footer__container">
          <div class="sofis-footer__brand">
            <span class="sofis-footer__brand-name">SOFIS</span>
            <span class="sofis-footer__copyright">© 2024 - Soluciones Empresariales</span>
          </div>
          <a href="https://github.com/OmerJuve2023" target="_blank" class="sofis-footer__link">
            <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            OmerJuve2023
          </a>
          <div class="sofis-footer__credits">
            Desarrollado por <a href="https://github.com/OmerJuve2023" target="_blank">OmerSolutions</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .sofis-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sofis-navbar {
      background: linear-gradient(135deg, var(--sofis-primary) 0%, var(--sofis-primary-dark) 100%);
      color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: var(--sofis-shadow-md);
    }

    .sofis-navbar__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--sofis-spacing-md) var(--sofis-spacing-xl);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--sofis-spacing-xl);
    }

    .sofis-navbar__brand {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-sm);
      text-decoration: none;
      color: white;
    }

    .sofis-navbar__logo {
      width: 45px;
      height: 45px;
      background: var(--sofis-accent);
      border-radius: var(--sofis-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--sofis-primary);
    }

    .sofis-navbar__brand-text {
      display: flex;
      flex-direction: column;
    }

    .sofis-navbar__brand-name {
      font-size: var(--sofis-font-size-xl);
      font-weight: 700;
      letter-spacing: 2px;
    }

    .sofis-navbar__brand-tagline {
      font-size: var(--sofis-font-size-xs);
      opacity: 0.8;
    }

    .sofis-navbar__menu {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-sm);
    }

    .sofis-navbar__link {
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-md);
      color: white;
      text-decoration: none;
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-sm);
      font-weight: 500;
      transition: var(--sofis-transition);
    }

    .sofis-navbar__link:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .sofis-navbar__link.router-link-active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }

    .sofis-navbar__user {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-md);
    }

    .sofis-navbar__username {
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
    }

    .sofis-navbar__rol {
      font-size: var(--sofis-font-size-xs);
      background: var(--sofis-accent);
      color: var(--sofis-primary);
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
    }

    .sofis-main {
      flex: 1;
      padding: var(--sofis-spacing-lg) var(--sofis-spacing-xl);
      width: 100%;
      margin: 0 auto;
    }

    .sofis-btn {
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-md);
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
      cursor: pointer;
      transition: var(--sofis-transition);
      border: none;
    }

    .sofis-btn--logout {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .sofis-btn--logout:hover {
      background: var(--sofis-danger);
      border-color: var(--sofis-danger);
    }

    .sofis-footer {
      background: linear-gradient(135deg, var(--sofis-primary-dark) 0%, var(--sofis-primary) 100%);
      color: white;
      padding: var(--sofis-spacing-xl) 0;
      margin-top: auto;
    }

    .sofis-footer__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--sofis-spacing-xl);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--sofis-spacing-lg);
    }

    .sofis-footer__brand {
      display: flex;
      flex-direction: column;
    }

    .sofis-footer__brand-name {
      font-size: var(--sofis-font-size-lg);
      font-weight: 700;
      letter-spacing: 2px;
    }

    .sofis-footer__copyright {
      font-size: var(--sofis-font-size-xs);
      opacity: 0.7;
    }

    .sofis-footer__link {
      display: flex;
      align-items: center;
      gap: var(--sofis-spacing-sm);
      color: white;
      text-decoration: none;
      padding: var(--sofis-spacing-sm) var(--sofis-spacing-md);
      border-radius: var(--sofis-border-radius);
      background: rgba(255, 255, 255, 0.1);
      transition: var(--sofis-transition);
      font-size: var(--sofis-font-size-sm);
    }

    .sofis-footer__link:hover {
      background: rgba(255, 255, 255, 0.2);
      color: var(--sofis-accent);
    }

    .sofis-footer__link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .sofis-footer__credits {
      font-size: var(--sofis-font-size-sm);
    }

    .sofis-footer__credits a {
      color: var(--sofis-accent);
      font-weight: 600;
    }

    .sofis-footer__credits a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .sofis-navbar__container {
        flex-wrap: wrap;
        padding: var(--sofis-spacing-md);
      }

      .sofis-navbar__menu {
        order: 3;
        width: 100%;
        overflow-x: auto;
        justify-content: flex-start;
      }

      .sofis-navbar__link {
        white-space: nowrap;
      }

      .sofis-navbar__user {
        gap: var(--sofis-spacing-sm);
      }

      .sofis-main {
        padding: var(--sofis-spacing-md);
      }

      .sofis-footer__container {
        flex-direction: column;
        text-align: center;
        padding: 0 var(--sofis-spacing-md);
      }
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}