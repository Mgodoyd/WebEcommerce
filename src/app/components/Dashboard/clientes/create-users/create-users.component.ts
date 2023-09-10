import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

   public cliente : any = {
    login: {},
    rol: ''
   };
   public token;
  constructor(
    private _clienteService : ClientesService,
    private _loginService : LoginService
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
      console.log(this.cliente);
      if (this.token !== null) { // Comprueba que token no sea null
        this._clienteService.create_clientes(this.cliente, this.token).subscribe(
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
          text: 'Cliente registrado con éxito.',
        });
  
        registroForm.resetForm();
      } else {
        // Haz algo en caso de que token sea null, por ejemplo, muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El token de autenticación es nulo. Por favor, inicia sesión nuevamente.',
        });
      }
    }
  }
  
}
