import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';

// Componente principal: muestra el menú y, a su lado, la página abierta
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
