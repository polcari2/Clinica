import { TestBed } from '@angular/core/testing';
import { ApiService } from './api-service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build url with leading slash', () => {
    expect(service.buildUrl('/api/v1/categorias')).toBe('http://localhost:8080/api/v1/categorias');
  });

  it('should build url without leading slash', () => {
    expect(service.buildUrl('api/v1/categorias')).toBe('http://localhost:8080/api/v1/categorias');
  });
});
