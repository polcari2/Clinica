package pe.edu.upeu.bomerp.paciente.service;

import pe.edu.upeu.bomerp.paciente.dto.PacienteRequest;
import pe.edu.upeu.bomerp.paciente.dto.PacienteResponse;

import java.util.List;

public interface PacienteService {
    List<PacienteResponse> findAll();
    PacienteResponse findById(Long id);
    PacienteResponse create(PacienteRequest request);
    PacienteResponse update(Long id, PacienteRequest request);
    void delete(Long id);
}
