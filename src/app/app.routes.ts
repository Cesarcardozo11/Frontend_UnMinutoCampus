import { Routes } from '@angular/router';
import { Materias } from './View/materias/materias';
import { Form } from './Components/form/form';

/**
 * Configuración de la tabla de enrutamiento de la aplicación (Angular Router).
 *
 * Define la correspondencia entre los segmentos de URL en el navegador y los componentes a renderizar:
 * - `''` (Ruta raíz): Redirige por defecto a `/Materias`.
 * - `/Materias`: Despliega la tabla con el listado de materias académicas.
 * - `/form`: Despliega el formulario reactivo para la creación de materias.
 */
export const routes: Routes = [
  { path: '', redirectTo: '/Materias', pathMatch: 'full' },
  { path: 'Materias', component: Materias },
  { path: 'form', component: Form },
];
