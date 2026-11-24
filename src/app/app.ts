import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';

/**
 * Componente Raíz de la Aplicación (Root Component).
 *
 * Actúa como contenedor principal (layout estructural), integrando:
 * - El componente de navegación (`<app-menu>`).
 * - El contenedor de vistas enrutadas (`<router-outlet>`), donde se cargan dinámicamente
 *   los componentes según la ruta activa.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
