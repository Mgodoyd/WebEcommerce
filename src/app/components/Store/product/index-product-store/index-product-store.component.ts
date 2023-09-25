import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public product : Array<any> = [];
  public load_data = true;

  constructor(private _configService : ConfigService,
    private _productService : ProducService) { }

  ngOnInit(): void {
  this._configService.list_categorys_public().subscribe(
    (data) => {
      console.log(data);
      this.categories = data;
    }
    );
    this._productService.list_products_public(this.filter_category).subscribe(
      (response) => {
        console.log(response);
        this.product = response;
        this.load_data = false;
      }
      );
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


}
