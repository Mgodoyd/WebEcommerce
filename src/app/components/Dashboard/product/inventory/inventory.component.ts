import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventaryService } from 'src/app/services/inventary.service';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public load_data= true;
  public token;
  public product: any = {};
  public filtro = '';
  public productosEncontrados = true;
  public page =1;
  public pageSize = 6;
  public id: any;
  public inventory: any = {};
  public inventorys: any = {};
  public inventoryNotFound = false;

  constructor(private _loginService : LoginService,
    private _router: ActivatedRoute,
    private _productService: ProducService,
    private _inventoryService: InventaryService) { 
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.id = params['id'];
      if (!this.token) {
        return; // Salir si no hay token
      }
  
      this._productService.get_product(this.id, this.token).subscribe(
        response => {
          if (response === undefined) {
            this.product = undefined;
            return; // Salir si no se encuentra el producto
          }
  
          this.product = response;
          if(this.token) {
            this._inventoryService.list_inventary(this.id, this.token).subscribe(
              inventoryResponse => {
                this.inventory = inventoryResponse;
                console.log(this.inventory);
                this.load_data = true;
              },
              error => {
                console.log(error);
                this.load_data = true;
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 404) {
                  this.inventoryNotFound = true; // Establece la variable de bandera en verdadero
                }
        }
      );
    });
  }
  
  registro_inventory(inventarioForm:NgForm){
    if(inventarioForm.valid){
     if(this.token){
       this._inventoryService.update_inventory(this.id, this.inventorys, this.token).subscribe(
        response => {
          this.inventorys = response;
          console.log(this.inventorys);
          this.load_data = true;
  
          Swal.fire({
            title: 'Exito ',
            text: "Se registro el inventario",
            icon: 'success',
          })
  
        },
        error => {
          console.log(error);
          this.load_data = true;
        }
       );
     }

    }else{
      Swal.fire({
        title: 'Error ',
        text: "No se pudo registrar el inventario",
        icon: 'error',
      })
    }
  }
  

  
}
