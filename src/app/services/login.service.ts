import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ILogin } from "../Entities/ILogin";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class LoginService {
  public url: string;
  public isLoggedIn: boolean = false;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = GLOBAL.url;
  }

  public isAuthenticate(): boolean {
    const token = localStorage.getItem('token');
  
    if (!token || typeof token !== 'string') {
      this._router.navigate(['/login']);
      return false;
    }
  
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
  
    if (!decodedToken.rol || !decodedToken.exp) {
      this._router.navigate(['/error']);
      return false;
    }
  
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
  
    const currentDate = new Date();
  
    if (currentDate >= expirationDate) {
      Swal.fire({
        icon: 'error',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
      });
      this.logout();
      this._router.navigate(['/login']);
      return false;
    }
  
    const userRole = decodedToken.rol;
  
    if (userRole === 'cliente') {
      this._router.navigate(['inicio']);
    } else if (userRole === 'administrador') {
      this._router.navigate(['dashboard']);
    } else {
      this._router.navigate(['/error']);
    }
  
    return true;
  }
  

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.isLoggedIn = false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  _login_cliente(data: ILogin): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/Login/login', data, { headers: headers });
  }
}
