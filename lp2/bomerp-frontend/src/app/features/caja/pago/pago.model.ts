import { MetodoPago } from '../metodo-pago/metodo-pago.model';

export interface Pago {
  id?: number;
  fechaPago: string;
  monto: number;
  numeroOperacion?: string;
  metodoPago?: MetodoPago;
  metodoPagoId?: number;
}
