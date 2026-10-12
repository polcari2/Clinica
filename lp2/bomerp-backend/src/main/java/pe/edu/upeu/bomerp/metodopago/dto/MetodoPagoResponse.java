package pe.edu.upeu.bomerp.metodopago.dto;

import pe.edu.upeu.bomerp.metodopago.entity.MetodoPago;

public record MetodoPagoResponse(
    Long id,
    String nombre,
    String descripcion,
    String estado
) {
    public static MetodoPagoResponse fromEntity(MetodoPago m) {
        return new MetodoPagoResponse(
            m.getId(),
            m.getNombre(),
            m.getDescripcion(),
            m.getEstado()
        );
    }
}
