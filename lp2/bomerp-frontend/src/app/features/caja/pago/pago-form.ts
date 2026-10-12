import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoService } from './pago-service';
import { MetodoPagoService } from '../metodo-pago/metodo-pago-service';
import { MetodoPago } from '../metodo-pago/metodo-pago.model';

@Component({
  selector: 'app-pago-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pago-form.html'
})
export class PagoForm {
  private readonly fb = inject(FormBuilder);
  private readonly pagoService = inject(PagoService);
  private readonly metodoService = inject(MetodoPagoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly metodos = signal<MetodoPago[]>([]);

  protected readonly form = this.fb.nonNullable.group({
    fechaPago: ['', [Validators.required]],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    numeroOperacion: ['', [Validators.maxLength(50)]],
    metodoPagoId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.metodoService.listar().subscribe({
      next: (data) => this.metodos.set(data),
      error: (err) => console.error('Error al cargar métodos de pago', err)
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.pagoService.obtener(+paramId).subscribe({
        next: (p) => {
          this.form.patchValue({
            fechaPago: p.fechaPago ? p.fechaPago.substring(0, 16) : '',
            monto: p.monto,
            numeroOperacion: p.numeroOperacion || '',
            metodoPagoId: p.metodoPago?.id ?? 0
          });
        },
        error: (err) => console.error('Error al obtener pago', err)
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const req = this.id()
      ? this.pagoService.actualizar(this.id()!, payload)
      : this.pagoService.crear(payload);

    req.subscribe({
      next: () => this.router.navigate(['/caja/pagos']),
      error: (err) => {
        console.error('Error al guardar pago', err);
        if (err.status === 404) {
          this.form.controls.metodoPagoId.setValue(0);
        }
      }
    });
  }
}
