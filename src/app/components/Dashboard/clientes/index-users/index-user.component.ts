import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss'],
})
export class IndexClienteComponent implements OnInit {
  public users: Array<any> = [];
  public name: string = '';
  public email: string = '';
  
  public page =1;
  public pageSize = 6;

  public token;
  public load_data = true;


  @ViewChild('form') form: ElementRef | undefined;

  constructor(private _userService: UserService, private _loginService : LoginService) {
     this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listuser();
  }

  

  listuser = (): void => {
    // Verifica que this.token no sea null ni undefined antes de usarlo
    if (this.token !== null && this.token !== undefined) {
      this._userService.list_users(this.token).subscribe(
        (response) => {
          this.users = response;
          console.log(this.users);
          this.load_data = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }; 
  
  
  searchUser = (): void => {
    if (this.name || this.email) {
      // Filtrar la lista de clientes en función del nombre y/o correo
      let resultados: Array<any> = this.users;

      if (this.name) {
        const nombreBuscado = this.name.toLowerCase();
        resultados = resultados.filter((cliente) => {
          return (
            cliente.name && cliente.name.toLowerCase().includes(nombreBuscado)
          );
        });
      }

      if (this.email) {
        const emailBuscado = this.email.toLowerCase();
        resultados = resultados.filter((cliente) => {
          return (
            cliente.login.email &&
            cliente.login.email.toLowerCase().includes(emailBuscado)
          );
        });
      }

      this.users = resultados;
    } else {
      this.listuser();
    }
  };

  eliminar(id:any){
    if (this.token !== null && this.token !== undefined) {
    this._userService.delete_user(id,this.token).subscribe(
      (response) => {
        console.log(response);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario eliminado correctamente.',
        });

        $('#delete-'+id).modal('hide');
        $('.model-backdrop').hide();

        this.listuser();
      },
      (error) => {
        console.log(error);
      }
    );
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al eliminar el usuario.',
    });
  }
}
}
