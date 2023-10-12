import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
declare var tns: any;
declare var lightGallery: any;
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  public product: any = {
    galerys: [],
  };
  public products: any = {};
  public id: any;
  public cart: any = {
    amount: '',
    productId: '',
    userId: '',
  };
  public token;
  public userdata: any;
  public btn_cart = false;

  constructor(
    private _router: ActivatedRoute,
    private _productService: ProducService,
    private _cartService: CartService,
    private _loginService: LoginService,
    private _routers: Router
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit(): void {
    //Efecto de carga de la página
    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: 'top',
        controlsPosition: 'top',
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: '#cs-thumbnails',
        navAsThumbnails: true,
        gutter: 15,
      });
      var e = document.querySelectorAll('.cs-gallery');
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], {
            selector: '.cs-gallery-item',
            download: !1,
            videojs: !0,
            youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 },
            vimeoPlayerParams: { byline: 0, portrait: 0 },
          });
        }
      }
      tns({
        container: '.cs-carousel-inner-two',
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: 'top',
        controlsPosition: 'top',
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: '#custom-controls-related',
        responsive: {
          0: {
            items: 1,
            gutter: 20,
          },
          480: {
            items: 2,
            gutter: 24,
          },
          700: {
            items: 3,
            gutter: 24,
          },
          1100: {
            items: 4,
            gutter: 30,
          },
        },
      });
    }, 1100);
    this.get_id();
    this.lis_products();
  }

  //Obtener el id del producto
  get_id() {
    this._router.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this._productService.get_product_public(this.id).subscribe(
        (response) => {
          this.product = response;
          console.log(this.product);
          console.log(this.product.frontpage);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  //Listar productos
  lis_products() {
    this._productService.list_products_public('').subscribe(
      (response) => {
        console.log(response);
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Agregar al carrito
  add_product_cart() {
    var userJSON = JSON.parse(localStorage.getItem('user') || '{}');
    this.userdata = userJSON.id;
    console.log(this.userdata);

    if (this.cart.amount === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter the amount',
      });
    } else if (this.cart.amount <= this.product.stock) {
      let data = {
        amount: this.cart.amount,
        productId: this.product.id,
        userId: this.userdata,
      };

      this.btn_cart = true;

      if (this.token) {
        this._cartService.create_cart(data, this.token).subscribe(
          (response: any) => {
            console.log(response);

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
              icon: 'success',
              title: 'Product added to cart',
            });

            this.btn_cart = false;
          },
          (error: any) => {
            console.log(error);
          }
        );
      } else if (!this.token) {
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
          icon: 'error',
          title: 'You must log in to add products to the cart',
        });

        this._routers.navigate(['/login']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          'The maximum quantity available is ' + this.product.stock + ' units',
      });
    }
  }
}
