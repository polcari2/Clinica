package pe.edu.upeu.bomerp.especialidad.dto;

import pe.edu.upeu.bomerp.especialidad.entity.Especialidad;

public record EspecialidadResponse(
    Long id,
    String nombre,
    String descripcion,
    String estado
) {
    public static EspecialidadResponse fromEntity(Especialidad e) {
        return new EspecialidadResponse(
            e.getId(),
            e.getNombre(),
            e.getDescripcion(),
            e.getEstado()
        );
    }
}
