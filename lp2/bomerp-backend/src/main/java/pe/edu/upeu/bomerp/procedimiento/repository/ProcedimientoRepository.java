package pe.edu.upeu.bomerp.procedimiento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.procedimiento.entity.Procedimiento;

import java.util.List;

@Repository
public interface ProcedimientoRepository extends JpaRepository<Procedimiento, Long> {
    List<Procedimiento> findByEspecialidadId(Long especialidadId);
    List<Procedimiento> findByEstado(String estado);
}
