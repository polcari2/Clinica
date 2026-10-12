package pe.edu.upeu.bomerp.especialidad.service;

import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadRequest;
import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadResponse;

import java.util.List;

public interface EspecialidadService {
    List<EspecialidadResponse> findAll();
    EspecialidadResponse findById(Long id);
    EspecialidadResponse create(EspecialidadRequest request);
    EspecialidadResponse update(Long id, EspecialidadRequest request);
    void delete(Long id);
}
