import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacienteService } from './paciente-service';
import { Paciente } from './paciente.model';

@Component({
  selector: 'app-paciente-list',
  imports: [RouterLink],
  templateUrl: './paciente-list.html'
})
export class PacienteList implements OnInit {
  private readonly service = inject(PacienteService);
  protected readonly pacientes = signal<Paciente[]>([]);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => this.pacientes.set(data),
      error: (err) => console.error('Error al cargar pacientes', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
      this.service.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar paciente', err)
      });
    }
  }
}
