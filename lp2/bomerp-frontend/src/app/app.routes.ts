import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then(m => m.Layout),
    children: [
      {
        path: 'ventas/nueva',
        loadComponent: () => import('./features/ventas/venta/venta-form').then((m) => m.VentaForm),
      },
      {
        path: 'ventas/reporte',
        loadComponent: () => import('./features/ventas/venta/venta-reporte').then((m) => m.VentaReporteComponent),
      },
      { path: '', loadComponent: () => import('./core/inicio/inicio').then(m => m.Inicio) },

      // ==========================================
      // MÓDULO 1: Citas y Admisión (Eddy)
      // ==========================================
      // S07 Independiente: Paciente
      {
        path: 'admision/pacientes',
        loadComponent: () => import('./features/admision/paciente/paciente-list').then(m => m.PacienteList)
      },
      {
        path: 'admision/pacientes/nueva',
        loadComponent: () => import('./features/admision/paciente/paciente-form').then(m => m.PacienteForm)
      },
      {
        path: 'admision/pacientes/:id/editar',
        loadComponent: () => import('./features/admision/paciente/paciente-form').then(m => m.PacienteForm)
      },
      // S08 Dependiente: Cita
      {
        path: 'admision/citas',
        loadComponent: () => import('./features/admision/cita/cita-list').then(m => m.CitaList)
      },
      {
        path: 'admision/citas/nueva',
        loadComponent: () => import('./features/admision/cita/cita-form').then(m => m.CitaForm)
      },
      {
        path: 'admision/citas/:id/editar',
        loadComponent: () => import('./features/admision/cita/cita-form').then(m => m.CitaForm)
      },

      // ==========================================
      // MÓDULO 2: Catálogo y Tratamientos (Paul)
      // ==========================================
      // S07 Independiente: Especialidad
      {
        path: 'catalogo/especialidades',
        loadComponent: () => import('./features/catalogo/especialidad/especialidad-list').then(m => m.EspecialidadList)
      },
      {
        path: 'catalogo/especialidades/nueva',
        loadComponent: () => import('./features/catalogo/especialidad/especialidad-form').then(m => m.EspecialidadForm)
      },
      {
        path: 'catalogo/especialidades/:id/editar',
        loadComponent: () => import('./features/catalogo/especialidad/especialidad-form').then(m => m.EspecialidadForm)
      },
      // S08 Dependiente: Procedimiento
      {
        path: 'catalogo/procedimientos',
        loadComponent: () => import('./features/catalogo/procedimiento/procedimiento-list').then(m => m.ProcedimientoList)
      },
      {
        path: 'catalogo/procedimientos/nueva',
        loadComponent: () => import('./features/catalogo/procedimiento/procedimiento-form').then(m => m.ProcedimientoForm)
      },
      {
        path: 'catalogo/procedimientos/:id/editar',
        loadComponent: () => import('./features/catalogo/procedimiento/procedimiento-form').then(m => m.ProcedimientoForm)
      },

      // ==========================================
      // MÓDULO 3: Atenciones Clínicas (Erick)
      // ==========================================
      // S07 Independiente: Odontologo
      {
        path: 'clinica/odontologos',
        loadComponent: () => import('./features/clinica/odontologo/odontologo-list').then(m => m.OdontologoList)
      },
      {
        path: 'clinica/odontologos/nueva',
        loadComponent: () => import('./features/clinica/odontologo/odontologo-form').then(m => m.OdontologoForm)
      },
      {
        path: 'clinica/odontologos/:id/editar',
        loadComponent: () => import('./features/clinica/odontologo/odontologo-form').then(m => m.OdontologoForm)
      },
      // S08 Dependiente: Atencion
      {
        path: 'clinica/atenciones',
        loadComponent: () => import('./features/clinica/atencion/atencion-list').then(m => m.AtencionList)
      },
      {
        path: 'clinica/atenciones/nueva',
        loadComponent: () => import('./features/clinica/atencion/atencion-form').then(m => m.AtencionForm)
      },
      {
        path: 'clinica/atenciones/:id/editar',
        loadComponent: () => import('./features/clinica/atencion/atencion-form').then(m => m.AtencionForm)
      },

      // ==========================================
      // MÓDULO 4: Pagos y Caja (Axcel)
      // ==========================================
      // S07 Independiente: MetodoPago
      {
        path: 'caja/metodos-pago',
        loadComponent: () => import('./features/caja/metodo-pago/metodo-pago-list').then(m => m.MetodoPagoList)
      },
      {
        path: 'caja/metodos-pago/nueva',
        loadComponent: () => import('./features/caja/metodo-pago/metodo-pago-form').then(m => m.MetodoPagoForm)
      },
      {
        path: 'caja/metodos-pago/:id/editar',
        loadComponent: () => import('./features/caja/metodo-pago/metodo-pago-form').then(m => m.MetodoPagoForm)
      },
      // S08 Dependiente: Pago
      {
        path: 'caja/pagos',
        loadComponent: () => import('./features/caja/pago/pago-list').then(m => m.PagoList)
      },
      {
        path: 'caja/pagos/nueva',
        loadComponent: () => import('./features/caja/pago/pago-form').then(m => m.PagoForm)
      },
      {
        path: 'caja/pagos/:id/editar',
        loadComponent: () => import('./features/caja/pago/pago-form').then(m => m.PagoForm)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
