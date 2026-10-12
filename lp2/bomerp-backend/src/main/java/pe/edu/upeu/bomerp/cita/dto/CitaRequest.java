package pe.edu.upeu.bomerp.cita.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record CitaRequest(
    @NotNull(message = "La fecha y hora son obligatorias")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime fechaHora,

    @NotBlank(message = "El estado es obligatorio")
    String estado,

    @NotNull(message = "El paciente es obligatorio")
    Long pacienteId,

    Long odontologoId,

    @NotBlank(message = "El motivo es obligatorio")
    String motivo
) {}