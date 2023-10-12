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
  public token;
  public newUser: any = {
    login: {},
  };
  public confirmPassword: string;
  public confirmPasswordTouched: boolean = false;

  constructor(private _login_cliente: LoginService, private _router: Router) {
    this.token = this._login_cliente.getToken();
    if (this.token) {
      this._router.navigate(['/']);
    }
    this.confirmPassword = '';
  }

  ngOnInit(): void {}

  //Metodo para iniciar sesion
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
            this.usuario = response;
            localStorage.setItem('token', response.token);
            localStorage.setItem('expiration', response.exp);

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
            const errorMessage = 'Incorrect credentials'; // Mensaje de error personalizado para 401
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

  //Metodo para registrar un nuevo usuario
  registroNewUser(registroUser: NgForm) {
    if (registroUser.valid) {
      this._login_cliente._createUser(this.newUser).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Created account',
            text: 'Your account has been created successfully. Please log in.',
          });
          registroUser.reset();
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Server error.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required.',
      });
    }
  }
}
