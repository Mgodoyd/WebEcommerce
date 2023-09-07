import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DashGuard implements CanActivate {

  constructor(private dashService: LoginService
    , private router: Router) { }
 
    canActivate(): boolean {
      if (this.dashService.isLoggedIn) {
        // El usuario tiene un token válido, permite el acceso.
        return true;
      } else {
        // El usuario no tiene un token válido, redirige a la página de inicio de sesión.
        this.router.navigate(['/login']);
        return false;
      }
    }
    
  
}
