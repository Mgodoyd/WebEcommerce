import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

   public user : any = {
    login: {},
    rol: ''
   };
   public token;
   public load_btn=false;
  constructor(
    private _userService : UserService,
    private _loginService : LoginService,
    private _router : Router
  ) {
    this.token = this._loginService.getToken();
   }

  ngOnInit(): void {
  }


  registro(registroForm: NgForm) {
    if (registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos correctamente.',
      });
    } else {
      console.log(this.user);
      if (this.token !== null) { // Comprueba que token no sea null
        this.load_btn=true;
        this._userService.create_user(this.user, this.token).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario registrado con éxito.',
        });
        this.load_btn=false;
        registroForm.resetForm();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El token de autenticación es nulo. Por favor, inicia sesión nuevamente.',
        });
      }
    }
  }
  
}
