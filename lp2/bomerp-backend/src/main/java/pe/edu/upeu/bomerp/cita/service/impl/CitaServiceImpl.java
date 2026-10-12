package pe.edu.upeu.bomerp.cita.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.cita.dto.CitaRequest;
import pe.edu.upeu.bomerp.cita.dto.CitaResponse;
import pe.edu.upeu.bomerp.cita.entity.Cita;
import pe.edu.upeu.bomerp.cita.repository.CitaRepository;
import pe.edu.upeu.bomerp.cita.service.CitaService;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> findAll(Long pacienteId, Long odontologoId) {
        List<Cita> list;
        if (pacienteId != null && pacienteId > 0) {
            list = citaRepository.findByPacienteId(pacienteId);
        } else if (odontologoId != null && odontologoId > 0) {
            list = citaRepository.findByOdontologoId(odontologoId);
        } else {
            list = citaRepository.findAll();
        }
        return list.stream().map(CitaResponse::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CitaResponse findById(Long id) {
        return citaRepository.findById(id)
                .map(CitaResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con id: " + id));
    }

    @Override
    @Transactional
    public CitaResponse create(CitaRequest request) {
        Cita entity = Cita.builder()
                .pacienteId(request.pacienteId())
                .odontologoId(request.odontologoId())
                .fechaHora(request.fechaHora())
                .motivo(request.motivo())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "PENDIENTE")
                .build();

        return CitaResponse.fromEntity(citaRepository.save(entity));
    }

    @Override
    @Transactional
    public CitaResponse update(Long id, CitaRequest request) {
        Cita entity = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con id: " + id));

        entity.setPacienteId(request.pacienteId());
        entity.setOdontologoId(request.odontologoId());
        entity.setFechaHora(request.fechaHora());
        entity.setMotivo(request.motivo());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }

        return CitaResponse.fromEntity(citaRepository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!citaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cita no encontrada con id: " + id);
        }
        citaRepository.deleteById(id);
    }
}
