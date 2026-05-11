export interface Usuario {
  idUsuario?: number;
  idPersona: number;
  estado: string;
  nombreUsuario: string;
  password?: string;
  rol?: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface UsuarioInput {
  idPersona: number;
  estado: string;
  nombreUsuario: string;
  password: string;
  rol?: string;
}