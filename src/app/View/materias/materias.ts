import { Component, inject, signal } from '@angular/core';
import { Tabla } from '../../Components/tabla/tabla';
import { MateriasService, Materia } from '../../Services/materias';
import Swal from 'sweetalert2';

/**
 * Componente de Vista: Listado de Materias.
 * Utiliza el componente hijo reutilizable `<app-tabla>` para la visualización de datos,
 * al igual que en la arquitectura de Lulosa.
 */
@Component({
  selector: 'app-materias',
  imports: [Tabla],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class Materias {
  private materiasService = inject(MateriasService);

  /** Signal reactivo con la lista de materias */
  materias = signal<Materia[]>([]);

  constructor() {
    this.cargarMaterias();
  }

  /**
   * Recupera las materias registradas desde el backend y actualiza la signal.
   */
  cargarMaterias(): void {
    this.materiasService.getMaterias().subscribe({
      next: (data) => {
        this.materias.set(data);
      },
      error: (err) => {
        console.error('Error al recuperar las materias:', err);
      },
    });
  }

  /**
   * Muestra un diálogo de confirmación interactivo con SweetAlert2
   * antes de proceder con la eliminación de la materia seleccionada.
   *
   * @param id - Identificador numérico de la materia
   */
  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta materia será eliminada permanentemente del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b3261e',
      cancelButtonColor: '#5b6675',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.materiasService.eliminarMateria(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada',
              text: 'La materia fue eliminada con éxito.',
              icon: 'success',
              timer: 1800,
              showConfirmButton: false,
            });
            this.cargarMaterias();
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la materia seleccionada.',
              icon: 'error',
            });
            console.error(err);
          },
        });
      }
    });
  }
}
