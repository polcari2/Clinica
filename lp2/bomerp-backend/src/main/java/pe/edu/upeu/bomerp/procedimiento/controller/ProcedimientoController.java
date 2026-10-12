package pe.edu.upeu.bomerp.procedimiento.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoRequest;
import pe.edu.upeu.bomerp.procedimiento.dto.ProcedimientoResponse;
import pe.edu.upeu.bomerp.procedimiento.service.ProcedimientoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/procedimientos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProcedimientoController {

    private final ProcedimientoService service;

    @GetMapping
    public ResponseEntity<List<ProcedimientoResponse>> findAll(@RequestParam(required = false) Long especialidadId) {
        return ResponseEntity.ok(service.findAll(especialidadId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcedimientoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProcedimientoResponse> create(@Valid @RequestBody ProcedimientoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProcedimientoResponse> update(@PathVariable Long id, @Valid @RequestBody ProcedimientoRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
