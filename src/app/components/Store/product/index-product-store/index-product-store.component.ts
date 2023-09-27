import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ProducService } from 'src/app/services/product.service';

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
  constructor(private _configService : ConfigService,
    private _productService : ProducService,
    private _router : ActivatedRoute) { }

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


}

