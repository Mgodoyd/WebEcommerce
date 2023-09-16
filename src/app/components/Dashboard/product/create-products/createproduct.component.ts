import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare var iziToast:any;
@Component({
  selector: 'app-product',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class ProductComponent implements OnInit {
  
    public products : any = {
      category: '',
    };
    public file: File | undefined = undefined;
    public imgSelect : any | ArrayBuffer = '../../../../../assets/img/default-img.avif';
    public config : any = {};
    constructor() {
      this.config = {
        height:500
      }
     }
  
    ngOnInit(): void {
    }

    registro(registroForm:NgForm){
      if(registroForm.invalid){
       // return;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, completa todos los campos correctamente.',
        });
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
      reader.onload = (e) => this.imgSelect = reader.result;
      reader.readAsDataURL(file);

      $('#input-portada').text(file.name);

      this.file = file;
      console.log(this.file);
    }
  
    private mostrarError(mensaje: string): void {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
      });
    }
    
}
