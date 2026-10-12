import { Especialidad } from '../especialidad/especialidad.model';

export interface Procedimiento {
  id?: number;
  nombre: string;
  precioBase: number;
  especialidad?: Especialidad;
  especialidadId?: number;
}
