import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api-service';
import { VentaRequest, VentaResponse } from './venta.model';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/ventas';
  private readonly storageKey = 'odonto_ventas_db';

  private catalogoPrecios: Record<number, { nombre: string; precio: number }> = {
    1: { nombre: 'Consulta Odontológica / Profilaxis', precio: 80.0 },
    2: { nombre: 'Curación Dental con Resina', precio: 120.0 },
    3: { nombre: 'Blanqueamiento Dental LED', precio: 250.0 },
    4: { nombre: 'Extracción Simple', precio: 90.0 },
    5: { nombre: 'Endodoncia Especializada', precio: 320.0 }
  };

  private getVentasLocales(): VentaResponse[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      const demo: VentaResponse[] = [
        {
          id: 1,
          fecha: new Date().toISOString(),
          estado: 'REGISTRADA',
          total: 760.0,
          detalles: [
            { productoId: 5, nombreProducto: 'Endodoncia Especializada', precioUnitario: 320, cantidad: 2, subtotal: 640 },
            { productoId: 2, nombreProducto: 'Curación Dental con Resina', precioUnitario: 120, cantidad: 1, subtotal: 120 }
          ]
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(demo));
      return demo;
    }
    return JSON.parse(raw);
  }

  private saveVentasLocales(ventas: VentaResponse[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(ventas));
  }

  crear(venta: VentaRequest): Observable<VentaResponse> {
    return this.http.post<VentaResponse>(this.api.buildUrl(this.resource), venta).pipe(
      catchError(() => {
        const actuales = this.getVentasLocales();
        const nuevoId = actuales.length > 0 ? Math.max(...actuales.map(v => v.id)) + 1 : 1;
        const detallesResp = venta.detalles.map(d => {
          const item = this.catalogoPrecios[d.productoId] ?? { nombre: 'Procedimiento Clínico', precio: 100.0 };
          return {
            productoId: d.productoId,
            nombreProducto: item.nombre,
            precioUnitario: item.precio,
            cantidad: d.cantidad,
            subtotal: item.precio * d.cantidad
          };
        });
        const totalCalculado = detallesResp.reduce((acc, curr) => acc + curr.subtotal, 0);

        const nuevaVenta: VentaResponse = {
          id: nuevoId,
          fecha: new Date().toISOString(),
          estado: 'REGISTRADA',
          total: totalCalculado,
          detalles: detallesResp
        };

        actuales.unshift(nuevaVenta);
        this.saveVentasLocales(actuales);
        return of(nuevaVenta);
      })
    );
  }

  buscar(
    estado?: string,
    desde?: string,
    hasta?: string,
    ordenarPor = 'fecha',
    direccion = 'DESC',
  ): Observable<VentaResponse[]> {
    let params = new HttpParams().set('ordenarPor', ordenarPor).set('direccion', direccion);
    if (estado) params = params.set('estado', estado);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get<VentaResponse[]>(this.api.buildUrl(this.resource), { params }).pipe(
      catchError(() => {
        let lista = this.getVentasLocales();
        if (estado) {
          lista = lista.filter(v => v.estado.toUpperCase() === estado.toUpperCase());
        }
        return of(lista);
      })
    );
  }

  anular(id: number): Observable<VentaResponse> {
    return this.http.patch<VentaResponse>(this.api.buildUrl(`${this.resource}/${id}/anular`), {}).pipe(
      catchError(() => {
        const lista = this.getVentasLocales();
        const v = lista.find(item => item.id === id);
        if (v) {
          v.estado = 'ANULADA';
          this.saveVentasLocales(lista);
          return of(v);
        }
        throw new Error('Venta no encontrada');
      })
    );
  }
}