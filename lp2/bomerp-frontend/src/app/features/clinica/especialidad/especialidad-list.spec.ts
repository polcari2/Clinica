import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EspecialidadList } from './especialidad-list';

describe('EspecialidadList', () => {
  let component: EspecialidadList;
  let fixture: ComponentFixture<EspecialidadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
