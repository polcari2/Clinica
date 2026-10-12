package pe.edu.upeu.bomerp.procedimiento.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProcedimientoRequest(
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    String nombre,

    @NotNull(message = "El precio base es obligatorio")
    @DecimalMin(value = "0.0", inclusive = true, message = "El precio base no puede ser negativo")
    BigDecimal precioBase,

    @NotNull(message = "El ID de la especialidad es obligatorio")
    Long especialidadId,

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    String estado
) {}
