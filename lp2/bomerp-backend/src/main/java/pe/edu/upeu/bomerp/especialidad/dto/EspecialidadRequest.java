package pe.edu.upeu.bomerp.especialidad.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EspecialidadRequest(
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    String nombre,

    @Size(max = 250, message = "La descripción no puede exceder 250 caracteres")
    String descripcion,

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    String estado
) {}
