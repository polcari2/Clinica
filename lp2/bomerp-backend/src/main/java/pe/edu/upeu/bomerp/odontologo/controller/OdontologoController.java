package pe.edu.upeu.bomerp.odontologo.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.odontologo.dto.OdontologoRequest;
import pe.edu.upeu.bomerp.odontologo.dto.OdontologoResponse;
import pe.edu.upeu.bomerp.odontologo.service.OdontologoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/odontologos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OdontologoController {

    private final OdontologoService service;

    @GetMapping
    public ResponseEntity<List<OdontologoResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<OdontologoResponse> create(@Valid @RequestBody OdontologoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OdontologoResponse> update(@PathVariable Long id, @Valid @RequestBody OdontologoRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
