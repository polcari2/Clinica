import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EspecialidadService } from './especialidad-service';
import { Especialidad } from './especialidad.model';

describe('EspecialidadService', () => {
  let service: EspecialidadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EspecialidadService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EspecialidadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list especialidades', () => {
    const mockData: Especialidad[] = [{ id: 1, nombre: 'Ortodoncia' }];
    service.listar().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/especialidades');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get especialidad by id', () => {
    const mockData: Especialidad = { id: 1, nombre: 'Ortodoncia' };
    service.obtener(1).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/especialidades/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create especialidad', () => {
    const newEsp: Especialidad = { nombre: 'Endodoncia' };
    const savedEsp: Especialidad = { id: 2, nombre: 'Endodoncia' };
    service.crear(newEsp).subscribe((data) => {
      expect(data).toEqual(savedEsp);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/especialidades');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEsp);
    req.flush(savedEsp);
  });

  it('should update especialidad', () => {
    const updateEsp: Especialidad = { nombre: 'Periodoncia' };
    const savedEsp: Especialidad = { id: 1, nombre: 'Periodoncia' };
    service.actualizar(1, updateEsp).subscribe((data) => {
      expect(data).toEqual(savedEsp);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/especialidades/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateEsp);
    req.flush(savedEsp);
  });

  it('should delete especialidad', () => {
    service.eliminar(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/especialidades/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
