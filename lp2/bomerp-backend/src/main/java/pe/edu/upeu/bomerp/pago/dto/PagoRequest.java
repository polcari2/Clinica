package pe.edu.upeu.bomerp.pago.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PagoRequest(
    @NotNull(message = "La fecha de pago es obligatoria")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime fechaPago,

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a cero")
    BigDecimal monto,

    @Size(max = 50, message = "El número de operación no puede exceder 50 caracteres")
    String numeroOperacion,

    @NotNull(message = "El ID del método de pago es obligatorio")
    Long metodoPagoId,

    Long citaId,

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    String estado
) {}
