import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.scss']
})
export class IndexProductComponent implements OnInit{

  public load_data= true;
  public token;
  public product = Array();
  public filtro = '';
  public productosEncontrados = true;
  public page =1;
  public pageSize = 6;


  constructor(
    private _productService: ProducService,
    private _loginService: LoginService
  ) { 
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listproducts();
  }

  listproducts(){
    if(this.token !== null){
    this._productService.list_products(this.token).subscribe(
      response => {
        console.log(response);
        this.product = response;
        this.load_data = false;
      },
      error => {
        console.log(<any>error);
      }
    );
    }else{
    }
    }

    filtrar(): void {
      if (this.filtro) {
        // Filtra los productos en función del título
        const productosFiltrados = this.product.filter((producto) =>
          producto.title.toLowerCase().includes(this.filtro.toLowerCase())
        );
    
        if (productosFiltrados.length > 0) {
          // Si se encuentran productos que coincidan con el filtro
          this.product = productosFiltrados;
          this.productosEncontrados = true;
        } else {
          // Si no se encuentran productos que coincidan con el filtro
          this.productosEncontrados = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Producto no encontrado'
          })
        }
      } else {
        // Si el campo de filtro está vacío, restaura la lista original de productos
        this.listproducts();
      
      }
    }
    
    eliminar(id:any){
      if (this.token !== null && this.token !== undefined) {
      this._productService.delete_product(id,this.token).subscribe(
        (response) => {
          console.log(response);
          
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto eliminado correctamente.',
          });
  
          $('#delete-'+id).modal('hide');
          $('.model-backdrop').hide();
  
          this.listproducts();
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en el Servidor.',
          });
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar el producto.',
      });
    }
  }
}
