import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss'],
})
export class IndexClienteComponent implements OnInit {
  public clientes: Array<any> = [];
  public admins: Array<any> = [];
  public name: string = '';
  public email: string = '';
  
  public page =1;
  public pageSize = 4;

  public token;

  @ViewChild('form') form: ElementRef | undefined;

  constructor(private _clientservice: ClientesService, private _loginService : LoginService) {
     this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listclient();
    this.listadmin();
  }

  listadmin = (): void => {
    // Verifica que this.token no sea null ni undefined antes de usarlo
    if (this.token !== null && this.token !== undefined) {
      this._clientservice.list_admins(this.token).subscribe(
        (response) => {
          console.log(response);
          this.admins = response;
          console.log(this.admins);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  listclient = (): void => {
    // Verifica que this.token no sea null ni undefined antes de usarlo
    if (this.token !== null && this.token !== undefined) {
      this._clientservice.list_clientes(this.token).subscribe(
        (response) => {
          this.clientes = response;
          console.log(this.clientes);
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
      let resultados: Array<any> = this.clientes;

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

      // Actualiza 'this.clientes' con los resultados de la búsqueda
      this.clientes = resultados;
    } else {
      this.listclient();
    }
  };
}
