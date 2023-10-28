import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { CouponService } from 'src/app/services/coupon.service';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import Swal from 'sweetalert2';

declare var Cleave: any;
declare var StickySidebar: any;
declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('paypalButton', { static: true }) paypalElement:
    | ElementRef
    | undefined;
  public token;
  public cart_arr: any = {};
  public users: any = {};
  public subtotal = 0;
  public total_apagar = 0;
  public address: any = {};
  public price_envio = 0;
  public selectedOption: any;
  public sale: any = {
    nsale: [],
  };
  public envio1 = 'free';
  public envio2 = 'express';
  public amount: any;
  public error_coupon = '';
  public descuento = 0;

  constructor(
    private _cartService: CartService,
    private _loginService: LoginService,
    private _addressService: AddressService,
    private _saleService: SalesService,
    private _router: Router,
    private _couponService: CouponService
  ) {
    this.token = _loginService.getToken();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.sale.userId = this.users.id;
    this.amount = 1;
  }

  handler: any = null;

  ngOnInit(): void {
    this.get_cart();
    //Método para validar el formulario de pago con tarjeta
    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type: any) {
          // update UI ...
        },
      });
      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y'],
      });

      var sidebar = new StickySidebar('.sidebar-sticky', { topSpacing: 20 });
    });

    this.get_address_main();

    if (this.paypalElement && this.paypalElement.nativeElement) {
      paypal
        .Buttons({
          style: {
            layout: 'horizontal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Store Web',
                  amount: {
                    currency_code: 'USD',
                    value: this.total_apagar,
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            this.sale.transaction =
              order.purchase_units[0].payments.captures[0].id;
            console.log(this.sale);
            this.createSale();
            setTimeout(() => {
              this._router.navigate(['/']);
              this.get_cart();
            }, 1500);
          },
          onError: (_error: Error) => {},
          onCancel: function (data: any, actions: any) {},
        })
        .render(this.paypalElement.nativeElement);
    }

    this.loadStripe();
  }

  //Método para obtener el carrito
  get_cart() {
    if (this.token)
      this._cartService.get_cart(this.users.id, this.token).subscribe(
        (response) => {
          console.log(response);
          this.cart_arr = response;
          this.cart_arr.forEach((element: any) => {
            const subtotal = element.amount * element.products.price;
            this.sale.nsale.push({
              productId: element.products.id,
              subtotal: subtotal,
              userId: this.users.id,
              amount: element.amount,
            });
          });

          this.calcular_cart();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Método para crear la venta
  createSale() {
    this.sale.subtotal = this.total_apagar;
    if (this.token)
      this._saleService.create_sale(this.sale, this.token).subscribe(
        (response) => {
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
            title: 'Buy made successfully',
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
            title: 'Error when making purchase',
          });
        }
      );
  }

  //Método para calcular el total a pagar
  calcular_cart() {
    this.subtotal = 0; // Inicializa el subtotal a 0

    if (this.cart_arr && this.cart_arr.length > 0) {
      for (const item of this.cart_arr) {
        this.subtotal += item.amount * item.products.price;
      }
    }
    this.total_apagar = this.subtotal;
    console.log(this.subtotal);
  }
  //Método para eliminar un producto del carrito
  delete_cart(id: any) {
    if (this.token)
      this._cartService.delete_cart(id, this.token).subscribe(
        (response) => {
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
            title: 'Product removed correctly',
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

  //Método para obtener la dirección principal
  get_address_main() {
    if (this.token)
      this._addressService
        .get_address_main(this.users.id, this.token)
        .subscribe(
          (response) => {
            console.log(response);
            this.address = response;
            this.sale.addressId = this.address.id;
          },
          (error) => {
            console.log(error);
          }
        );
  }

  //Método para calcular el envío
  calcular_total(title: any) {
    // this.subtotal = 0;
    this.total_apagar = this.subtotal + this.price_envio;
    this.sale.subtotal = this.total_apagar;
    this.sale.envio_price = this.price_envio;
    this.sale.envio_title = title;
  }

  //Método para crear la venta con paypal
  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NvqlTAqYvH0uzuSJc17HcjIMGB2J2jfPUSpX7XER13KMtgQhArsBtghJKqXHNBFtNrKZx9loFxFoXtyruJ5XbLW00Kjlpg8ro',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        this.sale.transaction = token.id;
        console.log(this.sale.transaction);
        this.createSale();
        setTimeout(() => {
          this._router.navigate(['/']);
          this.get_cart();
        }, 1500);
      },
    });

    handler.open({
      name: 'Store Web',
      description: 'Payment for products',
      amount: amount * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NvqlTAqYvH0uzuSJc17HcjIMGB2J2jfPUSpX7XER13KMtgQhArsBtghJKqXHNBFtNrKZx9loFxFoXtyruJ5XbLW00Kjlpg8ro',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }

  //Método para validar el cupón
  validar_coupon() {
    if (this.sale.coupon) {
      if (this.sale.coupon.toString().length >= 25) {
        this.error_coupon = '';
        if (this.token)
          this._couponService
            .get_coupon_validate(this.sale.coupon, this.token)
            .subscribe(
              (response) => {
                console.log(response);
                if (response != null) {
                  this.error_coupon = '';

                  if (response.type == 'valor fijo') {
                    this.descuento = response.value;
                    this.total_apagar = this.subtotal - this.descuento;
                  } else if (response.type == 'Porcentaje') {
                    this.descuento = (this.total_apagar * response.value) / 100;
                    this.total_apagar = this.subtotal - this.descuento;
                  }
                } else {
                  this.error_coupon = 'The coupon is not valid';
                }
              },
              (error) => {
                console.log(error);
                this.error_coupon = 'Server error.';
              }
            );
      } else {
        this.error_coupon =
          'The coupon is incorrect, it must be less than 25 characters';
      }
    } else {
      this.error_coupon = 'The coupon is not valid';
    }
  }
}
