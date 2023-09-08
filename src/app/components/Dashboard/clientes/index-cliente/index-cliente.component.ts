import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.scss']
})
export class IndexClienteComponent implements OnInit{
      
    public clientes: Array<any> = [];
    constructor(
      private _clientservice : ClientesService,
    ) { }
  
    ngOnInit(): void {
      this._clientservice.list_clientes().subscribe(
        response => {
          console.log(response);
          this.clientes = response;
          console.log(this.clientes);

        },
        error => {
          console.log(error);
        }
      );
      }

}
