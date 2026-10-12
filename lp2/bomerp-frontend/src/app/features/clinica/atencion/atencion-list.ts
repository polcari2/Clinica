import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AtencionService } from './atencion-service';
import { OdontologoService } from '../odontologo/odontologo-service';
import { Atencion } from './atencion.model';
import { Odontologo } from '../odontologo/odontologo.model';

@Component({
  selector: 'app-atencion-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './atencion-list.html'
})
export class AtencionList implements OnInit {
  private readonly atencionService = inject(AtencionService);
  private readonly odontologoService = inject(OdontologoService);

  protected readonly atenciones = signal<Atencion[]>([]);
  protected readonly odontologos = signal<Odontologo[]>([]);
  protected readonly filtroId = signal<number | null>(null);

  ngOnInit(): void {
    this.odontologoService.listar().subscribe({
      next: (data) => this.odontologos.set(data),
      error: (err) => console.error('Error al cargar odontólogos', err)
    });
    this.cargar();
  }

  cargar(): void {
    this.atencionService.listar(this.filtroId() ?? undefined).subscribe({
      next: (data) => this.atenciones.set(data),
      error: (err) => console.error('Error al cargar atenciones', err)
    });
  }

  filtrar(id: number): void {
    this.filtroId.set(id > 0 ? id : null);
    this.cargar();
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar esta atención?')) {
      this.atencionService.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar atención', err)
      });
    }
  }
}
