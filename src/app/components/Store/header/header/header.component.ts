import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
//import {io} from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public token;
  public id;
  public userData: any;
  public users: any = null;
  public categories: any = {};
  public cart_arr: any = {};
  public product: any = {};
  public subtotal = 0;
  public total = 0;
  //public socket = io('http://localhost:32768')
  constructor(
    private _login_cliente: LoginService,
    private _userService: UserService,
    private _configService: ConfigService,
    private _cartService: CartService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  //Metodo para cerrar sesion
  logout() {
    this._login_cliente.logout();
  }

  ngOnInit(): void {
    //Metodo para obtener las categorias
    this._configService.list_categorys_public().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });

    if (this.id !== null) {
      //Metodo para obtener los datos del usuario
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          if (localStorage.getItem('user')) {
            this.users = JSON.parse(localStorage.getItem('user') || '{}');
            console.log(this.users);
            this.get_cart();
          } else {
            this.users = '';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Metodo para obtener los productos del carrito
  get_cart() {
    if (this.token) {
      this._cartService.get_cart(this.users.id, this.token).subscribe(
        (response) => {
          console.log(response);
          this.cart_arr = response;

          this.calcular_cart();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Método para calcular el subtotal del carrito
  calcular_cart() {
    this.subtotal = 0; // Inicializa el subtotal a 0

    if (this.cart_arr && this.cart_arr.length > 0) {
      for (const item of this.cart_arr) {
        this.subtotal += item.amount * item.products.price;
      }
    }
    console.log(this.subtotal);
  }

  //Metodo para eliminar un producto del carrito
  delete_cart(id: any) {
    if (this.token)
      this._cartService.delete_cart(id, this.token).subscribe(
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
            text: 'Product removed correctly.',
          });
          this.get_cart();
        },
        (error) => {
          console.log(error);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Error deleting product',
          });
        }
      );
  }
}
