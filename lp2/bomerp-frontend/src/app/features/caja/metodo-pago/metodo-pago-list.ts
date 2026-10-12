import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetodoPagoService } from './metodo-pago-service';
import { MetodoPago } from './metodo-pago.model';

@Component({
  selector: 'app-metodo-pago-list',
  imports: [RouterLink],
  templateUrl: './metodo-pago-list.html'
})
export class MetodoPagoList implements OnInit {
  private readonly service = inject(MetodoPagoService);
  protected readonly metodos = signal<MetodoPago[]>([]);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => this.metodos.set(data),
      error: (err) => console.error('Error al cargar métodos de pago', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este método de pago?')) {
      this.service.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar método de pago', err)
      });
    }
  }
}
