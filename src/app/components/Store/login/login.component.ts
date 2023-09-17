import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: any = {}; // Inicializa user como un objeto vacío
  public usuario: any = {};

  constructor(private _login_cliente: LoginService, private _router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log(this.user);
      let data = {
        email: this.user.email,
        password: this.user.password,
      };

      this._login_cliente._login_cliente(data).subscribe(
        (response) => {
          console.log(response);
          if (response.success === false) {
            console.log('Problemas en el Servidor');
          } else {
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('expiration', response.exp);
            this._login_cliente.login(response.token);

            this._login_cliente.isAuthenticate();
            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            });
          }
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            const errorMessage = 'Credenciales incorrectas'; // Mensaje de error personalizado para 401
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: errorMessage,
            });
          }
        }
      );
    }
  }

  
}
