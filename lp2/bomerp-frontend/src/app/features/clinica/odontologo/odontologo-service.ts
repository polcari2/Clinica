import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Odontologo } from './odontologo.model';

@Injectable({ providedIn: 'root' })
export class OdontologoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/odontologos';

  listar(): Observable<Odontologo[]> {
    return this.http.get<Odontologo[]>(this.api.buildUrl(this.resource));
  }

  obtener(id: number): Observable<Odontologo> {
    return this.http.get<Odontologo>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(odontologo: Odontologo): Observable<Odontologo> {
    return this.http.post<Odontologo>(this.api.buildUrl(this.resource), odontologo);
  }

  actualizar(id: number, odontologo: Odontologo): Observable<Odontologo> {
    return this.http.put<Odontologo>(this.api.buildUrl(`${this.resource}/${id}`), odontologo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
