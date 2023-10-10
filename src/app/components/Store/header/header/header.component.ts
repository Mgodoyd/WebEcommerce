import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ProducService } from '../../../../services/product.service';
import Swal from 'sweetalert2';
//import {io} from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public token;
  public id;
  public userData:any;
  public users: any = null;
  public categories : any = {}
  public op_cart = false;
  public cart_arr : any = {};
  public product : any = {};
  public subtotal = 0;
  //public socket = io('http://localhost:32768')
  constructor(
    private _login_cliente: LoginService,
    private _userService : UserService,
    private _configService : ConfigService,
    private _cartService : CartService,
    private _productService : ProducService
  ) { 
    
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  
  logout() {
    this._login_cliente.logout();
  }
 

  ngOnInit(): void {
    this._configService.list_categorys_public().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      }
      );

    if (this.id !== null) {
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

  get_cart(){
    if(this.token)
    this._cartService.get_cart(this.users.id, this.token).subscribe(
      response => {
        console.log(response);
        this.cart_arr = response;
        this.calcular_cart();
       
      },
      error => {
        console.log(error);
      }
      );
  }


  op_modalcart(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

  calcular_cart() {
    
      this.cart_arr.forEach((element: any) => {
        this.subtotal += parseInt(element.products.price) ;
      
      });
    
  }

  delete_cart(id:any){
    if(this.token)
    this._cartService.delete_cart(id, this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon : 'success',
          title : 'Producto eliminado correctamente',
          timer : 1000,
          showConfirmButton : false
        })
        this.get_cart();
      },
      error => {
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
          title: 'Error al eliminar el producto',
        });
      }
      );
  
  }
  
}
