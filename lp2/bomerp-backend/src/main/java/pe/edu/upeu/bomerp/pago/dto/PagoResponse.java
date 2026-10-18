package pe.edu.upeu.bomerp.pago.dto;

import pe.edu.upeu.bomerp.pago.entity.Pago;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PagoResponse(
    Long id,
    LocalDateTime fechaPago,
    BigDecimal monto,
    String numeroOperacion,
    Long metodoPagoId,
    Long citaId,
    String estado,
    String usuarioId
) {
    public static PagoResponse fromEntity(Pago p) {
        return new PagoResponse(
            p.getId(),
            p.getFechaPago(),
            p.getMonto(),
            p.getNumeroOperacion(),
            p.getMetodoPagoId(),
            p.getCitaId(),
            p.getEstado(),
            p.getUsuarioId()
        );
    }
}
