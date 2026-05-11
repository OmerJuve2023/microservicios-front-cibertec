export interface Cliente {
  idCliente?: number;
  idPersona: number;
  razonSocial: string;
  tipoCliente: string;
  sector?: string;
  representanteLegal?: string;
  estado: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface ClienteInput {
  idPersona: number;
  razonSocial: string;
  tipoCliente: 'PN' | 'PJ';
  sector?: string;
  representanteLegal?: string;
  estado: 'ACT' | 'INA';
}