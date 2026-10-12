package pe.edu.upeu.bomerp.odontologo.dto;

import pe.edu.upeu.bomerp.odontologo.entity.Odontologo;

public record OdontologoResponse(
    Long id,
    String nombre,
    String apellido,
    String colegiatura,
    String especialidad,
    String telefono,
    String estado
) {
    public static OdontologoResponse fromEntity(Odontologo o) {
        return new OdontologoResponse(
            o.getId(),
            o.getNombre(),
            o.getApellido(),
            o.getColegiatura(),
            o.getEspecialidad(),
            o.getTelefono(),
            o.getEstado()
        );
    }
}
