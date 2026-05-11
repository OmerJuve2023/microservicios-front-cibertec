import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'personas',
    loadComponent: () => import('./pages/personas/persona-list.component').then(m => m.PersonaListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuario-list.component').then(m => m.UsuarioListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/cliente-list.component').then(m => m.ClienteListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'aplicaciones',
    loadComponent: () => import('./pages/aplicaciones/aplicacion-list.component').then(m => m.AplicacionListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'menus',
    loadComponent: () => import('./pages/menus/menu-list.component').then(m => m.MenuListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];