import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { EspecialidadService } from './especialidad-service';
import { Especialidad } from './especialidad.model';

@Component({
  selector: 'app-especialidad-list',
  imports: [RouterLink],
  templateUrl: './especialidad-list.html',
})
export class EspecialidadList implements OnInit {
  private readonly especialidadService = inject(EspecialidadService);

  protected readonly especialidades = signal<Especialidad[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(false);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.error.set(null);
    this.especialidadService.listar().subscribe({
      next: (data) => this.especialidades.set(data),
      error: () => {
        this.error.set('No se pudo cargar la lista de especialidades.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  eliminar(id: number): void {
    if (!confirm(`¿Está seguro de eliminar la especialidad ${id}?`)) {
      return;
    }

    this.especialidadService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          this.error.set('No se puede eliminar: tiene registros odontológicos asociados.');
        } else {
          this.error.set('No se pudo eliminar la especialidad.');
        }
      },
    });
  }
}
