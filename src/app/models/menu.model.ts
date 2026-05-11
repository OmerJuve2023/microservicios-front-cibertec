export interface Menu {
  idMenu: string;
  idAplicacion: string;
  nombre: string;
  nivelMenu: '1' | '2';
  idMenuPadre?: string | null;
  orden?: number;
  icono?: string;
  nivelOrden?: number;
  ruta?: string;
  estado?: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface MenuInput {
  idMenu: string;
  idAplicacion: string;
  nombre: string;
  nivelMenu: '1' | '2';
  idMenuPadre?: string | null;
  orden?: number;
  icono?: string;
  nivelOrden?: number;
  ruta?: string;
  estado?: 'ACT' | 'INA';
}