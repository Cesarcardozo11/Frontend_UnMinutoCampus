import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriasService } from '../../Services/materias';

// Formulario para registrar una materia
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

  // Los campos del formulario. Validators.required = el campo es obligatorio
  materiaForm = this.fb.nonNullable.group({
    nrc: ['', Validators.required],
    nombre_materia: ['', Validators.required],
    nombre_docente: ['', Validators.required],
    correo_docente: ['', [Validators.required, Validators.email]],
  });

  guardar() {
    // Si falta algún campo, no se envía
    if (this.materiaForm.invalid) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    // Envía la materia al backend
    this.materiasService.crearMateria(this.materiaForm.getRawValue()).subscribe({
      next: () => {
        alert('Materia registrada');
        this.router.navigate(['/Materias']); // vuelve a la lista
      },
      error: () => {
        alert('No se pudo registrar la materia (¿el NRC ya existe?)');
      },
    });
  }
}
