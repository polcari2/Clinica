package pe.edu.upeu.bomerp.atencion.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record AtencionRequest(
    @NotNull(message = "El ID de la cita es obligatorio")
    Long citaId,

    @NotNull(message = "El ID del odontólogo es obligatorio")
    Long odontologoId,

    @NotBlank(message = "El diagnóstico es obligatorio")
    @Size(max = 250, message = "El diagnóstico no puede exceder 250 caracteres")
    String diagnostico,

    @NotBlank(message = "El tratamiento realizado es obligatorio")
    @Size(max = 500, message = "El tratamiento realizado no puede exceder 500 caracteres")
    String tratamientoRealizado,

    @Size(max = 500, message = "Las observaciones no pueden exceder 500 caracteres")
    String observaciones,

    @NotNull(message = "La fecha de atención es obligatoria")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime fechaAtencion
) {}
