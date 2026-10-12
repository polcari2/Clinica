package pe.edu.upeu.bomerp.metodopago.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoRequest;
import pe.edu.upeu.bomerp.metodopago.dto.MetodoPagoResponse;
import pe.edu.upeu.bomerp.metodopago.service.MetodoPagoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metodos-pago")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MetodoPagoController {

    private final MetodoPagoService service;

    @GetMapping
    public ResponseEntity<List<MetodoPagoResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetodoPagoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<MetodoPagoResponse> create(@Valid @RequestBody MetodoPagoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetodoPagoResponse> update(@PathVariable Long id, @Valid @RequestBody MetodoPagoRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
