package pe.edu.upeu.bomerp.metodopago.service;

import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoRequest;
import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoResponse;

import java.util.List;

public interface MetodoPagoService {
    List<MetodoPagoResponse> findAll();
    MetodoPagoResponse findById(Long id);
    MetodoPagoResponse create(MetodoPagoRequest request);
    MetodoPagoResponse update(Long id, MetodoPagoRequest request);
    void delete(Long id);
}
