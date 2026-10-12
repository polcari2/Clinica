package pe.edu.upeu.bomerp.procedimiento.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;
import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoRequest;
import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoResponse;
import pe.edu.upeu.bomerp.procedimiento.entity.Procedimiento;
import pe.edu.upeu.bomerp.procedimiento.repository.ProcedimientoRepository;
import pe.edu.upeu.bomerp.procedimiento.service.ProcedimientoService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcedimientoServiceImpl implements ProcedimientoService {

    private final ProcedimientoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<ProcedimientoResponse> findAll(Long especialidadId) {
        List<Procedimiento> list = (especialidadId != null && especialidadId > 0)
                ? repository.findByEspecialidadId(especialidadId)
                : repository.findAll();
        return list.stream().map(ProcedimientoResponse::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProcedimientoResponse findById(Long id) {
        return repository.findById(id)
                .map(ProcedimientoResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Procedimiento no encontrado con id: " + id));
    }

    @Override
    @Transactional
    public ProcedimientoResponse create(ProcedimientoRequest request) {
        Procedimiento entity = Procedimiento.builder()
                .nombre(request.nombre())
                .precioBase(request.precioBase())
                .especialidadId(request.especialidadId())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "ACTIVO")
                .build();
        return ProcedimientoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public ProcedimientoResponse update(Long id, ProcedimientoRequest request) {
        Procedimiento entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Procedimiento no encontrado con id: " + id));
        entity.setNombre(request.nombre());
        entity.setPrecioBase(request.precioBase());
        entity.setEspecialidadId(request.especialidadId());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }
        return ProcedimientoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Procedimiento no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}
