import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from './especialidad-service';

@Component({
  selector: 'app-especialidad-form',
  imports: [ReactiveFormsModule],
  templateUrl: './especialidad-form.html',
})
export class EspecialidadForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly especialidadService = inject(EspecialidadService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(false);
  protected readonly errorCarga = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    descripcion: ['', [Validators.maxLength(200)]],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.id.set(id);
      this.loading.set(true);
      this.especialidadService.obtener(id).subscribe({
        next: (esp) => {
          this.form.patchValue(esp);
          this.loading.set(false);
        },
        error: () => {
          this.errorCarga.set(true);
          this.error.set('No se pudo cargar la especialidad.');
          this.loading.set(false);
        },
      });
    }
  }

  ngOnInit(): void {
    // Requisito solicitado en Lamb Virtual
    this.form.valueChanges.subscribe((valor) => {
      console.log('Formulario:', valor);
      console.log('Nombre:', valor.nombre);
      console.log('Descripción:', valor.descripcion);
    });
  }

  guardar(): void {
    if (this.loading() || this.errorCarga()) return;
    this.error.set(null);

    const nombre = this.form.controls.nombre;
    nombre.setValue(nombre.value.trim());

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor = this.form.getRawValue();
    const id = this.id();
    const peticion = id
      ? this.especialidadService.actualizar(id, valor)
      : this.especialidadService.crear(valor);

    this.loading.set(true);
    peticion.subscribe({
      next: () => this.router.navigate(['/clinica/especialidades']),
      error: () => {
        this.error.set('No se pudo guardar la especialidad.');
        this.loading.set(false);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/clinica/especialidades']);
  }

  protected mensajeValidacion(campo: 'nombre' | 'descripcion'): string {
    const control = this.form.controls[campo];
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('maxlength')) return `Máximo ${control.getError('maxlength').requiredLength} caracteres.`;
    return '';
  }
}
