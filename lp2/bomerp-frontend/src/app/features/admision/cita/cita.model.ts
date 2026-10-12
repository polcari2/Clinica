import { Paciente } from '../paciente/paciente.model';

export interface Cita {
  id?: number;
  fechaHora: string;
  motivo: string;
  estado: string;
  paciente?: Paciente;
  pacienteId?: number;
}
