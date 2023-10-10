import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-index-sales',
  templateUrl: './index-sales.component.html',
  styleUrls: ['./index-sales.component.scss'],
})
export class IndexSalesComponent implements OnInit {
  public sales = Array();
  public token;
  public page = 1;
  public pageSize = 5;

  constructor(
    private _loginService: LoginService,
    private _salesService: SalesService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
    //Método para obtener todas las ventas
    if (this.token)
      this._salesService.get_sales(this.token).subscribe(
        (response) => {
          console.log(response);
          this.sales = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
