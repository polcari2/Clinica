package pe.edu.upeu.bomerp.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.bomerp.pago.entity.Pago;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByMetodoPagoId(Long metodoPagoId);
    List<Pago> findByCitaId(Long citaId);
    List<Pago> findByEstado(String estado);
}
