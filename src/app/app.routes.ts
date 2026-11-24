import { Routes } from '@angular/router';
import { Materias } from './View/materias/materias';
import { Form } from './Components/form/form';

// Qué página se muestra en cada dirección
export const routes: Routes = [
  { path: '', redirectTo: '/Materias', pathMatch: 'full' }, // al entrar, ir a la lista
  { path: 'Materias', component: Materias }, // lista de materias
  { path: 'form', component: Form }, // registrar materia
];
