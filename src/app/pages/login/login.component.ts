import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sofis-login">
      <div class="sofis-login__card">
        <div class="sofis-login__header">
          <div class="sofis-login__logo">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 class="sofis-login__title">SOFIS</h1>
          <p class="sofis-login__subtitle">Enterprise Solutions</p>
        </div>

        <form class="sofis-login__form" (ngSubmit)="onSubmit()">
          <div class="sofis-login__group">
            <label class="sofis-login__label">Usuario</label>
            <input 
              class="sofis-login__input"
              type="text" 
              [(ngModel)]="credentials.nombreUsuario" 
              name="nombreUsuario"
              required
              placeholder="Ingresa tu usuario"
            >
          </div>

          <div class="sofis-login__group">
            <label class="sofis-login__label">Contraseña</label>
            <input 
              class="sofis-login__input"
              type="password" 
              [(ngModel)]="credentials.password" 
              name="password"
              required
              placeholder="Ingresa tu contraseña"
            >
          </div>

          <button type="submit" class="sofis-login__btn" [disabled]="loading">
            <span *ngIf="!loading">Iniciar Sesión</span>
            <span *ngIf="loading" class="sofis-login__spinner"></span>
          </button>

          <div *ngIf="error" class="sofis-login__error">
            <svg viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {{ error }}
          </div>
        </form>

        <div class="sofis-login__footer">
          <div class="sofis-login__divider"></div>
          <p>Desarrollado por <a href="https://github.com/OmerJuve2023" target="_blank">Omer y sus amigos</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sofis-login {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-height: 100dvh;
      background: linear-gradient(135deg, var(--sofis-primary) 0%, var(--sofis-primary-dark) 100%);
      padding: var(--sofis-spacing-md);
      position: relative;
      overflow: hidden;
    }

    .sofis-login::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(245, 166, 35, 0.1) 0%, transparent 50%);
      animation: pulse 15s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }

    .sofis-login__card {
      background: var(--sofis-bg-white);
      border-radius: var(--sofis-border-radius-lg);
      padding: var(--sofis-spacing-xl);
      width: 100%;
      max-width: 380px;
      box-shadow: var(--sofis-shadow-lg);
      position: relative;
      z-index: 1;
    }

    .sofis-login__header {
      text-align: center;
      margin-bottom: var(--sofis-spacing-xl);
    }

    .sofis-login__logo {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--sofis-primary) 0%, var(--sofis-primary-light) 100%);
      border-radius: var(--sofis-border-radius);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--sofis-shadow-md);
      margin-bottom: var(--sofis-spacing-sm);
    }

    .sofis-login__logo svg {
      width: 36px;
      height: 36px;
      stroke: var(--sofis-accent);
      stroke-width: 2;
      fill: none;
    }

    .sofis-login__title {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--sofis-primary);
      letter-spacing: 3px;
      margin: 0;
    }

    .sofis-login__subtitle {
      font-size: var(--sofis-font-size-sm);
      color: var(--sofis-text-secondary);
      margin: var(--sofis-spacing-xs) 0 0;
      letter-spacing: 1px;
    }

    .sofis-login__form {
      margin-top: var(--sofis-spacing-lg);
    }

    .sofis-login__group {
      margin-bottom: var(--sofis-spacing-md);
    }

    .sofis-login__label {
      display: block;
      font-size: var(--sofis-font-size-sm);
      font-weight: 600;
      color: var(--sofis-text-primary);
      margin-bottom: var(--sofis-spacing-xs);
    }

    .sofis-login__input {
      width: 100%;
      padding: 12px 14px;
      border: 2px solid var(--sofis-border);
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-base);
      font-family: var(--sofis-font-family);
      transition: var(--sofis-transition);
      background: var(--sofis-bg-white);
    }

    .sofis-login__input:focus {
      outline: none;
      border-color: var(--sofis-secondary);
      box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
    }

    .sofis-login__input::placeholder {
      color: var(--sofis-text-muted);
    }

    .sofis-login__btn {
      width: 100%;
      padding: 14px var(--sofis-spacing-lg);
      background: linear-gradient(135deg, var(--sofis-primary) 0%, var(--sofis-primary-light) 100%);
      color: var(--sofis-text-light);
      border: none;
      border-radius: var(--sofis-border-radius);
      font-size: var(--sofis-font-size-base);
      font-weight: 600;
      font-family: var(--sofis-font-family);
      cursor: pointer;
      transition: var(--sofis-transition);
      margin-top: var(--sofis-spacing-md);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
    }

    .sofis-login__btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(26, 60, 94, 0.4);
    }

    .sofis-login__btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .sofis-login__spinner {
      width: 22px;
      height: 22px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .sofis-login__error {
      color: var(--sofis-danger);
      margin-top: var(--sofis-spacing-md);
      text-align: center;
      padding: 10px 14px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: var(--sofis-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--sofis-spacing-sm);
      font-size: var(--sofis-font-size-sm);
    }

    .sofis-login__error svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      flex-shrink: 0;
    }

    .sofis-login__footer {
      margin-top: var(--sofis-spacing-lg);
      text-align: center;
      font-size: var(--sofis-font-size-xs);
      color: var(--sofis-text-muted);
    }

    .sofis-login__divider {
      height: 1px;
      background: var(--sofis-border);
      margin-bottom: var(--sofis-spacing-md);
    }

    .sofis-login__footer a {
      color: var(--sofis-accent);
      font-weight: 600;
    }

    .sofis-login__footer a:hover {
      text-decoration: underline;
    }

    @media (max-height: 600px) {
      .sofis-login {
        min-height: auto;
        padding: var(--sofis-spacing-sm);
      }
      
      .sofis-login__card {
        padding: var(--sofis-spacing-lg);
      }
    }

    @media (max-width: 400px) {
      .sofis-login__card {
        padding: var(--sofis-spacing-lg);
      }

      .sofis-login__title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = {
    nombreUsuario: '',
    password: ''
  };

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
        console.error('Error en login:', err);
      }
    });
  }
}