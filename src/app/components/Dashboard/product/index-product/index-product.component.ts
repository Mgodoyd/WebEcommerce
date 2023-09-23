import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import * as ExcelJS from 'exceljs';

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
  public arr_product = Array();
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
        this.product.forEach(element => {
          this.arr_product.push(element);
        });
        console.log(this.arr_product)
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

  dowloand_excel(){
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet('Products');

    worksheet.addRow(undefined);
    for(let x1 of this.arr_product){
      let x2=Object.keys(x1);

      let temp = [];
      for(let x3 of x2){
        temp.push(x1[x3]);
      }
      worksheet.addRow(temp);
    }
    let fileName = "Products.xlsx";

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Slug', key: 'slug', width: 30 },
      { header: 'Frontpage', key: 'frontpage', width: 30 },
      { header: 'Image', key: 'imageFile', width: 30 },
      { header: 'Price', key: 'price', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Content', key: 'content', width: 30 },
      { header: 'Stock', key: 'stock', width: 30 },
      { header: 'Points', key: 'points', width: 30 },
      { header: 'Sales', key: 'sales', width: 30 },
      { header: 'Category', key: 'category', width: 30 },
      { header: 'State', key: 'state', width: 30},
      { header: 'Inventory', key: 'inventoryId', width: 30},
      { header: 'Created At', key: 'createdAt', width: 60},
      ]as any;

    workbook.xlsx.writeBuffer().then((data:any)=>{
      let blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      FileSaver.saveAs(blob,fileName);
    });
  }
}
