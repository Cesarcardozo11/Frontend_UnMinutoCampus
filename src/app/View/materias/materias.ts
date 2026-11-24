import { Component, inject, signal } from '@angular/core';
import { MateriasService, Materia } from '../../Services/materias';

// Página con la lista de materias
@Component({
  selector: 'app-materias',
  imports: [],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class Materias {
  private materiasService = inject(MateriasService);

  // signal = variable que, cuando cambia, actualiza la tabla sola
  materias = signal<Materia[]>([]);

  // El constructor se ejecuta al abrir la página
  constructor() {
    this.cargarMaterias();
  }

  // Pide las materias al backend y las guarda en el signal
  cargarMaterias() {
    this.materiasService.getMaterias().subscribe((data) => {
      this.materias.set(data);
    });
  }

  // Elimina una materia y vuelve a cargar la lista
  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta materia?')) {
      this.materiasService.eliminarMateria(id).subscribe(() => {
        this.cargarMaterias();
      });
    }
  }
}
