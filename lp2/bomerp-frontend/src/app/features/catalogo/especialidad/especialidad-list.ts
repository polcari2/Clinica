import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EspecialidadService } from './especialidad-service';
import { Especialidad } from './especialidad.model';

@Component({
  selector: 'app-especialidad-list',
  imports: [RouterLink],
  templateUrl: './especialidad-list.html'
})
export class EspecialidadList implements OnInit {
  private readonly service = inject(EspecialidadService);
  protected readonly especialidades = signal<Especialidad[]>([]);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => this.especialidades.set(data),
      error: (err) => console.error('Error al cargar especialidades', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar esta especialidad?')) {
      this.service.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar especialidad', err)
      });
    }
  }
}
