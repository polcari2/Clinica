import { Odontologo } from '../odontologo/odontologo.model';

export interface Atencion {
  id?: number;
  fechaAtencion: string;
  diagnostico: string;
  observaciones?: string;
  odontologo?: Odontologo;
  odontologoId?: number;
}
