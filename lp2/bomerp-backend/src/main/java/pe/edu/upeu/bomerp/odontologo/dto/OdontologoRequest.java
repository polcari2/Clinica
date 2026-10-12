package pe.edu.upeu.bomerp.odontologo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OdontologoRequest(
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    String nombre,

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 100, message = "El apellido no puede exceder 100 caracteres")
    String apellido,

    @NotBlank(message = "La colegiatura / COP es obligatoria")
    @Size(max = 20, message = "La colegiatura no puede exceder 20 caracteres")
    String colegiatura,

    @Size(max = 100, message = "La especialidad no puede exceder 100 caracteres")
    String especialidad,

    @Size(max = 20, message = "El teléfono no puede exceder 20 caracteres")
    String telefono,

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    String estado
) {}
