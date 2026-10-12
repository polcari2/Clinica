package pe.edu.upeu.bomerp.atencion.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.atencion.dto.AtencionRequest;
import pe.edu.upeu.bomerp.atencion.dto.AtencionResponse;
import pe.edu.upeu.bomerp.atencion.entity.Atencion;
import pe.edu.upeu.bomerp.atencion.repository.AtencionRepository;
import pe.edu.upeu.bomerp.atencion.service.AtencionService;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AtencionServiceImpl implements AtencionService {

    private final AtencionRepository atencionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AtencionResponse> findAll(Long odontologoId, Long citaId) {
        List<Atencion> list;
        if (odontologoId != null && odontologoId > 0) {
            list = atencionRepository.findByOdontologoId(odontologoId);
        } else if (citaId != null && citaId > 0) {
            list = atencionRepository.findByCitaId(citaId);
        } else {
            list = atencionRepository.findAll();
        }
        return list.stream().map(AtencionResponse::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AtencionResponse findById(Long id) {
        return atencionRepository.findById(id)
                .map(AtencionResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Atención no encontrada con id: " + id));
    }

    @Override
    @Transactional
    public AtencionResponse create(AtencionRequest request) {
        Atencion entity = Atencion.builder()
                .citaId(request.citaId())
                .odontologoId(request.odontologoId())
                .diagnostico(request.diagnostico())
                .tratamientoRealizado(request.tratamientoRealizado())
                .observaciones(request.observaciones())
                .fechaAtencion(request.fechaAtencion())
                .build();

        return AtencionResponse.fromEntity(atencionRepository.save(entity));
    }

    @Override
    @Transactional
    public AtencionResponse update(Long id, AtencionRequest request) {
        Atencion entity = atencionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Atención no encontrada con id: " + id));

        entity.setCitaId(request.citaId());
        entity.setOdontologoId(request.odontologoId());
        entity.setDiagnostico(request.diagnostico());
        entity.setTratamientoRealizado(request.tratamientoRealizado());
        entity.setObservaciones(request.observaciones());
        entity.setFechaAtencion(request.fechaAtencion());

        return AtencionResponse.fromEntity(atencionRepository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!atencionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Atención no encontrada con id: " + id);
        }
        atencionRepository.deleteById(id);
    }
}
