import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ProducService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';

declare var iziToast:any;
@Component({
  selector: 'app-product',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class ProductComponent implements OnInit {
  
    public product : any = {
      category: '',
      state: '1',
    };
    public file: string | undefined;
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
          this._productService.create_product(this.product, this.file, this.token).subscribe(
            response => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Producto registrado con éxito.',
              });
              this.load_btn = false; 
            },
            error => {
              console.log(<any>error);
              this.load_btn = false; 
            }
          );
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
        return;
      }
    
      const file = files[0];
    
      if (file.size > 4000000) {
        this.mostrarError('El archivo debe ser menor a 4MB.');
        $('#input-portada').text('Seleccionar imagen');
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
    
      const reader = new FileReader();
      reader.onload = (e) => {
        // La siguiente línea convierte la imagen en base64 y la asigna a this.file
        this.file = reader.result as string; // Almacena la imagen como base64
        
        this.imgSelect = this.file; // Actualiza la vista previa con la imagen en base64
      };
      reader.readAsDataURL(file);
    
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
