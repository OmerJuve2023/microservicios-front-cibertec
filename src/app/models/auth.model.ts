export interface LoginRequest {
  nombreUsuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  nombreUsuario: string;
  rol: string;
  mensaje: string;
}