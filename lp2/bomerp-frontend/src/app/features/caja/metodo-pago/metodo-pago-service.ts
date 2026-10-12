import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { MetodoPago } from './metodo-pago.model';

@Injectable({ providedIn: 'root' })
export class MetodoPagoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/metodos-pago';

  listar(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.api.buildUrl(this.resource));
  }

  obtener(id: number): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(metodo: MetodoPago): Observable<MetodoPago> {
    return this.http.post<MetodoPago>(this.api.buildUrl(this.resource), metodo);
  }

  actualizar(id: number, metodo: MetodoPago): Observable<MetodoPago> {
    return this.http.put<MetodoPago>(this.api.buildUrl(`${this.resource}/${id}`), metodo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
