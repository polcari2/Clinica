package pe.edu.upeu.bomerp.atencion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ATENCIONES", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Atencion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull
    @Column(name = "CITA_ID", nullable = false)
    private Long citaId;

    @NotNull
    @Column(name = "ODONTOLOGO_ID", nullable = false)
    private Long odontologoId;

    @NotBlank
    @Size(max = 250)
    @Column(name = "DIAGNOSTICO", length = 250, nullable = false)
    private String diagnostico;

    @NotBlank
    @Size(max = 500)
    @Column(name = "TRATAMIENTO_REALIZADO", length = 500, nullable = false)
    private String tratamientoRealizado;

    @Size(max = 500)
    @Column(name = "OBSERVACIONES", length = 500)
    private String observaciones;

    @NotNull
    @Column(name = "FECHA_ATENCION", nullable = false)
    private LocalDateTime fechaAtencion;
}
