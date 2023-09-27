import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducService } from 'src/app/services/product.service';
 declare var tns:any;
 declare var lightGallery:any;
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
   
  public product : any = {
    galerys: [],
  }
  public products : any ={}
  public id:any;

     constructor( private _router:ActivatedRoute,
      private _productService: ProducService,) { }

  ngOnInit(): void {
   setTimeout(() => {
    tns({
      container: '.cs-carousel-inner',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      navContainer: "#cs-thumbnails",
      navAsThumbnails: true,
      gutter: 15,
    });
    var e = document.querySelectorAll(".cs-gallery");
    if (e.length){
      for (var t = 0; t < e.length; t++){
        lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
      }
    }
    tns({
      container: '.cs-carousel-inner-two',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      nav: false,
      controlsContainer: "#custom-controls-related",
      responsive: {
        0: {
          items: 1,
          gutter: 20
        },
        480: {
          items: 2,
          gutter: 24
        },
        700: {
          items: 3,
          gutter: 24
        },
        1100: {
          items: 4,
          gutter: 30
        }
      }
    });
    }, 1000);
    this.get_id();
    this.lis_products();
  }

  get_id(){
    this._router.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
        this._productService.get_product_public(this.id).subscribe(
          response => {
            this.product = response;
            console.log(this.product);
            console.log(this.product.frontpage);
          }
          ,
          error => {
            console.log(error);
          }
        );
      }
    );
  }

  lis_products(){
    this._productService.list_products_public('').subscribe(
      response=>{
        console.log(response);
        this.products = response;
      },
      error=>{
        console.log(error);
      }
      );
  }
}
