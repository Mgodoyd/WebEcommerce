import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(public authService: LoginService) {}
  ngOnInit(): void {
  }

  onLoginSuccess() {
    // Obtén el token de localStorage
    const token = localStorage.getItem('token');

    // Verifica si token no es nulo antes de llamar a authService.login
    if (token) {
      this.authService.login(token);
    } else {
      // Manejar el caso en el que no haya token (opcional)
      console.error('No se encontró un token en el almacenamiento local.');
    }
  }
}
