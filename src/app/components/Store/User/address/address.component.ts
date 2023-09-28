import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { AddressService } from 'src/app/services/address.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent  implements OnInit{

  public id:any;
  public userData:any;
  public users:any;
  public address: any = {
    country: '',
    dpi: '',
    main: false,
  }
  public address_user:any ={};
  public token:any;
  public address_id:any ={};
  public data:any;
  public load_data= true

   constructor(
    private _userService: UserService,
    private _addressService : AddressService,
    private _loginService : LoginService
   ){
    this.token = this._loginService.getToken();
   }

   ngOnInit(): void {
        // Obtén el id del usuario de localStorage
    this.id = localStorage.getItem('id');

    if (this.id !== null) {
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
   get_address(){
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
     console.log(this.users);
    if(this.token)
    this._addressService.get_addresss_user(this.users.id,this.token).subscribe(
      (response) => {
        console.log(response);
        this.load_data = false;
        this.address_user = response;
        console.log(this.address_user);
      },
      error => {
        console.log(error);
      }
    );
   }

   add_address(registroForm:NgForm){
    if(registroForm.valid){
      let data = {
        addressee : this.address.addressee,
        dpi : this.address.dpi,
        zip : this.address.zip,
        country: this.address.country,
        phone : this.address.phone,
        main : this.address.main,
        userId : this.users.id
      }
       console.log(data);
      if(this.token)
      this._addressService.create_address(data,this.token).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dirección agregada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          registroForm.reset();
          this.get_address();
        },
      (error) => {
        console.log(error);
      }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos no son válidos!',
      })
    }
   }

   get_address_id(id: any) {
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
  
  update_address(id: any) {
    // Ahora puedes acceder a this.address_id porque has esperado a que se complete get_address_id
    console.log(this.address_id);
    this.data = this.address_id;
    this.data.main = true;
    console.log(this.data);
  
    if (this.token) {
      this._addressService.update_address(id, this.data, this.token).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dirección Principal actualizada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          
          // Obtener todas las direcciones del usuario
          this._addressService.get_addresss_user(this.users.id, this.token).subscribe(
            (addresses) => {
              // Recorrer todas las direcciones y establecer main en false, excepto la principal
              addresses.forEach((address:any) => {
                if (address.id !== id) {
                  address.main = false;
                  // Actualizar cada dirección en la base de datos
                  this._addressService.update_address(address.id, address, this.token).subscribe(
                    () => {
                      console.log(`Dirección ${address.id} actualizada con main = false`);
                      this.get_address();
                    },
                    (error) => {
                      console.log(`Error al actualizar dirección ${address.id}: ${error}`);
                    }
                  );
                }
              });
            },
            (error) => {
              console.log(`Error al obtener las direcciones del usuario: ${error}`);
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
  
   
}
