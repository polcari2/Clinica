package pe.edu.upeu.bomerp.procedimiento.service;

import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoRequest;
import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoResponse;

import java.util.List;

public interface ProcedimientoService {
    List<ProcedimientoResponse> findAll(Long especialidadId);
    ProcedimientoResponse findById(Long id);
    ProcedimientoResponse create(ProcedimientoRequest request);
    ProcedimientoResponse update(Long id, ProcedimientoRequest request);
    void delete(Long id);
}
