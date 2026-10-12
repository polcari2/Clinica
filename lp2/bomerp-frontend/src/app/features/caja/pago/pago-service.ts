import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Pago } from './pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/pagos';

  listar(metodoPagoId?: number): Observable<Pago[]> {
    let params = new HttpParams();
    if (metodoPagoId && metodoPagoId > 0) {
      params = params.set('metodoPagoId', metodoPagoId.toString());
    }
    return this.http.get<Pago[]>(this.api.buildUrl(this.resource), { params });
  }

  obtener(id: number): Observable<Pago> {
    return this.http.get<Pago>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(pago: { fechaPago: string; monto: number; numeroOperacion?: string; metodoPagoId: number }): Observable<Pago> {
    return this.http.post<Pago>(this.api.buildUrl(this.resource), pago);
  }

  actualizar(id: number, pago: { fechaPago: string; monto: number; numeroOperacion?: string; metodoPagoId: number }): Observable<Pago> {
    return this.http.put<Pago>(this.api.buildUrl(`${this.resource}/${id}`), pago);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
