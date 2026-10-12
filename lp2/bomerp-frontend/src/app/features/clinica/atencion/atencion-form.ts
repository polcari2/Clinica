import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtencionService } from './atencion-service';
import { OdontologoService } from '../odontologo/odontologo-service';
import { Odontologo } from '../odontologo/odontologo.model';

@Component({
  selector: 'app-atencion-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './atencion-form.html'
})
export class AtencionForm {
  private readonly fb = inject(FormBuilder);
  private readonly atencionService = inject(AtencionService);
  private readonly odontologoService = inject(OdontologoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly odontologos = signal<Odontologo[]>([]);

  protected readonly form = this.fb.nonNullable.group({
    fechaAtencion: ['', [Validators.required]],
    diagnostico: ['', [Validators.required, Validators.maxLength(250)]],
    observaciones: ['', [Validators.maxLength(500)]],
    odontologoId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.odontologoService.listar().subscribe({
      next: (data) => this.odontologos.set(data),
      error: (err) => console.error('Error al cargar odontólogos', err)
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.atencionService.obtener(+paramId).subscribe({
        next: (a) => {
          this.form.patchValue({
            fechaAtencion: a.fechaAtencion ? a.fechaAtencion.substring(0, 16) : '',
            diagnostico: a.diagnostico,
            observaciones: a.observaciones || '',
            odontologoId: a.odontologo?.id ?? 0
          });
        },
        error: (err) => console.error('Error al obtener atención', err)
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
      ? this.atencionService.actualizar(this.id()!, payload)
      : this.atencionService.crear(payload);

    req.subscribe({
      next: () => this.router.navigate(['/clinica/atenciones']),
      error: (err) => {
        console.error('Error al guardar atención', err);
        if (err.status === 404) {
          this.form.controls.odontologoId.setValue(0);
        }
      }
    });
  }
}
