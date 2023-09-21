import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ProducService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-product',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class ProductComponent implements OnInit {
  
    public product : any = {
      inventory: {},
      category: '',
      state: '1',
    };
    public file: File | undefined;
    public imgSelect : any | ArrayBuffer = '../../../../../assets/img/default-img.avif';
    public config : any = {};
    public token;
    public load_btn = false;  

    constructor(private _productService : ProducService, private _loginService : LoginService) {
      this.config = {
        height:500
      }
      this.token = this._loginService.getToken();
     }
  
     ngOnInit(): void {
    }
    registro(registroForm: NgForm) {
      if (!registroForm.valid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, completa todos los campos correctamente.',
        });
      } else {
        if (this.token !== null) {
          this.load_btn = true;
          if (this.file) { // Verifica si this.file es definido antes de hacer la llamada al servicio
          // this.product.inventory.amount = this.product.stock;
           this._productService.create_product(this.product, this.file, this.token).subscribe(
             response => {
               console.log(response);
               Swal.fire({
                 icon: 'success',
                 title: 'Éxito',
                 text: 'Producto registrado con éxito.',
                });
                this.load_btn = false;
                registroForm.resetForm();
              },
              error => {
                console.log(<any>error);
                this.load_btn = false;
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Por favor, selecciona una imagen.',
            });
            this.load_btn = false;
          }
        } else {
          console.log("El token es nulo.");
          // Tratar el caso en el que el token es nulo, si es necesario.
        }
      }
    }
    
    
    fileChangeEvent(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const files = inputElement.files;
    
      if (!files || files.length === 0) {
        this.mostrarError('No se seleccionó ningún archivo.');
        $('#input-portada').text('Seleccionar imagen');
        this.file = undefined; 
        return;
      }
    
      const file = files[0];
    
      if (file.size > 4000000) {
        this.mostrarError('El archivo debe ser menor a 4MB.');
        $('#input-portada').text('Seleccionar imagen');
        this.file = undefined; 
        return;
      }
    
      const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    
      if (!allowedFileTypes.includes(file.type)) {
        this.mostrarError('El archivo debe ser una imagen.');
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = '../../../../../assets/img/default-img.avif';
        this.file = undefined;
        return;
      }
    
          this.file = file;
        
          this.imgSelect = URL.createObjectURL(file);
          console.log(this.imgSelect);
    
      $('#input-portada').text(file.name);
    }
    
    
    private mostrarError(mensaje: string): void {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
      });
    }
    
    
}
