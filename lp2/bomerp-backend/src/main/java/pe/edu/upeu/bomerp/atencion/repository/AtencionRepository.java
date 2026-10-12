package pe.edu.upeu.bomerp.atencion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.atencion.entity.Atencion;

import java.util.List;

@Repository
public interface AtencionRepository extends JpaRepository<Atencion, Long> {
    List<Atencion> findByOdontologoId(Long odontologoId);
    List<Atencion> findByCitaId(Long citaId);
}
