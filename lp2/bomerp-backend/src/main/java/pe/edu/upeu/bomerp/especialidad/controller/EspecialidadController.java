package pe.edu.upeu.bomerp.especialidad.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadRequest;
import pe.edu.upeu.bomerp.especialidad.dto.EspecialidadResponse;
import pe.edu.upeu.bomerp.especialidad.service.EspecialidadService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/especialidades")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EspecialidadController {

    private final EspecialidadService service;

    @GetMapping
    public ResponseEntity<List<EspecialidadResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EspecialidadResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<EspecialidadResponse> create(@Valid @RequestBody EspecialidadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EspecialidadResponse> update(@PathVariable Long id, @Valid @RequestBody EspecialidadRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
