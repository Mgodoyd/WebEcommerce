import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import { ProducService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-product-store',
  templateUrl: './index-product-store.component.html',
  styleUrls: ['./index-product-store.component.scss']
})
export class IndexProductStoreComponent implements OnInit {
  public categories : any = {}
  public filter_category ='';
  public filter_product ='';  
  public product : Array<any> = [];
  public products: Array<any> = [];
  public filter_cat_product = 'todos';
  public load_data = true;
  public route_category:any;
  public page =1;
  public pageSize = 5;
  public sort_by='Defecto';
  public cart : any = {
    amount: '',
    productId: '',
    userId:'',
  };
  public token;
  public userdata:any;
  public btn_cart = false;
  constructor(private _configService : ConfigService,
    private _productService : ProducService,
    private _router : ActivatedRoute,
    private _loginService : LoginService,
    private _cartService : CartService,
    private _routers : Router) { 
      this.token = this._loginService.getToken();
    }

  ngOnInit(): void {
  this._configService.list_categorys_public().subscribe(
    (data) => {
      console.log(data);
      this.categories = data;
    }
    );

    this._router.params.subscribe(params => {
      this.route_category = params['category'];
      console.log(this.route_category);
      
      if(this.route_category){
        this._productService.list_products_public('').subscribe(
          (response) => {
            console.log(response);
            this.product = response;
            this.product = this.product.filter((product:any) => product.category.titles.toLowerCase() == this.route_category);
            this.load_data = false;
          }
          );
      }else{
        this._productService.list_products_public('').subscribe(
          (response) => {
            console.log(response);
            this.product = response;
            this.load_data = false;
          }
          );
      }
    });
}


search_Category(){
 if(this.filter_category){
  var search = new RegExp(this.filter_category, 'i');
  this.categories = this.categories.filter((category:any) => search.test(category.titles));
 }else{
  this._configService.list_categorys_public().subscribe(
    (data) => {
      console.log(data);
      this.categories = data;
    }
    );
 }
}
Search_product() {
  if (this.filter_product) {
    var search = new RegExp(this.filter_product, 'i');
    this.product = this.product.filter((product: any) => search.test(product.title));
  } else {
    // En caso de que no haya filtro, puedes cargar los productos nuevamente.
    this.load_data = true;
    this._productService.list_products_public(this.filter_category).subscribe(
      (response) => {
        console.log(response);
        this.product = response;
        this.load_data = false;
      }
    );
  }
}

buscar_por_categoria(){
  if(this.filter_cat_product == 'todos'){
    this._productService.list_products_public(this.filter_product).subscribe(
      response=>{
        console.log(response);
        this.product = response;
        this.load_data = false;
  }
    );
}else{
  this._productService.list_products_public(this.filter_product).subscribe(
    (response) => {
      console.log(response);
      this.product = response;
      this.product = this.product.filter((product:any) => product.category.titles == this.filter_cat_product);
      this.load_data = false;
    }
  );
  }

}

reset_products(){
  this.filter_product = '';
  this._productService.list_products_public('').subscribe(
    (response) => {
      console.log(response);
      this.product = response;
      this.load_data = false;
    }
    );
}
orden_por() {
  if (this.sort_by === 'Defecto') {
    this._productService.list_products_public('').subscribe(
      (response) => {
        console.log(response);
        this.product = response;
        this.load_data = false;
      }
    );
  } else if (this.sort_by === 'Popularidad') {
    this.product.sort((a, b) => {
      return b.sales - a.sales; // Ordenar por popularidad de mayor a menor
    });
  } else if (this.sort_by === '+-Precio') {
    this.product.sort((a, b) => {
      return a.price - b.price; // Ordenar por precio de menor a mayor
    });
  } else if (this.sort_by === '-+Precio') {
    this.product.sort((a, b) => {
      return b.price - a.price; // Ordenar por precio de mayor a menor
    });
  } else if (this.sort_by === 'azTitulo') {
    this.product.sort((a, b) => {
      return a.title.localeCompare(b.title); // Ordenar alfabéticamente de la A a la Z
    });
  } else if (this.sort_by === 'zaTitulo') {
    this.product.sort((a, b) => {
      return b.title.localeCompare(a.title); // Ordenar alfabéticamente de la Z a la A
    });
  }
  // Actualizar la vista después de ordenar
  this.load_data = false;
}

add_product_cart(index: number) {
  var userJSON = JSON.parse(localStorage.getItem('user') || '{}');
  this.userdata = userJSON.id;
  console.log(this.userdata);

  this.cart.amount = 1;
  console.log(index)
  if (this.cart.amount <= this.product[0].stock) {
    console.log(this.product[0].stock);

    let data = {
      amount: this.cart.amount,
      productId: index,
      userId: this.userdata,
    };

    this.btn_cart = true;
    console.log(data);

    if (this.token) {
      this._cartService.create_cart(data, this.token).subscribe(
        (response: any) => {
          console.log(response);

          Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
          });

          this.btn_cart = false;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else if(!this.token) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Debes iniciar sesión para agregar productos al carrito'
      })
      this._routers.navigate(['/login']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La máxima cantidad disponible es ' + this.product[0].stock + ' unidades',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese la cantidad',
    });
  }
}



}

