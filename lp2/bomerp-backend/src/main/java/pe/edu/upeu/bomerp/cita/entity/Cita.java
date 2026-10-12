package pe.edu.upeu.bomerp.cita.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "CITA", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PACIENTE_ID")
    private Long pacienteId;

    @Column(name = "ODONTOLOGO_ID")
    private Long odontologoId;

    @Column(name = "FECHA_HORA", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "MOTIVO", length = 255)
    private String motivo;

    @Column(name = "ESTADO", length = 30)
    private String estado;
}