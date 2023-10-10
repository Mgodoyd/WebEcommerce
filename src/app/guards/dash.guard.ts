import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashGuard {
  public token;

  constructor(private dashService: LoginService, private router: Router) {
    this.token = this.dashService.getToken();
  }

  //Metodo para proteger las rutas, si el usuario no tiene un token válido, no podrá acceder a las rutas. Utilizando canActivate que es un método de la interfaz para proteger las rutas.
  canActivate(): boolean {
    if (this.token) {
      // El usuario tiene un token válido, permite el acceso.
      return true;
    } else {
      // El usuario no tiene un token válido, redirige a la página de inicio de sesión.
      this.router.navigate(['/login']);
      return false;
    }
  }
}
