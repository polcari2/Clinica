package pe.edu.upeu.bomerp.pago.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.bomerp.pago.dto.PagoRequest;
import pe.edu.upeu.bomerp.pago.dto.PagoResponse;
import pe.edu.upeu.bomerp.pago.service.PagoService;

import java.util.Collection;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<PagoResponse> findById(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        String usuarioId = (jwt != null && esVendedor(jwt)) ? jwt.getSubject() : null;
        return ResponseEntity.ok(service.findById(id, usuarioId));
    }

    @PostMapping
    public ResponseEntity<PagoResponse> create(@Valid @RequestBody PagoRequest request, @AuthenticationPrincipal Jwt jwt) {
        String usuarioId = jwt != null ? jwt.getSubject() : null;
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request, usuarioId));
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

    private boolean esVendedor(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        Object roles = realmAccess == null ? null : realmAccess.get("roles");
        if (roles instanceof Collection<?> lista) {
            return lista.contains("VENDEDOR") && !lista.contains("ADMIN") && !lista.contains("SUPERVISOR");
        }
        return false;
    }
}
