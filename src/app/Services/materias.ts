import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Forma de una materia (igual a las columnas de la tabla en la base de datos)
export interface Materia {
  id?: number;
  nrc: string;
  nombre_materia: string;
  nombre_docente: string;
  correo_docente: string;
}

// Servicio: aquí están todas las llamadas al backend de materias
@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private http = inject(HttpClient);
  // Dirección del backend publicado en Railway.
  // Para probar en tu computador cámbiala por: 'http://localhost:3001/api/v1/materias'
  private url = 'https://backendunminutocampus-production.up.railway.app/api/v1/materias';

  // Traer todas las materias.
  // El backend responde { success, data } y con map nos quedamos solo con data
  getMaterias(): Observable<Materia[]> {
    return this.http.get<any>(this.url).pipe(map((res) => res.data));
  }

  // Crear una materia nueva
  crearMateria(materia: Materia): Observable<Materia> {
    return this.http.post<any>(this.url, materia).pipe(map((res) => res.data));
  }

  // Eliminar una materia por su id
  eliminarMateria(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id).pipe(map((res) => res.data));
  }
}
