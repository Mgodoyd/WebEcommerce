import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DashGuard  {

  public token;

  constructor(private dashService: LoginService
    , private router: Router) { 
      this.token = this.dashService.getToken();
    }
 
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
