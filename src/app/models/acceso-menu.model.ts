export interface AccesoMenu {
  id?: number;
  idUsuario: number;
  idMenu: string;
  estado: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface AccesoMenuInput {
  idUsuario: number;
  idMenu: string;
  estado: string;
}