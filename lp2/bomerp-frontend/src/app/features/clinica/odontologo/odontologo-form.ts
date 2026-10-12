import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OdontologoService } from './odontologo-service';

@Component({
  selector: 'app-odontologo-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './odontologo-form.html'
})
export class OdontologoForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(OdontologoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    dni: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', [Validators.required, Validators.maxLength(100)]],
    apellidos: ['', [Validators.required, Validators.maxLength(100)]],
    cop: ['', [Validators.required, Validators.maxLength(20)]]
  });

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(+paramId);
      this.service.obtener(+paramId).subscribe({
        next: (odo) => this.form.patchValue(odo),
        error: (err) => console.error('Error al cargar odontólogo', err)
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
      next: () => this.router.navigate(['/clinica/odontologos']),
      error: (err) => console.error('Error al guardar odontólogo', err)
    });
  }
}
