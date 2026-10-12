import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api-service';
import { Producto } from './producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiService);
  private readonly resource = '/api/v1/productos';

  private readonly productosDemo: Producto[] = [
    { id: 1, nombre: 'Consulta Odontológica / Profilaxis', precio: 80.0, stock: 50 },
    { id: 2, nombre: 'Curación Dental con Resina', precio: 120.0, stock: 30 },
    { id: 3, nombre: 'Blanqueamiento Dental LED', precio: 250.0, stock: 15 },
    { id: 4, nombre: 'Extracción Simple', precio: 90.0, stock: 20 },
    { id: 5, nombre: 'Endodoncia Especializada', precio: 320.0, stock: 10 }
  ];

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.api.buildUrl(this.resource)).pipe(
      catchError(() => of(this.productosDemo))
    );
  }
}