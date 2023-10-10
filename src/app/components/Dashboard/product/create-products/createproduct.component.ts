import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ProducService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss'],
})
export class ProductComponent implements OnInit {
  public product: any = {
    inventory: {},
    category: {},
    state: '1',
  };
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer =
    '../../../../../assets/img/default-img.avif';
  public config: any = {};
  public token;
  public load_btn = false;
  public categorys: any = {};

  constructor(
    private _productService: ProducService,
    private _loginService: LoginService,
    private _routers: Router
  ) {
    this.config = {
      height: 500,
    };
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listcategorys();
  }

  // Método para registrar un producto
  registro(registroForm: NgForm) {
    if (!registroForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required.',
      });
    } else {
      if (this.token !== null) {
        this.load_btn = true;
        if (this.file) {
          // Verifica si this.file es definido antes de hacer la llamada al servicio
          // this.product.inventory.amount = this.product.stock;
          this._productService
            .create_product(this.product, this.file, this.token)
            .subscribe(
              (response) => {
                console.log(response);
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Product successfully registered.',
                });
                this.load_btn = false;
                registroForm.resetForm();
                this._routers.navigate(['/index/products']);
              },
              (error) => {
                console.log(<any>error);
                this.load_btn = false;
              }
            );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select an image.',
          });
          this.load_btn = false;
        }
      } else {
        console.log('El token es nulo.');
        // Tratar el caso en el que el token es nulo, si es necesario.
      }
    }
  }

  // Método para obtener la imagen seleccionada y mostrarla en el formulario además de validarla
  fileChangeEvent(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files || files.length === 0) {
      this.mostrarError('No file selected.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined;
      return;
    }

    const file = files[0];

    if (file.size > 4000000) {
      this.mostrarError('The file must be less than 4MB.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined;
      return;
    }

    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedFileTypes.includes(file.type)) {
      this.mostrarError('The file must be an image.');
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

  // Método para mostrar un error
  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  // Método para listar las categorías
  listcategorys() {
    this._productService.list_category().subscribe(
      (response) => {
        this.categorys = response;
        console.log(this.categorys);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
