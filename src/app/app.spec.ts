import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  it('muestra el menú con Materias y Registrar materia', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const texto = (fixture.nativeElement as HTMLElement).querySelector('.menu')?.textContent;
    expect(texto).toContain('Materias');
    expect(texto).toContain('Registrar materia');
  });
});
