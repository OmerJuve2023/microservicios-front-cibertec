export interface Aplicacion {
  idAplicacion: string;
  nombre: string;
  estado: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface AplicacionInput {
  idAplicacion: string;
  nombre: string;
  estado: 'ACT' | 'INA';
}