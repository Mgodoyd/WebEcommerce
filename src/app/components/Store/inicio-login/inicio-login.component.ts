import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-inicio-login',
  templateUrl: './inicio-login.component.html',
  styleUrls: ['./inicio-login.component.scss']
})
export class InicioLoginComponent {

  constructor(
    private _login_cliente: LoginService
  ) { }

  get isLoggedIn() {
    return this._login_cliente.isLoggedIn;
  }
  
  logout() {
    this._login_cliente.logout();
  }
}
