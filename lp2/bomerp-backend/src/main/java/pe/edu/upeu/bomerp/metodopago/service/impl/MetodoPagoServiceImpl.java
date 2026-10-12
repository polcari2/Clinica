package pe.edu.upeu.bomerp.metodopago.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.bomerp.exception.ResourceNotFoundException;
import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoRequest;
import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoResponse;
import pe.edu.upeu.bomerp.metodopago.entity.MetodoPago;
import pe.edu.upeu.bomerp.metodopago.repository.MetodoPagoRepository;
import pe.edu.upeu.bomerp.metodopago.service.MetodoPagoService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetodoPagoServiceImpl implements MetodoPagoService {

    private final MetodoPagoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<MetodoPagoResponse> findAll() {
        return repository.findAll().stream()
                .map(MetodoPagoResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MetodoPagoResponse findById(Long id) {
        return repository.findById(id)
                .map(MetodoPagoResponse::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado con id: " + id));
    }

    @Override
    @Transactional
    public MetodoPagoResponse create(MetodoPagoRequest request) {
        MetodoPago entity = MetodoPago.builder()
                .nombre(request.nombre())
                .descripcion(request.descripcion())
                .estado(request.estado() != null && !request.estado().isBlank() ? request.estado() : "ACTIVO")
                .build();
        return MetodoPagoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public MetodoPagoResponse update(Long id, MetodoPagoRequest request) {
        MetodoPago entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado con id: " + id));
        entity.setNombre(request.nombre());
        entity.setDescripcion(request.descripcion());
        if (request.estado() != null && !request.estado().isBlank()) {
            entity.setEstado(request.estado());
        }
        return MetodoPagoResponse.fromEntity(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Método de pago no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }
}
