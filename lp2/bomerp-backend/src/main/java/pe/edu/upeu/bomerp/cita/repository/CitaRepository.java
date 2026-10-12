package pe.edu.upeu.bomerp.cita.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.cita.entity.Cita;

import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByPacienteId(Long pacienteId);
    List<Cita> findByOdontologoId(Long odontologoId);
    List<Cita> findByEstado(String estado);
}
