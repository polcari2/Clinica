package pe.edu.upeu.bomerp.cita.dto;

import pe.edu.upeu.bomerp.cita.entity.Cita;

import java.time.LocalDateTime;

public record CitaResponse(
    Long id,
    Long pacienteId,
    Long odontologoId,
    LocalDateTime fechaHora,
    String motivo,
    String estado
) {
    public static CitaResponse fromEntity(Cita c) {
        return new CitaResponse(
            c.getId(),
            c.getPacienteId(),
            c.getOdontologoId(),
            c.getFechaHora(),
            c.getMotivo(),
            c.getEstado()
        );
    }
}
