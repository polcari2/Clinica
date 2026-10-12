package pe.edu.upeu.bomerp.atencion.service;

import pe.edu.upeu.bomerp.atencion.dto.AtencionRequest;
import pe.edu.upeu.bomerp.atencion.dto.AtencionResponse;

import java.util.List;

public interface AtencionService {
    List<AtencionResponse> findAll(Long odontologoId, Long citaId);
    AtencionResponse findById(Long id);
    AtencionResponse create(AtencionRequest request);
    AtencionResponse update(Long id, AtencionRequest request);
    void delete(Long id);
}
