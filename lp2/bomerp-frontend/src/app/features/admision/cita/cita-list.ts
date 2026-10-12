import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CitaService } from './cita-service';
import { PacienteService } from '../paciente/paciente-service';
import { Cita } from './cita.model';
import { Paciente } from '../paciente/paciente.model';

@Component({
  selector: 'app-cita-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './cita-list.html'
})
export class CitaList implements OnInit {
  private readonly citaService = inject(CitaService);
  private readonly pacienteService = inject(PacienteService);

  protected readonly citas = signal<Cita[]>([]);
  protected readonly pacientes = signal<Paciente[]>([]);
  protected readonly filtroId = signal<number | null>(null);

  ngOnInit(): void {
    this.pacienteService.listar().subscribe({
      next: (data) => this.pacientes.set(data),
      error: (err) => console.error('Error al cargar pacientes', err)
    });
    this.cargar();
  }

  cargar(): void {
    this.citaService.listar(this.filtroId() ?? undefined).subscribe({
      next: (data) => this.citas.set(data),
      error: (err) => console.error('Error al cargar citas', err)
    });
  }

  filtrar(id: number): void {
    this.filtroId.set(id > 0 ? id : null);
    this.cargar();
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar esta cita?')) {
      this.citaService.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar cita', err)
      });
    }
  }
}
