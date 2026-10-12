import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Procedimiento } from './procedimiento.model';

@Injectable({ providedIn: 'root' })
export class ProcedimientoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/procedimientos';

  listar(especialidadId?: number): Observable<Procedimiento[]> {
    let params = new HttpParams();
    if (especialidadId && especialidadId > 0) {
      params = params.set('especialidadId', especialidadId.toString());
    }
    return this.http.get<Procedimiento[]>(this.api.buildUrl(this.resource), { params });
  }

  obtener(id: number): Observable<Procedimiento> {
    return this.http.get<Procedimiento>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(proc: { nombre: string; precioBase: number; especialidadId: number }): Observable<Procedimiento> {
    return this.http.post<Procedimiento>(this.api.buildUrl(this.resource), proc);
  }

  actualizar(id: number, proc: { nombre: string; precioBase: number; especialidadId: number }): Observable<Procedimiento> {
    return this.http.put<Procedimiento>(this.api.buildUrl(`${this.resource}/${id}`), proc);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
