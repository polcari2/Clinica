import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoriaList } from './categoria-list';

describe('CategoriaList', () => {
  let component: CategoriaList;
  let fixture: ComponentFixture<CategoriaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
