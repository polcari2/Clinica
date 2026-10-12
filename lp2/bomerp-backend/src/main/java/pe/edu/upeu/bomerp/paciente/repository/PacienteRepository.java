package pe.edu.upeu.bomerp.paciente.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.paciente.entity.Paciente;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByDni(String dni);
    Optional<Paciente> findByHistorialClinico(String historialClinico);
}
