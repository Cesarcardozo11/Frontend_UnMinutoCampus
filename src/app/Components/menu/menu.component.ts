import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Menú lateral con los botones para cambiar de página
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
