import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL} from "./GLOBAL";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ILogin } from "../Entities/ILogin";
import { Router } from "@angular/router";


@Injectable()
export class LoginService{
    public url: string;
    public isLoggedIn: boolean = false;

    constructor(private _http: HttpClient,
      private _router: Router){
        this.url = GLOBAL.url;
      }
    
    
     
  public isAuthenticate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this._router.navigate(['/login']);
      return false;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    if (!decodedToken) {
      this._router.navigate(['/login']);
      return false;
    }

    const userRole = decodedToken.rol;

    if (!userRole) {
      this._router.navigate(['/error']);
      return false;
    }

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
    this.isLoggedIn = false;
  }

 
  
  _login_cliente(data: ILogin): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/Login/login', data, {headers: headers});
  }

 
  
}