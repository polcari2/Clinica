import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from './paciente-service';

@Component({
  selector: 'app-paciente-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './paciente-form.html'
})
export class PacienteForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(PacienteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    dni: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', [Validators.required, Validators.maxLength(100)]],
    apellidos: ['', [Validators.required, Validators.maxLength(100)]],
    telefono: ['', [Validators.maxLength(20)]]
  });

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.service.obtener(+paramId).subscribe({
        next: (paciente) => this.form.patchValue(paciente),
        error: (err) => console.error('Error al cargar paciente', err)
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
      ? this.service.actualizar(this.id()!, payload)
      : this.service.crear(payload);

    req.subscribe({
      next: () => this.router.navigate(['/admision/pacientes']),
      error: (err) => console.error('Error al guardar paciente', err)
    });
  }
}
