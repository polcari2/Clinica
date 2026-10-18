package pe.edu.upeu.bomerp.pago.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.exception.AccesoDenegadoException;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;
import pe.edu.upeu.bomerp.pago.dto.PagoRequest;
import pe.edu.upeu.bomerp.pago.dto.PagoResponse;
import pe.edu.upeu.bomerp.pago.entity.Pago;
import pe.edu.upeu.bomerp.pago.repository.PagoRepository;
import pe.edu.upeu.bomerp.pago.service.PagoService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<PagoResponse> findAll(Long metodoPagoId, Long citaId) {
        List<Pago> list;
        if (metodoPagoId != null && metodoPagoId > 0) {
            list = repository.findByMetodoPagoId(metodoPagoId);
        } else if (citaId != null && citaId > 0) {
            list = repository.findByCitaId(citaId);
        } else {
            list = repository.findAll();
        }
        return list.stream().map(PagoResponse::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PagoResponse findById(Long id) {
        return findById(id, null);
    }

    @Override
    @Transactional(readOnly = true)
    public PagoResponse findById(Long id, String usuarioId) {
        Pago pago = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con id: " + id));
        if (usuarioId != null && pago.getUsuarioId() != null && !usuarioId.equals(pago.getUsuarioId())) {
            throw new AccesoDenegadoException("No tienes acceso a este pago");
        }
        return PagoResponse.fromEntity(pago);
    }

    @Override
    @Transactional
    public PagoResponse create(PagoRequest request) {
        return create(request, null);
    }

    @Override
    @Transactional
    public PagoResponse create(PagoRequest request, String usuarioId) {
        Pago entity = Pago.builder()
                .fechaPago(request.fechaPago())
                .monto(request.monto())
                .numeroOperacion(request.numeroOperacion())
                .metodoPagoId(request.metodoPagoId())
                .citaId(request.citaId())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "COMPLETADO")
                .usuarioId(usuarioId)
                .build();
        return PagoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public PagoResponse update(Long id, PagoRequest request) {
        Pago entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con id: " + id));
        entity.setFechaPago(request.fechaPago());
        entity.setMonto(request.monto());
        entity.setNumeroOperacion(request.numeroOperacion());
        entity.setMetodoPagoId(request.metodoPagoId());
        entity.setCitaId(request.citaId());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }
        return PagoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Pago no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}
