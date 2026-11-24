import { Component, computed, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import titulos from './titulos.json';

/**
 * Representa la metadata de una columna en la tabla.
 */
export interface Columna {
  /** Nombre del campo en el objeto JavaScript */
  campo: string;
  /** Título descriptivo a mostrar en la cabecera */
  titulo: string;
}

/**
 * Componente de Tabla Reutilizable basado en Angular Material (`MatTableModule`).
 *
 * Mismo patrón arquitectónico de Lulosa:
 * - Recibe cualquier arreglo en `[data]` como `input()`.
 * - Calcula automáticamente las columnas con `computed()` basándose en las propiedades
 *   del objeto y las etiquetas definidas en `titulos.json`.
 * - Admite emisión de eventos de eliminación (`eliminar`).
 */
@Component({
  selector: 'app-tabla',
  imports: [MatTableModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla {
  /** Lista de registros que provienen de la base de datos o servicio */
  readonly data = input<any[]>([]);

  /** Determina si se renderiza la columna de acciones (Eliminar) */
  readonly permitirEliminar = input<boolean>(true);

  /** Emite el identificador de la fila cuando el usuario pulsa Eliminar */
  readonly eliminar = output<number>();

  /**
   * Columnas calculadas a partir de las propiedades del primer registro y `titulos.json`.
   */
  readonly columnas = computed<Columna[]>(() => {
    const primeraFila = this.data()[0];
    if (!primeraFila) {
      return [];
    }
    const nombres: Record<string, string> = titulos;
    return Object.keys(primeraFila).map((key) => ({
      campo: key,
      titulo: nombres[key] || key,
    }));
  });

  /**
   * Arreglo con los nombres de las columnas que `mat-table` debe proyectar en el DOM.
   */
  readonly displayedColumns = computed(() => {
    const cols = this.columnas().map((c) => c.campo);
    if (this.permitirEliminar() && !cols.includes('acciones')) {
      cols.push('acciones');
    }
    return cols;
  });
}
