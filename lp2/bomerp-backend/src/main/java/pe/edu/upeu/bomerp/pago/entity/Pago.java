package pe.edu.upeu.bomerp.pago.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "PAGOS", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull
    @Column(name = "FECHA_PAGO", nullable = false)
    private LocalDateTime fechaPago;

    @NotNull
    @DecimalMin(value = "0.01")
    @Column(name = "MONTO", precision = 10, scale = 2, nullable = false)
    private BigDecimal monto;

    @Size(max = 50)
    @Column(name = "NUMERO_OPERACION", length = 50)
    private String numeroOperacion;

    @NotNull
    @Column(name = "METODO_PAGO_ID", nullable = false)
    private Long metodoPagoId;

    @Column(name = "CITA_ID")
    private Long citaId;

    @Size(max = 20)
    @Column(name = "ESTADO", length = 20, nullable = false)
    @Builder.Default
    private String estado = "COMPLETADO";

    @Column(name = "USUARIO_ID", length = 36)
    private String usuarioId;
}
