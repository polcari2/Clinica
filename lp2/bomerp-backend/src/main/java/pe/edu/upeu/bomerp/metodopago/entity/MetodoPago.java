package pe.edu.upeu.bomerp.metodopago.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "METODOS_PAGO", schema = "BOMERP_APP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "NOMBRE", length = 100, nullable = false, unique = true)
    private String nombre;

    @Size(max = 250)
    @Column(name = "DESCRIPCION", length = 250)
    private String descripcion;

    @Size(max = 20)
    @Column(name = "ESTADO", length = 20, nullable = false)
    @Builder.Default
    private String estado = "ACTIVO";
}
