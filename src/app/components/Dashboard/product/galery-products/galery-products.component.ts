import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GaleryService } from 'src/app/services/galery.service';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-galery-products',
  templateUrl: './galery-products.component.html',
  styleUrls: ['./galery-products.component.scss'],
})
export class GaleryProductsComponent implements OnInit {
  public id: any;
  public product: any = {};
  public galery: any = {};
  public galerys: any = {};
  public token: any;
  public page = 1;
  public pageSize = 6;
  public file: File | undefined;
  public load_data = true;

  constructor(
    private _loginService: LoginService,
    private _router: ActivatedRoute,
    private _productService: ProducService,
    private _galeryService: GaleryService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.list_galery();
  }

  //Metodo para listar toda la galeria de un producto
  list_galery() {
    this._router.params.subscribe((params) => {
      this.id = params['id'];
      if (!this.token) {
        return; // Salir si no hay token
      }
      this._productService.get_product(this.id, this.token).subscribe(
        (response) => {
          if (response === undefined) {
            this.product = undefined;
            return; // Salir si no se encuentra el producto
          }

          this.product = response;
          this._galeryService.list_galery(this.id, this.token).subscribe(
            (response) => {
              console.log(response);
              this.galery = response;
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  //Metodo para subir una imagen
  fileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files || files.length === 0) {
      this.mostrarError('No file selected.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined; // Restablecer la vista previa cuando no se selecciona ningún archivo
      return;
    }

    const file = files[0];

    if (file.size > 4000000) {
      this.mostrarError('The file must be less than 4MB.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined; // Restalecer la vista previa si el archivo es demasiado grande
      return;
    }

    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedFileTypes.includes(file.type)) {
      this.mostrarError('The file must be an image.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined; // Restablecer la vista previa si el tipo de archivo no es válido
      return;
    }

    this.file = file;
  }

  //Metodo para mostrar un mensaje de error
  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  //Metodo para registrar una imagen
  registro_galery(galeryForm: NgForm) {
    if (galeryForm.valid) {
      if (this.token) {
        this.galerys.productId = this.id;
        this.galerys.galery = this.file;
        console.log(this.galerys.productId);
        console.log(this.galerys);
        this._galeryService.create_galery(this.galerys, this.token).subscribe(
          (response) => {
            this.galerys = response;
            console.log(this.galerys);
            this.load_data = true;

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'success',
              text: 'The image was registered.',
            });
            galeryForm.resetForm();
            this.list_galery();
          },
          (error) => {
            console.log(error);
            this.load_data = true;
          }
        );
      }
    } else {
      Swal.fire({
        title: 'Error ',
        text: 'Could not register image',
        icon: 'error',
      });
    }
  }

  //Manejo del modal
  CloseModel(id: any) {
    $('#delete-' + id).modal('hide');
  }
  openDeleteModal(id: any) {
    // Abre el modal de eliminación para la categoría con el ID proporcionado
    $('#delete-' + id).modal('show');
  }

  //Metodo para eliminar una imagen
  eliminar(id: any) {
    if (this.token) {
      this._galeryService.delete_galery(id, this.token).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Image deleted successfully.',
          });

          $('#delete-' + id).modal('hide');
          $('.model-backdrop').hide();

          this.list_galery();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Server error.',
      });
    }
  }
}
