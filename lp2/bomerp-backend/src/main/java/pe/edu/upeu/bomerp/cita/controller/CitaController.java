package pe.edu.upeu.bomerp.cita.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.cita.dto.CitaRequest;
import pe.edu.upeu.bomerp.cita.dto.CitaResponse;
import pe.edu.upeu.bomerp.cita.service.CitaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/citas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CitaController {

    private final CitaService service;

    @GetMapping
    public ResponseEntity<List<CitaResponse>> findAll(
            @RequestParam(required = false) Long pacienteId,
            @RequestParam(required = false) Long odontologoId) {
        return ResponseEntity.ok(service.findAll(pacienteId, odontologoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<CitaResponse> create(@Valid @RequestBody CitaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitaResponse> update(@PathVariable Long id, @Valid @RequestBody CitaRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
