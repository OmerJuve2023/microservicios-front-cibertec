export interface Persona {
  idPersona?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  tipoDocumento?: string;
  docIdentidad?: string;
  direccion?: string;
  distrito?: string;
  provincia?: string;
  departamento?: string;
  fechaReg?: string;
  fechaMod?: string;
}

export interface PersonaInput {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  tipoDocumento?: string;
  docIdentidad?: string;
  direccion?: string;
  distrito?: string;
  provincia?: string;
  departamento?: string;
}