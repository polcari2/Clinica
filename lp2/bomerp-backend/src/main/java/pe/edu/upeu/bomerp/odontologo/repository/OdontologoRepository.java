package pe.edu.upeu.bomerp.odontologo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.odontologo.entity.Odontologo;

import java.util.List;
import java.util.Optional;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {
    Optional<Odontologo> findByColegiatura(String colegiatura);
    List<Odontologo> findByEstado(String estado);
}
