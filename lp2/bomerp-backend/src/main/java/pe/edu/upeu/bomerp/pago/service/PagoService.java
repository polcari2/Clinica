package pe.edu.upeu.bomerp.pago.service;

import pe.edu.upeu.bomerp.pago.dto.PagoRequest;
import pe.edu.upeu.bomerp.pago.dto.PagoResponse;

import java.util.List;

public interface PagoService {
    List<PagoResponse> findAll(Long metodoPagoId, Long citaId);
    PagoResponse findById(Long id);
    PagoResponse findById(Long id, String usuarioId);
    PagoResponse create(PagoRequest request);
    PagoResponse create(PagoRequest request, String usuarioId);
    PagoResponse update(Long id, PagoRequest request);
    void delete(Long id);
}
