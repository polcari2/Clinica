import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Paciente } from './paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/pacientes';

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.api.buildUrl(this.resource));
  }

  obtener(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.api.buildUrl(this.resource), paciente);
  }

  actualizar(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(this.api.buildUrl(`${this.resource}/${id}`), paciente);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
