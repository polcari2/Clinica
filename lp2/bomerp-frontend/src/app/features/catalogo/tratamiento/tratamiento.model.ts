import { Especialidad } from '../especialidad/especialidad.model';

export interface Tratamiento {
  id: number;
  idEspecialidad: number;
  nombre: string;
  precio: number;
}

export interface TratamientoRequest {
  idEspecialidad: number;
  nombre: string;
  precio: number;
}
