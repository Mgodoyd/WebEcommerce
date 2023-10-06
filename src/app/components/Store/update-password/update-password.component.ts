import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  public login : any = {};
  public email: string;

  constructor(
    private _loginSerivce : LoginService,
    private _router : Router
  ) {
    this.email= ''
   }

  ngOnInit(): void {
  }

  resetPassword(updatePassword:NgForm){
    if(updatePassword.valid){
      Swal.fire({
        title: '¿Confirma la actualización de la Password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, actualizar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          let data :any ;

          data = {
            email: this.email,
            password: this.login.password,
            rol : 'cliente'
          };

          // Llama al servicio para actualizar la contraseña
          this._loginSerivce._updatePassword(this.email, data)
              .subscribe(response => {
                  // Verifica la respuesta del servicio y muestra un mensaje adecuado
                  if (response.success) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Contraseña actualizada con éxito',
                      });
                      // Redirige al usuario a la página de inicio de sesión u otra página relevante
                      this._router.navigate(['/login']);
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Error al actualizar la contraseña',
                          text: response.message,
                      });
                  }
              });
      }
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son requeridos!',
      })
    }
  }

}
