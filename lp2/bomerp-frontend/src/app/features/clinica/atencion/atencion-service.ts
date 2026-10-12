import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';
import { Atencion } from './atencion.model';

@Injectable({ providedIn: 'root' })
export class AtencionService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/atenciones';

  listar(odontologoId?: number): Observable<Atencion[]> {
    let params = new HttpParams();
    if (odontologoId && odontologoId > 0) {
      params = params.set('odontologoId', odontologoId.toString());
    }
    return this.http.get<Atencion[]>(this.api.buildUrl(this.resource), { params });
  }

  obtener(id: number): Observable<Atencion> {
    return this.http.get<Atencion>(this.api.buildUrl(`${this.resource}/${id}`));
  }

  crear(atencion: { fechaAtencion: string; diagnostico: string; observaciones?: string; odontologoId: number }): Observable<Atencion> {
    return this.http.post<Atencion>(this.api.buildUrl(this.resource), atencion);
  }

  actualizar(id: number, atencion: { fechaAtencion: string; diagnostico: string; observaciones?: string; odontologoId: number }): Observable<Atencion> {
    return this.http.put<Atencion>(this.api.buildUrl(`${this.resource}/${id}`), atencion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.api.buildUrl(`${this.resource}/${id}`));
  }
}
