package pe.edu.upeu.bomerp.cita.service;

import pe.edu.upeu.bomerp.cita.dto.CitaRequest;
import pe.edu.upeu.bomerp.cita.dto.CitaResponse;

import java.util.List;

public interface CitaService {
    List<CitaResponse> findAll(Long pacienteId, Long odontologoId);
    CitaResponse findById(Long id);
    CitaResponse create(CitaRequest request);
    CitaResponse update(Long id, CitaRequest request);
    void delete(Long id);
}
