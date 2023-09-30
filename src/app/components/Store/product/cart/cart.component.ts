import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import Swal from 'sweetalert2';

declare var Cleave:any;
declare var StickySidebar:any;
declare var paypal:any;



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
  public sale : any = {
    nsale : []
  };
  public envio1 = 'free';
  public envio2 = 'express';
  public amount :any;
  public error_coupon = '';

  constructor(
    private _cartService: CartService,
    private _loginService: LoginService,
    private _addressService :AddressService,
    private _saleService : SalesService,
    private _router:Router
  ) { 
    this.token = _loginService.getToken();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.sale.userId = this.users.id;
    this.amount = 1;
  }

  handler:any = null;

  ngOnInit(): void {
    if(this.token)
    this._cartService.get_cart(this.users.id, this.token).subscribe(
      response => {
        console.log(response);
        this.cart_arr = response;

        this.cart_arr.forEach((element: any) => {
          this.sale.nsale.push ({
            productId : element.products.id,
            subtotal : element.products.price,
            userId : this.users.id,
            amount : this.amount
          });
        });
    
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
                description : 'Store Web',
                amount : {
                  currency_code : 'USD',
                  value: this.total_apagar
                },
              }]
            });
          
        },
        onApprove : async (data:any,actions:any)=>{
          const order = await actions.order.capture();
          this.sale.transaction = order.purchase_units[0].payments.captures[0].id;
          console.log(this.sale);
          this.createSale();
          this._router.navigate(['/']);
        },
        onError :(_error: Error) =>{
          
        },
        onCancel: function (data:any,actions:any){
          
        }
      }).render(this.paypalElement.nativeElement);
    }

    this.loadStripe();
    
  }
  
  createSale(){
              if(this.token)
              this._saleService.create_sale(this.sale, this.token).subscribe(
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
                    title: 'Compra realizada correctamente',
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
                    title: 'Error al realizar la compra',
                  });
                }) ;
  }
  calcular_cart() {
    this.subtotal = 0;
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
        this.sale.addressId = this.address.id;
      },
      error => {
        console.log(error);
      }
      );
  
  }

  calcular_total(title:any){
   // this.subtotal = 0;
    this.total_apagar = this.subtotal + this.price_envio;
    this.sale.subtotal = this.total_apagar;
    this.sale.envio_price = this.price_envio;
    this.sale.envio_title = title;
  }

  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NvqlTAqYvH0uzuSJc17HcjIMGB2J2jfPUSpX7XER13KMtgQhArsBtghJKqXHNBFtNrKZx9loFxFoXtyruJ5XbLW00Kjlpg8ro',
      locale: 'auto',
      token: (token: any) => { 
        console.log(token);
        this.sale.transaction = token.id;
        console.log(this.sale.transaction);
        this.createSale();
       this._router.navigate(['/']);
      }
    });
 
    handler.open({
      name: 'Store Web',
      description: 'Pago de productos',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NvqlTAqYvH0uzuSJc17HcjIMGB2J2jfPUSpX7XER13KMtgQhArsBtghJKqXHNBFtNrKZx9loFxFoXtyruJ5XbLW00Kjlpg8ro',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

  validar_coupon(){
   if(this.sale.coupon){
    if(this.sale.coupon.toString().length >= 25){
      this.error_coupon = '';
    }else{
      this.error_coupon = 'El cupón es incorrecto, debe tener menos de  25 caracteres';
    }
   }else{
    this.error_coupon = 'El cupón no es válido';
   }
  }
}