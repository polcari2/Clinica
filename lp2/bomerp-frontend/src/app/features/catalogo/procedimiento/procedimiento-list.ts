import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProcedimientoService } from './procedimiento-service';
import { EspecialidadService } from '../especialidad/especialidad-service';
import { Procedimiento } from './procedimiento.model';
import { Especialidad } from '../especialidad/especialidad.model';

@Component({
  selector: 'app-procedimiento-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './procedimiento-list.html'
})
export class ProcedimientoList implements OnInit {
  private readonly procService = inject(ProcedimientoService);
  private readonly espService = inject(EspecialidadService);

  protected readonly procedimientos = signal<Procedimiento[]>([]);
  protected readonly especialidades = signal<Especialidad[]>([]);
  protected readonly filtroId = signal<number | null>(null);

  ngOnInit(): void {
    this.espService.listar().subscribe({
      next: (data) => this.especialidades.set(data),
      error: (err) => console.error('Error al cargar especialidades', err)
    });
    this.cargar();
  }

  cargar(): void {
    this.procService.listar(this.filtroId() ?? undefined).subscribe({
      next: (data) => this.procedimientos.set(data),
      error: (err) => console.error('Error al cargar procedimientos', err)
    });
  }

  filtrar(id: number): void {
    this.filtroId.set(id > 0 ? id : null);
    this.cargar();
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este procedimiento?')) {
      this.procService.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar procedimiento', err)
      });
    }
  }
}
