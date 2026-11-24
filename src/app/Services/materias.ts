import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Modelo de datos que representa una Materia en el cliente Angular.
 */
export interface Materia {
  id?: number;
  nrc: string;
  nombre_materia: string;
  nombre_docente: string;
  correo_docente: string;
}

/**
 * Estructura de respuesta de la API REST del backend.
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/**
 * Servicio encargado de gestionar la comunicación HTTP con la API de materias.
 * Utiliza la variable de entorno `environment.apiUrl` para configurar la dirección del backend.
 */
@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/materias`;

  /**
   * Obtiene la lista completa de materias.
   */
  getMaterias(): Observable<Materia[]> {
    return this.http
      .get<ApiResponse<Materia[]>>(this.url)
      .pipe(map((res) => res.data));
  }

  /**
   * Crea una nueva materia en el sistema.
   */
  crearMateria(materia: Materia): Observable<Materia> {
    return this.http
      .post<ApiResponse<Materia>>(this.url, materia)
      .pipe(map((res) => res.data));
  }

  /**
   * Elimina una materia por su identificador único.
   */
  eliminarMateria(id: number): Observable<unknown> {
    return this.http
      .delete<ApiResponse<unknown>>(`${this.url}/${id}`)
      .pipe(map((res) => res.data));
  }
}
