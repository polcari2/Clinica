import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h2>Bienvenido a ClinicaDent / OdontoSys</h2>
      </div>
      <div class="card" style="margin-bottom: 2rem;">
        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem;">
          Sistema de Gestión Odontológica integral. Selecciona un módulo en el menú lateral o accede rápidamente a las secciones principales:
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div class="card" style="margin: 0; border-left: 4px solid #0284c7;">
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #0284c7;">Admisión</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Gestión de pacientes y programación de citas.</p>
            <a routerLink="/admision/pacientes" class="btn btn-primary btn-sm">Ir a Pacientes</a>
          </div>
          <div class="card" style="margin: 0; border-left: 4px solid #0ea5e9;">
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #0ea5e9;">Catálogo</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Especialidades médicas y catálogo de procedimientos.</p>
            <a routerLink="/catalogo/especialidades" class="btn btn-primary btn-sm">Ir a Especialidades</a>
          </div>
          <div class="card" style="margin: 0; border-left: 4px solid #10b981;">
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #10b981;">Clínica</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Registro de odontólogos y fichas de atención médica.</p>
            <a routerLink="/clinica/odontologos" class="btn btn-primary btn-sm">Ir a Odontólogos</a>
          </div>
          <div class="card" style="margin: 0; border-left: 4px solid #f59e0b;">
            <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #f59e0b;">Caja</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">Métodos de pago y registro de transacciones.</p>
            <a routerLink="/caja/metodos-pago" class="btn btn-primary btn-sm">Ir a Métodos</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Inicio {}
