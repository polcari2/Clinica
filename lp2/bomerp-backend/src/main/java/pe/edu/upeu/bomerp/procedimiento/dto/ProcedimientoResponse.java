package pe.edu.upeu.bomerp.procedimiento.dto;

import pe.edu.upeu.bomerp.procedimiento.entity.Procedimiento;

import java.math.BigDecimal;

public record ProcedimientoResponse(
    Long id,
    String nombre,
    BigDecimal precioBase,
    Long especialidadId,
    String estado
) {
    public static ProcedimientoResponse fromEntity(Procedimiento p) {
        return new ProcedimientoResponse(
            p.getId(),
            p.getNombre(),
            p.getPrecioBase(),
            p.getEspecialidadId(),
            p.getEstado()
        );
    }
}
