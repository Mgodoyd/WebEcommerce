import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public id: any;
  public userData: any;
  public users: any;
  public address: any = {
    country: '',
    dpi: '',
    main: false,
  };
  public address_user: any = {};
  public token: any;
  public address_id: any = {};
  public data: any;
  public load_data = true;

  constructor(
    private _userService: UserService,
    private _addressService: AddressService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    // Obtén el id del usuario de localStorage
    this.id = localStorage.getItem('id');

    if (this.id !== null) {
      //Método para obtener un usuario por id
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          // Actualiza users con los datos del usuario
          this.users = JSON.parse(localStorage.getItem('user') || '{}');
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.get_address();
  }

  // Método para obtener las direcciones del usuario
  get_address() {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.users);
    if (this.token)
      this._addressService
        .get_addresss_user(this.users.id, this.token)
        .subscribe(
          (response) => {
            console.log(response);
            this.load_data = false;
            this.address_user = response;
            console.log(this.address_user);
          },
          (error) => {
            console.log(error);
          }
        );
  }

  // Método para agregar una dirección
  add_address(registroForm: NgForm) {
    if (registroForm.valid) {
      let data = {
        addressee: this.address.addressee,
        dpi: this.address.dpi,
        zip: this.address.zip,
        country: this.address.country,
        phone: this.address.phone,
        main: this.address.main,
        userId: this.users.id,
      };
      console.log(data);

      this._addressService.create_address(data, this.token).subscribe(
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
            text: 'Address added successfully.',
          });
          registroForm.reset();
          this.get_address();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
    }
  }

  // Método para obtener una dirección por id
  get_address_id(id: any) {
    console.log(id);
    if (this.token) {
      this._addressService.get_address(id, this.token).subscribe(
        (response) => {
          console.log(response);
          this.address_id = response;
          console.log(this.address_id);

          // Llamar a update_address después de obtener la información
          this.update_address(id);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Método para actualizar una dirección
  update_address(id: any) {
    // Ahora puedes acceder a this.address_id porque has esperado a que se complete get_address_id
    console.log(id);
    console.log(this.address_id);
    this.data = this.address_id;
    this.data.main = true;
    console.log(this.data);

    if (this.token) {
      console.log(id);
      this._addressService.update_address(id, this.data, this.token).subscribe(
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
            text: 'Primary Address successfully updated.',
          });
          // Obtener todas las direcciones del usuario
          this._addressService
            .get_addresss_user(this.users.id, this.token)
            .subscribe(
              (addresses) => {
                console.log(addresses);
                // Recorrer todas las direcciones y establecer main en false, excepto la principal
                addresses.forEach((address: any) => {
                  if (address.Id !== id) {
                    console.log(address.Id);
                    console.log(id);
                    address.main = false;
                    // Actualizar cada dirección en la base de datos
                    this._addressService
                      .update_address(address.Id, address, this.token)
                      .subscribe(
                        () => {
                          console.log(
                            `Dirección ${address.Id} actualizada con main = false`
                          );
                          this.get_address();
                        },
                        (error) => {
                          console.log(
                            `Error al actualizar dirección ${address.id}:` +
                              error
                          );
                        }
                      );
                  }
                });
              },
              (error) => {
                console.log(
                  `Error al obtener las direcciones del usuario: ${error}`
                );
              }
            );

          this.get_address();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Método para eliminar una dirección
  elimnar_address(id: any) {
    if (this.token)
      this._addressService.delete_address(id, this.token).subscribe(
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
            text: 'Address deleted successfully.',
          });
          this.get_address();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
