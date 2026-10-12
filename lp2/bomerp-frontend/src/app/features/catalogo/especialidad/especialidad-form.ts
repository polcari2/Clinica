import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from './especialidad-service';

@Component({
  selector: 'app-especialidad-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './especialidad-form.html'
})
export class EspecialidadForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EspecialidadService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.maxLength(250)]]
  });

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.service.obtener(+paramId).subscribe({
        next: (esp) => this.form.patchValue(esp),
        error: (err) => console.error('Error al cargar especialidad', err)
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
      next: () => this.router.navigate(['/catalogo/especialidades']),
      error: (err) => console.error('Error al guardar especialidad', err)
    });
  }
}
