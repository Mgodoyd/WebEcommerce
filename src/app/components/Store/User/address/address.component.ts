import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public token:any;

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
        user_Id : this.users.id
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
}
