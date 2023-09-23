import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public token;
  public id;
  public userData:any;
  public users: any = null;


  constructor(
    private _login_cliente: LoginService,
    private _userService : UserService
  ) { 
    
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  get isLoggedIn() {
    return this._login_cliente.isLoggedIn;
  }
  
  logout() {
    this._login_cliente.logout();
  }
 

  ngOnInit(): void {
  

    if (this.id !== null) {
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          if (localStorage.getItem('user')) {
            this.users = JSON.parse(localStorage.getItem('user') || '{}');
            console.log(this.users);
          } else {
            this.users = ''; 
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onLoginSuccess() {
    // Obtén el token de localStorage
    const token = localStorage.getItem('token');

    // Verifica si token no es nulo antes de llamar a authService.login
    if (token) {
      this._login_cliente.login(token);
    } else {
      // Manejar el caso en el que no haya token (opcional)
      console.error('No se encontró un token en el almacenamiento local.');
    }
  }
}
