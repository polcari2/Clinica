package pe.edu.upeu.bomerp.procedimiento.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "PROCEDIMIENTOS", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Procedimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 150)
    @Column(name = "NOMBRE", length = 150, nullable = false)
    private String nombre;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "PRECIO_BASE", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioBase;

    @NotNull
    @Column(name = "ESPECIALIDAD_ID", nullable = false)
    private Long especialidadId;

    @Size(max = 20)
    @Column(name = "ESTADO", length = 20, nullable = false)
    @Builder.Default
    private String estado = "ACTIVO";
}
