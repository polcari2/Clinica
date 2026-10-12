package pe.edu.upeu.bomerp.paciente.dto;

import pe.edu.upeu.bomerp.paciente.entity.Paciente;

import java.time.LocalDate;

public record PacienteResponse(
    Long id,
    String dni,
    String nombres,
    String apellidos,
    String telefono,
    String email,
    LocalDate fechaNacimiento,
    String historialClinico
) {
    public static PacienteResponse fromEntity(Paciente p) {
        return new PacienteResponse(
            p.getId(),
            p.getDni(),
            p.getNombres(),
            p.getApellidos(),
            p.getTelefono(),
            p.getEmail(),
            p.getFechaNacimiento(),
            p.getHistorialClinico()
        );
    }
}
