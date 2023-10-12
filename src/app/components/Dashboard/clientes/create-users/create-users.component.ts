import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
})
export class CreateUsersComponent implements OnInit {
  public user: any = {
    login: {},
    rol: '',
  };
  public token;
  public load_btn = false;
  constructor(
    private _userService: UserService,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {}

  //Metodo para registrar un usuario
  registro(registroForm: NgForm) {
    if (registroForm.invalid) {
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
        text: 'All fields are required.',
      });
    } else {
      console.log(this.user);
      if (this.token !== null) {
        // Comprueba que token no sea null
        this.load_btn = true;
        this._userService.create_user(this.user, this.token).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registered user successfully.',
        });
        this.load_btn = false;
        setTimeout(() => {
          this._router.navigate(['/index/users']);
        }, 1000);
        registroForm.resetForm();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'The authentication token is null. Please log in again.',
        });
      }
    }
  }
}
