package pe.edu.upeu.bomerp.odontologo.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;
import pe.edu.upeu.bomerp.odontologo.dto.OdontologoRequest;
import pe.edu.upeu.bomerp.odontologo.dto.OdontologoResponse;
import pe.edu.upeu.bomerp.odontologo.entity.Odontologo;
import pe.edu.upeu.bomerp.odontologo.repository.OdontologoRepository;
import pe.edu.upeu.bomerp.odontologo.service.OdontologoService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OdontologoServiceImpl implements OdontologoService {

    private final OdontologoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<OdontologoResponse> findAll() {
        return repository.findAll().stream()
                .map(OdontologoResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OdontologoResponse findById(Long id) {
        return repository.findById(id)
                .map(OdontologoResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Odontólogo no encontrado con id: " + id));
    }

    @Override
    @Transactional
    public OdontologoResponse create(OdontologoRequest request) {
        Odontologo entity = Odontologo.builder()
                .nombre(request.nombre())
                .apellido(request.apellido())
                .colegiatura(request.colegiatura())
                .especialidad(request.especialidad())
                .telefono(request.telefono())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "ACTIVO")
                .build();
        return OdontologoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public OdontologoResponse update(Long id, OdontologoRequest request) {
        Odontologo entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Odontólogo no encontrado con id: " + id));
        entity.setNombre(request.nombre());
        entity.setApellido(request.apellido());
        entity.setColegiatura(request.colegiatura());
        entity.setEspecialidad(request.especialidad());
        entity.setTelefono(request.telefono());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }
        return OdontologoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Odontólogo no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}
