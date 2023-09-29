import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var Cleave:any;
declare var StickySidebar:any;
declare var paypal:any;


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
 @ViewChild('paypalButton',{static:true}) paypalElement : ElementRef | undefined;
  public token;
  public cart_arr : any = {};
  public users : any = {};
  public subtotal = 0;
  public total_apagar = 0;
  public address : any = {};
  public price_envio = 0;
  public selectedOption: any;
  constructor(
    private _cartService: CartService,
    private _loginService: LoginService,
    private _addressService :AddressService
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
      
      setTimeout(() => {
        new Cleave('#cc-number', {
         creditCard: true,
         onCreditCardTypeChanged: function (type:any) {
           // update UI ...
         }  
        });
        new Cleave('#cc-exp-date', {
          date: true,
          datePattern: ['m', 'y']
        });

        var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
      });

      this.get_address_main();

      if (this.paypalElement && this.paypalElement.nativeElement) {
      paypal.Buttons({
        style: {
            layout: 'horizontal'
        },
        createOrder: (data:any,actions:any)=>{
    
            return actions.order.create({
              purchase_units : [{
                description : 'Nombre del pago',
                amount : {
                  currency_code : 'USD',
                  value: 999
                },
              }]
            });
          
        },
        onApprove : async (data:any,actions:any)=>{
          const order = await actions.order.capture();
    
          
        },
        onError :(_error: Error) =>{
         
        },
        onCancel: function (data:any,actions:any){
          
        }
      }).render(this.paypalElement.nativeElement);
      }
    
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

  get_address_main(){
    if(this.token)
    this._addressService.get_address_main(this.users.id, this.token).subscribe(
      response => {
        console.log(response);
        this.address = response;
      },
      error => {
        console.log(error);
      }
      );
  
  }

  calcular_total(){
    this.total_apagar = this.subtotal + this.price_envio;
  }
}