import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public token;
  public cart_arr : any = {};
  public users : any = {};
  public subtotal = 0;
  public total_apagar = 0;

  constructor(
    private _cartService: CartService,
    private _loginService: LoginService
  ) { 
    this.token = _loginService.getToken();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
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
  calcular_cart() {
    
    this.cart_arr.forEach((element: any) => {
      this.subtotal += parseInt(element.products.price) ;
    
    });
    this.total_apagar = this.subtotal;
}
 
  delete_cart(id:any){
    if(this.token)
    this._cartService.delete_cart(id, this.token).subscribe(
      response => {
        console.log(response);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Producto eliminado correctamente',
        });
        this.ngOnInit();
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