package pe.edu.upeu.bomerp.atencion.dto;

import pe.edu.upeu.bomerp.atencion.entity.Atencion;

import java.time.LocalDateTime;

public record AtencionResponse(
    Long id,
    Long citaId,
    Long odontologoId,
    String diagnostico,
    String tratamientoRealizado,
    String observaciones,
    LocalDateTime fechaAtencion
) {
    public static AtencionResponse fromEntity(Atencion a) {
        return new AtencionResponse(
            a.getId(),
            a.getCitaId(),
            a.getOdontologoId(),
            a.getDiagnostico(),
            a.getTratamientoRealizado(),
            a.getObservaciones(),
            a.getFechaAtencion()
        );
    }
}
