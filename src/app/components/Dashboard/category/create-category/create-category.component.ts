import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  public category: any = {};
  public token;
  public id: any;

  constructor(
    private _loginService: LoginService,
    private _configService: ConfigService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listCategorys();
  }

  //Método para registrar una categoría, validando que los campos no estén vacíos antes de enviar la petición
  registro() {
    if (this.token) {
      if (!this.category.titles || !this.category.icon) {
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
          icon: 'error',
          title: 'All fields are required',
        });
        return;
      }

      const newCategory = {
        titles: this.category.titles,
        icon: this.category.icon,
      }; // Crear un nuevo objeto de categoría
      this._configService.create_category(newCategory, this.token).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Category successfully registered.!',
          });
          this.listCategorys(); // Actualizar la lista de categorías después de la inserción
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Server error occurred.',
      });
    }
  }

  //Método para listar las categorías
  listCategorys() {
    if (this.token) {
      this._configService.list_categorys(this.token).subscribe(
        (response) => {
          console.log(response);
          this.category = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Manejo del modal
  openDeleteModal(id: any) {
    $('#delete-' + id).modal('show');
  }
  closeDeleteModal(id: any) {
    $('#delete-' + id).modal('hide');
  }

  //Método para eliminar una categoría
  eliminar(id: any) {
    if (this.token !== null && this.token !== undefined) {
      this._configService.delete_category(id, this.token).subscribe(
        (response) => {
          console.log(response);

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
            text: 'Category deleted correctly.',
          });

          $('#delete-' + id).modal('hide');
          $('.model-backdrop').hide();

          this.listCategorys();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error when deleting category.',
      });
    }
  }
}
