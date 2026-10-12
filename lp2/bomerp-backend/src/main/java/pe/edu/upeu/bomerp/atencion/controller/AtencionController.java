package pe.edu.upeu.bomerp.atencion.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.atencion.dto.AtencionRequest;
import pe.edu.upeu.bomerp.atencion.dto.AtencionResponse;
import pe.edu.upeu.bomerp.atencion.service.AtencionService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/atenciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AtencionController {

    private final AtencionService service;

    @GetMapping
    public ResponseEntity<List<AtencionResponse>> findAll(
            @RequestParam(required = false) Long odontologoId,
            @RequestParam(required = false) Long citaId) {
        return ResponseEntity.ok(service.findAll(odontologoId, citaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtencionResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<AtencionResponse> create(@Valid @RequestBody AtencionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AtencionResponse> update(@PathVariable Long id, @Valid @RequestBody AtencionRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
