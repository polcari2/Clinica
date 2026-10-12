import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Cita } from './cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/citas';

  listar(pacienteId?: number): Observable<Cita[]> {
    let params = new HttpParams();
    if (pacienteId && pacienteId > 0) {
      params = params.set('pacienteId', pacienteId.toString());
    }
    return this.http.get<Cita[]>(this.api.buildUrl(this.resource), { params });
  }

  obtener(id: number): Observable<Cita> {
    return this.http.get<Cita>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(cita: { fechaHora: string; motivo: string; estado: string; pacienteId: number }): Observable<Cita> {
    return this.http.post<Cita>(this.api.buildUrl(this.resource), cita);
  }

  actualizar(id: number, cita: { fechaHora: string; motivo: string; estado: string; pacienteId: number }): Observable<Cita> {
    return this.http.put<Cita>(this.api.buildUrl(`${this.resource}/${id}`), cita);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
