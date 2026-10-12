package pe.edu.upeu.bomerp.pago.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.pago.dto.PagoRequest;
import pe.edu.upeu.bomerp.pago.dto.PagoResponse;
import pe.edu.upeu.bomerp.pago.service.PagoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PagoController {

    private final PagoService service;

    @GetMapping
    public ResponseEntity<List<PagoResponse>> findAll(
            @RequestParam(required = false) Long metodoPagoId,
            @RequestParam(required = false) Long citaId) {
        return ResponseEntity.ok(service.findAll(metodoPagoId, citaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<PagoResponse> create(@Valid @RequestBody PagoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagoResponse> update(@PathVariable Long id, @Valid @RequestBody PagoRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
