export interface ClienteAplicacion {
  id?: number;
  idCliente: number;
  idAplicacion: string;
  periodoUso: 'M' | 'A';
  fechaIni: string;
  fechaFin: string;
  estado: string;
  precioContrato: number;
  dominio?: string;
  url?: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface ClienteAplicacionInput {
  idCliente: number;
  idAplicacion: string;
  periodoUso: 'M' | 'A';
  fechaIni: string;
  fechaFin: string;
  estado: 'ACT' | 'INA';
  precioContrato: number;
  dominio?: string;
  url?: string;
}