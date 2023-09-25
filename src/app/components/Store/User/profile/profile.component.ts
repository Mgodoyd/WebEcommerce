import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public id: any;
  public userData: any;
  public users: any = null;
  public token;

  constructor(
    private _userService: UserService,
    private _loginService : LoginService
  ) {
    this.token= this._loginService.getToken();
   }

  ngOnInit() {
    // Obtén el id del usuario de localStorage
    this.id = localStorage.getItem('id');

    if (this.id !== null) {
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          // Actualiza users con los datos del usuario
          this.users = JSON.parse(localStorage.getItem('user') || '{}');
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  actualizar(actualizarForm:NgForm){
    let id_user = this.userData.id;
    if(actualizarForm.valid){
      console.log(this.token)
      console.log(this.userData)
      if(this.token)
      this._userService.update_user(id_user,this.userData).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          console.log(error);
        }
      );
      }
      else{
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar el usuario!'
      })
      }
    }
  
}
