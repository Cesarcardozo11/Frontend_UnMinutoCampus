import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente de Navegación Lateral (Menú).
 *
 * Proporciona los enlaces de acceso directo a las distintas secciones de la aplicación:
 * - Listado de Materias (`/Materias`)
 * - Formulario de Registro (`/form`)
 *
 * Utiliza directivas `RouterLink` para la navegación interna sin recargar la página
 * y `RouterLinkActive` para resaltar el elemento del menú actualmente seleccionado.
 */
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
