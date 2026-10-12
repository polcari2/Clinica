import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcedimientoService } from './procedimiento-service';
import { EspecialidadService } from '../especialidad/especialidad-service';
import { Especialidad } from '../especialidad/especialidad.model';

@Component({
  selector: 'app-procedimiento-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './procedimiento-form.html'
})
export class ProcedimientoForm {
  private readonly fb = inject(FormBuilder);
  private readonly procService = inject(ProcedimientoService);
  private readonly espService = inject(EspecialidadService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly especialidades = signal<Especialidad[]>([]);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    precioBase: [0, [Validators.required, Validators.min(0)]],
    especialidadId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.espService.listar().subscribe({
      next: (data) => this.especialidades.set(data),
      error: (err) => console.error('Error al cargar especialidades', err)
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.procService.obtener(+paramId).subscribe({
        next: (p) => {
          this.form.patchValue({
            nombre: p.nombre,
            precioBase: p.precioBase,
            especialidadId: p.especialidad?.id ?? 0
          });
        },
        error: (err) => console.error('Error al obtener procedimiento', err)
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
      ? this.procService.actualizar(this.id()!, payload)
      : this.procService.crear(payload);

    req.subscribe({
      next: () => this.router.navigate(['/catalogo/procedimientos']),
      error: (err) => {
        console.error('Error al guardar procedimiento', err);
        if (err.status === 404) {
          this.form.controls.especialidadId.setValue(0);
        }
      }
    });
  }
}
