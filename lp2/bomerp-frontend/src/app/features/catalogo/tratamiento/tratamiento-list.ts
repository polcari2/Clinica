import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EspecialidadService } from '../especialidad/especialidad-service';
import { Especialidad } from '../especialidad/especialidad.model';
import { TratamientoService } from './tratamiento-service';
import { Tratamiento } from './tratamiento.model';

@Component({
  selector: 'app-tratamiento-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './tratamiento-list.html',
})
export class TratamientoList implements OnInit {
  private readonly tratamientoService = inject(TratamientoService);
  private readonly especialidadService = inject(EspecialidadService);

  protected readonly tratamientos = signal<Tratamiento[]>([]);
  protected readonly especialidades = signal<Especialidad[]>([]);
  protected readonly especialidadFiltro = signal<number | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(false);

  ngOnInit(): void {
    this.especialidadService.listar().subscribe({
      next: (data: Especialidad[]) => this.especialidades.set(data),
      error: () => this.error.set('No se pudo cargar la lista de especialidades.'),
    });
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.error.set(null);
    const filtro = this.especialidadFiltro();
    this.tratamientoService.listar(filtro ?? undefined).subscribe({
      next: (data: Tratamiento[]) => {
        let items = data;
        if (filtro) {
          items = items.filter((t) => t.idEspecialidad === filtro);
        }
        this.tratamientos.set(items);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de tratamientos.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  filtrar(idEspecialidad: number): void {
    this.especialidadFiltro.set(idEspecialidad || null);
    this.cargar();
  }

  obtenerNombreEspecialidad(idEspecialidad: number): string {
    const esp = this.especialidades().find((e) => e.id === idEspecialidad);
    return esp ? esp.nombre : `Especialidad #${idEspecialidad}`;
  }

  eliminar(id: number): void {
    if (!confirm(`¿Está seguro de eliminar el tratamiento ${id}?`)) {
      return;
    }

    this.tratamientoService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.error.set('El tratamiento ya no existe. Se recargó la lista.');
          this.cargar();
        } else {
          this.error.set('No se pudo eliminar el tratamiento.');
        }
      },
    });
  }
}
