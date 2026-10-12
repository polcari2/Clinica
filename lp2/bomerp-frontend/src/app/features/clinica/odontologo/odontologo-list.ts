import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OdontologoService } from './odontologo-service';
import { Odontologo } from './odontologo.model';

@Component({
  selector: 'app-odontologo-list',
  imports: [RouterLink],
  templateUrl: './odontologo-list.html'
})
export class OdontologoList implements OnInit {
  private readonly service = inject(OdontologoService);
  protected readonly odontologos = signal<Odontologo[]>([]);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => this.odontologos.set(data),
      error: (err) => console.error('Error al cargar odontólogos', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este odontólogo?')) {
      this.service.eliminar(id).subscribe({
        next: () => this.cargar(),
        error: (err) => console.error('Error al eliminar odontólogo', err)
      });
    }
  }
}
