package pe.edu.upeu.bomerp.paciente.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PacienteRequest(
    @NotBlank(message = "El DNI es obligatorio")
    @Size(max = 20, message = "El DNI no puede exceder 20 caracteres")
    String dni,

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 100, message = "Los nombres no pueden exceder 100 caracteres")
    String nombres,

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 100, message = "Los apellidos no pueden exceder 100 caracteres")
    String apellidos,

    @Size(max = 20, message = "El teléfono no puede exceder 20 caracteres")
    String telefono,

    @Email(message = "El formato de email es inválido")
    @Size(max = 120, message = "El email no puede exceder 120 caracteres")
    String email,

    LocalDate fechaNacimiento,

    @Size(max = 50, message = "El código de historial clínico no puede exceder 50 caracteres")
    String historialClinico
) {}
