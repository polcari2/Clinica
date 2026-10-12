import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Tratamiento, TratamientoRequest } from './tratamiento.model';

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/procedimientos';

  listar(idEspecialidad?: number): Observable<Tratamiento[]> {
    let params = new HttpParams();
    if (idEspecialidad) {
      params = params.set('idEspecialidad', idEspecialidad);
    }
    return this.http.get<Tratamiento[]>(this.api.buildUrl(this.resource), { params });
  }

  obtener(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(tratamiento: TratamientoRequest): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.api.buildUrl(this.resource), tratamiento);
  }

  actualizar(id: number, tratamiento: TratamientoRequest): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(this.api.buildUrl(`${this.resource}/${id}`), tratamiento);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
