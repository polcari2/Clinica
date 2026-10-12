import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EspecialidadForm } from './especialidad-form';

describe('EspecialidadForm', () => {
  let component: EspecialidadForm;
  let fixture: ComponentFixture<EspecialidadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadForm],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
