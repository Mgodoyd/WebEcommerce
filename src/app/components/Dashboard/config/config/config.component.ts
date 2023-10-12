import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  public token: any;
  public id: any;
  public config: any = {};
  public imagePreview: string | ArrayBuffer | null = null;
  public selectedFile: any | null = null;
  public file: File | undefined;
  public logo: any;

  constructor(
    private _loginService: LoginService,
    private _configService: ConfigService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    this.listConfig();
  }

  //Método para listar la configuración
  listConfig() {
    if (this.token) {
      this._configService.get_config(this.token).subscribe(
        (response) => {
          console.log(response);
          this.config = response;
          this.logo = this.config.logo;
          console.log(this.logo);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Método para seleccionar la imagen y mostrarla en la vista previa realizando las validaciones correspondientes
  fileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files || files.length === 0) {
      this.mostrarError('No se seleccionó ningún archivo.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined;
      this.imagePreview = null; // Restablecer la vista previa cuando no se selecciona ningún archivo
      return;
    }

    const file = files[0];

    if (file.size > 4000000) {
      this.mostrarError('El archivo debe ser menor a 4MB.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined;
      this.imagePreview = null; // Restablecer la vista previa si el archivo es demasiado grande
      return;
    }

    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedFileTypes.includes(file.type)) {
      this.mostrarError('El archivo debe ser una imagen.');
      $('#input-portada').text('Seleccionar imagen');
      this.file = undefined;
      this.imagePreview = null; // Restablecer la vista previa si el tipo de archivo no es válido
      return;
    }

    this.file = file;

    this.selectedFile = URL.createObjectURL(file);
    console.log(this.selectedFile);
  }

  //Método para mostrar un mensaje de error
  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  //Método para actualizar la configuración
  actualizar(confForm: any) {
    if (confForm.valid) {
      var data: any = {};

      if (this.file != undefined) {
        data.logo = this.file;
      } else {
        data.logo = /*'C:\\fakepath\\'+ */ this.logo.name;
      }
      console.log(data.logo);
      data.title = this.config.title;
      data.serie = this.config.serie;
      data.correlative = this.config.correlative;
      if (this.token != undefined) {
        console.log(data),
          this._configService.update_config(data, this.token).subscribe(
            (response) => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Configuración actualizada con éxito.',
              });
              this.selectedFile = null;
              this.listConfig();
            },
            (error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en el Servidor.',
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
}
