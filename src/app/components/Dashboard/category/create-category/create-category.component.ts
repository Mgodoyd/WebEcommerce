import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public category:any= {};
  public token;
  public id: any

  constructor(private _loginService: LoginService,
    private _configService: ConfigService,) { 
      this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listCategorys();
  }

  registro() {
    if (this.token) {
      const newCategory = { titles: this.category.titles, icon: this.category.icon }; // Crear un nuevo objeto de categoría
      this._configService.create_category(newCategory, this.token).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Category registrada con éxito.',
          });
          this.listCategorys(); // Actualizar la lista de categorías después de la inserción
        },
        error => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios!',
      });
    }
  }
  

listCategorys() {
  if (this.token) {
    this._configService.list_categorys(this.token).subscribe(
      response => {
        console.log(response);
        this.category = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}

openDeleteModal(id: any) {
  // Abre el modal de eliminación para la categoría con el ID proporcionado
  $('#delete-' + id).modal('show');
}
eliminar(id:any){
  if (this.token !== null && this.token !== undefined) {
  this._configService.delete_category(id,this.token).subscribe(
    (response) => {
      console.log(response);
      
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Category eliminado correctamente.',
      });

      $('#delete-'+id).modal('hide');
      $('.model-backdrop').hide();

      this.listCategorys();
    },
    (error) => {
      console.log(error);
    }
  );
}else{
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Error al eliminar el usuario.',
  });
}
}
}
