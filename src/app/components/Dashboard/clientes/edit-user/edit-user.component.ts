import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public user: any = {
    login: {},
    rol: '',
  };
  public id: any;
  public token: any;
  public load_btn = false;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      //Metodo para obtener un usuario por id cuando el rol es admin
      this._userService.get_user_admin(this.id, this.token).subscribe(
        (response) => {
          if (response == undefined) {
            this.user = undefined;
          } else {
          }
          console.log(response);
          this.user = response;
          console.log(this.user);
        },
        (error) => {
          console.log(<any>error);
        }
      );
    });
  }

  //Metodo para actualizar un usuario
  update(updateForm: any) {
    if (updateForm.valid) {
      console.log(updateForm.value);
      this.load_btn = true;
      this._userService.update_user(this.id, this.user).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'User successfully updated.',
          });
          this.load_btn = false;
          this._router.navigate(['/index/users']);
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error registering user.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario no Valido',
      });
    }
  }
}
