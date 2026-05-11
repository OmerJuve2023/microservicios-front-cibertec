# Angular App - Microservicios

Proyecto Angular para consumir la API de microservicios.

## 🚀 getting Started

### Prerrequisitos
- Node.js 18+
- Angular CLI 17+

### Instalación

```bash
cd angular-app
npm install
```

### Ejecutar

```bash
ng serve
```

Navegar a `http://localhost:4200/`

---

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts          → Protege rutas privadas
│   ├── interceptors/
│   │   └── auth.interceptor.ts    → Agrega token a cada request
│   └── services/
│       ├── auth.service.ts        → Login, logout, manejo de token
│       ├── persona.service.ts     → API de Personas
│       ├── usuario.service.ts     → API de Usuarios
│       ├── cliente.service.ts     → API de Clientes
│       ├── aplicacion.service.ts  → API de Aplicaciones
│       └── menu.service.ts        → API de Menús
├── models/
│   ├── auth.model.ts
│   ├── persona.model.ts
│   ├── usuario.model.ts
│   ├── cliente.model.ts
│   ├── aplicacion.model.ts
│   ├── cliente-aplicacion.model.ts
│   └── menu.model.ts
└── pages/
    └── login/
        └── login.component.ts     → Componente de Login
```

---

## ⚙️ Configuración

### 1. Registrar el Interceptor

En `app.module.ts` o en el componente que use `provideHttpClient()`:

```typescript
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([/* otros interceptores */])
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
```

### 2. Proteger Rutas

En el router:

```typescript
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personas',
    component: PersonaListComponent,
    canActivate: [AuthGuard]
  },
  // ... otras rutas protegidas
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
```

---

## 🔐 Configurar Base URL

Todos los servicios están configurados con:
```typescript
private readonly API_URL = 'http://localhost:8080';
```

Si necesitas cambiarla, edita cada servicio en `src/app/core/services/`

---

## 📡 Servicios Disponibles

### AuthService
```typescript
login(credentials: LoginRequest): Observable<LoginResponse>
logout(): void
getToken(): string | null
getCurrentUser(): string | null
isLoggedIn(): boolean
```

### PersonaService
```typescript
getAll(): Observable<Persona[]>
getById(id: number): Observable<Persona>
create(persona: PersonaInput): Observable<Persona>
update(id: number, persona: PersonaInput): Observable<Persona>
delete(id: number): Observable<void>
```

### UsuarioService, ClienteService, AplicacionService, MenuService
Tienen los mismos métodos CRUD (create, getAll, getById, update, delete)

---

## 🧪 Ejemplo de Uso

### Login Component
```typescript
import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoginRequest } from './models/auth.model';

@Component({...})
export class LoginComponent {
  credentials: LoginRequest = { nombreUsuario: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        console.log('Usuario:', response.nombreUsuario);
      },
      error: (err) => console.error('Login fallido', err)
    });
  }
}
```

### Listar Personas
```typescript
import { Component, OnInit } from '@angular/core';
import { PersonaService } from './core/services/persona.service';
import { Persona } from './models/persona.model';

@Component({...})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.personaService.getAll().subscribe(data => {
      this.personas = data;
    });
  }
}
```

---

## 📝 Modelos

Los modelos están definidos en `src/app/models/` y siguen la estructura de la API:
- Todos los campos son opcionales (?) excepto los requeridos
- Fechas en formato ISO 8601
- IDs de Aplicacion y Menu son strings (ej: 'APP001', 'MNU001')
- IDs de Persona, Usuario, Cliente son números

---

## 🔗 URLs de la API

| Microservicio | Endpoint Base |
|---------------|---------------|
| Autenticación | `http://localhost:8080/auth` |
| Personas | `http://localhost:8080/api/usuarios/personas` |
| Usuarios | `http://localhost:8080/api/usuarios/usuarios` |
| Clientes | `http://localhost:8080/api/clientes/clientes` |
| Aplicaciones | `http://localhost:8080/api/aplicaciones/aplicaciones` |
| Menús | `http://localhost:8080/api/menus/menus` |

Todos los endpoints (excepto `/auth/login`) requieren:
```
Authorization: Bearer <token>
```

El interceptor se encarga de agregar automáticamente el token a cada petición.