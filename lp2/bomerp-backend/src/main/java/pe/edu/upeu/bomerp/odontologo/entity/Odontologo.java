package pe.edu.upeu.bomerp.odontologo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "ODONTOLOGOS", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Odontologo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @NotBlank
    @Size(max = 100)
    @Column(name = "APELLIDO", length = 100, nullable = false)
    private String apellido;

    @NotBlank
    @Size(max = 20)
    @Column(name = "COLEGIATURA", length = 20, nullable = false, unique = true)
    private String colegiatura;

    @Size(max = 100)
    @Column(name = "ESPECIALIDAD", length = 100)
    private String especialidad;

    @Size(max = 20)
    @Column(name = "TELEFONO", length = 20)
    private String telefono;

    @NotBlank
    @Size(max = 20)
    @Column(name = "ESTADO", length = 20, nullable = false)
    @Builder.Default
    private String estado = "ACTIVO";
}
