import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitaService } from './cita-service';
import { PacienteService } from '../paciente/paciente-service';
import { Paciente } from '../paciente/paciente.model';

@Component({
  selector: 'app-cita-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cita-form.html'
})
export class CitaForm {
  private readonly fb = inject(FormBuilder);
  private readonly citaService = inject(CitaService);
  private readonly pacienteService = inject(PacienteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly pacientes = signal<Paciente[]>([]);

  protected readonly form = this.fb.nonNullable.group({
    fechaHora: ['', [Validators.required]],
    motivo: ['', [Validators.required, Validators.maxLength(250)]],
    estado: ['PENDIENTE', [Validators.required]],
    pacienteId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.pacienteService.listar().subscribe({
      next: (data) => this.pacientes.set(data),
      error: (err) => console.error('Error al cargar pacientes', err)
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.citaService.obtener(+paramId).subscribe({
        next: (c) => {
          this.form.patchValue({
            fechaHora: c.fechaHora ? c.fechaHora.substring(0, 16) : '',
            motivo: c.motivo,
            estado: c.estado,
            pacienteId: c.paciente?.id ?? 0
          });
        },
        error: (err) => console.error('Error al obtener cita', err)
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
      ? this.citaService.actualizar(this.id()!, payload)
      : this.citaService.crear(payload);

    req.subscribe({
      next: () => this.router.navigate(['/admision/citas']),
      error: (err) => {
        console.error('Error al guardar cita', err);
        if (err.status === 404) {
          this.form.controls.pacienteId.setValue(0);
        }
      }
    });
  }
}
