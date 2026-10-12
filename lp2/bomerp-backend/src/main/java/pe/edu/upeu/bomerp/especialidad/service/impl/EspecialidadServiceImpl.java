package pe.edu.upeu.bomerp.especialidad.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadRequest;
import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadResponse;
import pe.edu.upeu.bomerp.especialidad.entity.Especialidad;
import pe.edu.upeu.bomerp.especialidad.repository.EspecialidadRepository;
import pe.edu.upeu.bomerp.especialidad.service.EspecialidadService;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EspecialidadServiceImpl implements EspecialidadService {

    private final EspecialidadRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<EspecialidadResponse> findAll() {
        return repository.findAll().stream()
                .map(EspecialidadResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EspecialidadResponse findById(Long id) {
        return repository.findById(id)
                .map(EspecialidadResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Especialidad no encontrada con id: " + id));
    }

    @Override
    @Transactional
    public EspecialidadResponse create(EspecialidadRequest request) {
        Especialidad entity = Especialidad.builder()
                .nombre(request.nombre())
                .descripcion(request.descripcion())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "ACTIVO")
                .build();
        return EspecialidadResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public EspecialidadResponse update(Long id, EspecialidadRequest request) {
        Especialidad entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Especialidad no encontrada con id: " + id));
        entity.setNombre(request.nombre());
        entity.setDescripcion(request.descripcion());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }
        return EspecialidadResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Especialidad no encontrada con id: " + id);
        }
        repository.deleteById(id);
    }
}
