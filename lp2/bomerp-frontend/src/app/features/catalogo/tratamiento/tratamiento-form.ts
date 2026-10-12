import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EspecialidadService } from '../especialidad/especialidad-service';
import { Especialidad } from '../especialidad/especialidad.model';
import { TratamientoService } from './tratamiento-service';
import { TratamientoRequest } from './tratamiento.model';

@Component({
  selector: 'app-tratamiento-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './tratamiento-form.html',
})
export class TratamientoForm {
  private readonly fb = inject(FormBuilder);
  private readonly tratamientoService = inject(TratamientoService);
  private readonly especialidadService = inject(EspecialidadService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly id = signal<number | null>(null);
  protected readonly especialidades = signal<Especialidad[]>([]);
  protected readonly especialidadesCargadas = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(false);
  protected readonly errorCarga = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    idEspecialidad: [0, [Validators.min(1)]],
  });

  constructor() {
    this.cargarEspecialidades();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.id.set(id);
      this.loading.set(true);
      this.tratamientoService.obtener(id).subscribe({
        next: (t) => {
          this.form.patchValue({
            nombre: t.nombre,
            precio: t.precio,
            idEspecialidad: t.idEspecialidad,
          });
          this.loading.set(false);
        },
        error: () => {
          this.errorCarga.set(true);
          this.error.set('No se pudo cargar el tratamiento.');
          this.loading.set(false);
        },
      });
    }
  }

  private cargarEspecialidades(): void {
    this.especialidadService.listar().subscribe({
      next: (data: Especialidad[]) => {
        this.especialidades.set(data);
        this.especialidadesCargadas.set(true);
      },
      error: () => this.error.set('No se pudieron cargar las especialidades.'),
    });
  }

  guardar(): void {
    if (this.loading() || this.errorCarga()) return;
    this.error.set(null);

    const nombreCtrl = this.form.controls.nombre;
    nombreCtrl.setValue(nombreCtrl.value.trim());

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor: TratamientoRequest = {
      nombre: this.form.controls.nombre.value,
      precio: Number(this.form.controls.precio.value),
      idEspecialidad: Number(this.form.controls.idEspecialidad.value),
    };

    const id = this.id();
    const peticion = id
      ? this.tratamientoService.actualizar(id, valor)
      : this.tratamientoService.crear(valor);

    this.loading.set(true);
    peticion.subscribe({
      next: () => this.router.navigate(['/catalogo/tratamientos']),
      error: (err: HttpErrorResponse) => this.manejarErrorGuardado(err),
    });
  }

  cancelar(): void {
    this.router.navigate(['/catalogo/tratamientos']);
  }

  private manejarErrorGuardado(err: HttpErrorResponse): void {
    if (err.status === 404) {
      this.error.set('La especialidad seleccionada ya no existe. Elige otra de la lista.');
      this.form.controls.idEspecialidad.setValue(0);
      this.cargarEspecialidades();
    } else if (err.status === 400) {
      this.error.set('Los datos enviados no son válidos. Revisa los campos.');
    } else {
      this.error.set('No se pudo guardar el tratamiento.');
    }
    this.loading.set(false);
  }

  protected mensajeValidacion(campo: 'nombre' | 'precio' | 'idEspecialidad'): string {
    const control = this.form.controls[campo];
    if (!control.touched) return '';

    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('maxlength')) return 'Máximo 100 caracteres.';
    if (control.hasError('min')) {
      return campo === 'idEspecialidad' ? 'Selecciona una especialidad.' : 'Debe ser mayor a 0.';
    }
    return '';
  }
}
