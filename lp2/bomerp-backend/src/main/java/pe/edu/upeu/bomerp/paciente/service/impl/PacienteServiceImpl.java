package pe.edu.upeu.bomerp.paciente.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;
import pe.edu.upeu.bomerp.paciente.dto.PacienteRequest;
import pe.edu.upeu.bomerp.paciente.dto.PacienteResponse;
import pe.edu.upeu.bomerp.paciente.entity.Paciente;
import pe.edu.upeu.bomerp.paciente.repository.PacienteRepository;
import pe.edu.upeu.bomerp.paciente.service.PacienteService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<PacienteResponse> findAll() {
        return repository.findAll().stream()
                .map(PacienteResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PacienteResponse findById(Long id) {
        return repository.findById(id)
                .map(PacienteResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + id));
    }

    @Override
    @Transactional
    public PacienteResponse create(PacienteRequest request) {
        Paciente entity = Paciente.builder()
                .dni(request.dni())
                .nombres(request.nombres())
                .apellidos(request.apellidos())
                .telefono(request.telefono())
                .email(request.email())
                .fechaNacimiento(request.fechaNacimiento())
                .historialClinico(request.historialClinico())
                .build();
        return PacienteResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public PacienteResponse update(Long id, PacienteRequest request) {
        Paciente entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + id));
        entity.setDni(request.dni());
        entity.setNombres(request.nombres());
        entity.setApellidos(request.apellidos());
        entity.setTelefono(request.telefono());
        entity.setEmail(request.email());
        entity.setFechaNacimiento(request.fechaNacimiento());
        entity.setHistorialClinico(request.historialClinico());
        return PacienteResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}
