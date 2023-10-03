import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-detalle-sale',
  templateUrl: './detalle-sale.component.html',
  styleUrls: ['./detalle-sale.component.scss']
})
export class DetalleSaleComponent implements OnInit {

  public id: any;
  public userData: any;
  public users: any = null;
  public token;
  public orders: any = {
    address: {},
    nsale: [],
  };
  public products : any =[];
  public load_data= true

  constructor(
    private _loginService : LoginService,
    private _saleService: SalesService,
    private _route: ActivatedRoute
  ) {
    this.token= this._loginService.getToken();
   }
  ngOnInit(): void {
   this.get_order_detail();
  }

  get_order_detail(){
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.token){
      this._saleService.get_order_detail(this.id,this.token).subscribe(
        (response) => {
          console.log(response);
          this.orders = response;
          this.products = this.orders.nsale;
          console.log(this.products);
          this.load_data = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
