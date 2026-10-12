import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoriaService } from './categoria-service';
import { Categoria } from './categoria.model';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriaService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list categories', () => {
    const mockData: Categoria[] = [{ id: 1, nombre: 'Bebidas' }];
    service.listar().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/categorias');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get category by id', () => {
    const mockData: Categoria = { id: 1, nombre: 'Bebidas' };
    service.obtener(1).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/categorias/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create category', () => {
    const newCat: Categoria = { nombre: 'Snacks' };
    const savedCat: Categoria = { id: 2, nombre: 'Snacks' };
    service.crear(newCat).subscribe((data) => {
      expect(data).toEqual(savedCat);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/categorias');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCat);
    req.flush(savedCat);
  });

  it('should update category', () => {
    const updateCat: Categoria = { nombre: 'Bebidas Calientes' };
    const savedCat: Categoria = { id: 1, nombre: 'Bebidas Calientes' };
    service.actualizar(1, updateCat).subscribe((data) => {
      expect(data).toEqual(savedCat);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/categorias/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateCat);
    req.flush(savedCat);
  });

  it('should delete category', () => {
    service.eliminar(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/categorias/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
