import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  public product: any = {
    category: {},
    state: '1',
  };
  public file: File | undefined;
  public imgSelect: any | ArrayBuffer =
    '../../../../../assets/img/default-img.avif';
  public config: any = {};
  public token;
  public load_btn = false;
  public url = 'https://ecommercewebde.blob.core.windows.net/ecommerce/';
  public id: any;
  public categorys: any = {};
  constructor(
    private _loginService: LoginService,
    private _router: ActivatedRoute,
    private _productService: ProducService,
    private _routers: Router
  ) {
    this.config = {
      height: 500,
    };
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
    this._router.params.subscribe((params) => {
      this.id = params['id'];
      if (this.token) {
        // Método para obtener un producto
        this._productService.get_product(this.id, this.token).subscribe(
          (response) => {
            this.product = response;
            console.log(this.product);
            console.log(this.product.category.titles);
            console.log(this.product.frontpage);
            this.imgSelect = this.url + this.product.frontpage;
            console.log(this.imgSelect);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    this.listcategorys();
  }

  // Método para actualizar un producto
  actualizar(actualizarForm: any) {
    if (actualizarForm.valid) {
      console.log(actualizarForm.value);
      var data: any = {};

      if (this.file != undefined) {
        data.frontpage = this.file;
      } else {
        data.frontpage = /*'C:\\fakepath\\'+ */ this.product.frontpage;
      }

      data.title = this.product.title;
      data.description = this.product.description;
      data.price = this.product.price;
      data.stock = this.product.stock;
      data.state = this.product.state;
      data.content = this.product.content;
      data.category = this.product.category.titles;

      this.load_btn = true;
      if (this.token != undefined) {
        console.log(data),
          this._productService
            .updateProduct(this.id, data, this.token)
            .subscribe(
              (response) => {
                console.log(response);
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Product updated successfully.',
                });
                this.load_btn = false;
                this._routers.navigate(['/index/products']);
              },
              (error) => {
                console.log(error);
                this.load_btn = false;
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Server error.',
                });
              }
            );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos del formulario no son válidos',
        });
      }
    }
  }

  // Método para seleccionar una imagen
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
