import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PagoService } from './pago-service';
import { MetodoPagoService } from '../metodo-pago/metodo-pago-service';
import { Pago } from './pago.model';
import { MetodoPago } from '../metodo-pago/metodo-pago.model';

@Component({
  selector: 'app-pago-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './pago-list.html'
})
export class PagoList implements OnInit {
  private readonly pagoService = inject(PagoService);
  private readonly metodoService = inject(MetodoPagoService);

  protected readonly pagos = signal<Pago[]>([]);
  protected readonly metodos = signal<MetodoPago[]>([]);
  protected readonly filtroId = signal<number | null>(null);

  ngOnInit(): void {
    this.metodoService.listar().subscribe({
      next: (data) => this.metodos.set(data),
      error: (err) => console.error('Error al cargar métodos de pago', err)
    });
    this.cargar();
  }

  cargar(): void {
    this.pagoService.listar(this.filtroId() ?? undefined).subscribe({
      next: (data) => this.pagos.set(data),
      error: (err) => console.error('Error al cargar pagos', err)
    });
  }

  filtrar(id: number): void {
    this.filtroId.set(id > 0 ? id : null);
    this.cargar();
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este pago?')) {
      this.pagoService.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar pago', err)
      });
    }
  }
}
