package pe.edu.upeu.bomerp.odontologo.service;

import pe.edu.upeu.bomerp.odontologo.dto.OdontologoRequest;
import pe.edu.upeu.bomerp.odontologo.dto.OdontologoResponse;

import java.util.List;

public interface OdontologoService {
    List<OdontologoResponse> findAll();
    OdontologoResponse findById(Long id);
    OdontologoResponse create(OdontologoRequest request);
    OdontologoResponse update(Long id, OdontologoRequest request);
    void delete(Long id);
}
