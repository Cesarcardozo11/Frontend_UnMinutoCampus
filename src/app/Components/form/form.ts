import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MateriasService } from '../../Services/materias';

/**
 * Componente de Formulario para registrar una nueva materia.
 * Incorpora SweetAlert2 para el feedback visual al usuario y estado reactivo de carga.
 */
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private fb = inject(FormBuilder);
  private materiasService = inject(MateriasService);
  private router = inject(Router);

  /** Signal para deshabilitar el botón y mostrar estado de procesamiento */
  cargando = signal(false);

  /** Formulario reactivo fuertemente tipado con validaciones integradas */
  materiaForm = this.fb.nonNullable.group({
    nrc: ['', [Validators.required, Validators.maxLength(30)]],
    nombre_materia: ['', [Validators.required, Validators.maxLength(150)]],
    nombre_docente: ['', [Validators.required, Validators.maxLength(150)]],
    correo_docente: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
  });

  guardar(): void {
    if (this.materiaForm.invalid) {
      this.materiaForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos requeridos correctamente.',
      });
      return;
    }

    this.cargando.set(true);

    this.materiasService.crearMateria(this.materiaForm.getRawValue()).subscribe({
      next: (materia) => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'success',
          title: 'Materia registrada',
          text: `La materia "${materia.nombre_materia}" ha sido registrada exitosamente.`,
          timer: 1800,
          showConfirmButton: false,
        }).then(() => this.router.navigate(['/Materias']));
      },
      error: (error: HttpErrorResponse) => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar',
          text: error.error?.data || 'Ocurrió un error al registrar la materia (¿el NRC ya existe o el servidor está apagado?)',
        });
      },
    });
  }
}
