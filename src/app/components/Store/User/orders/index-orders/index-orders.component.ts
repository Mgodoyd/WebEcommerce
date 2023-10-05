import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index-orders',
  templateUrl: './index-orders.component.html',
  styleUrls: ['./index-orders.component.scss']
})
export class IndexOrdersComponent implements OnInit{
  public id: any;
  public userData: any;
  public users: any = null;
  public token;
  public orders= Array();
  public load_data = true
  public page =1;
  public pageSize = 5;

  constructor(
    private _userService: UserService,
    private _loginService : LoginService,
    private _saleService: SalesService
  ) {
    this.token= this._loginService.getToken();
   }

  ngOnInit() {
    // Obtén el id del usuario de localStorage
    this.id = localStorage.getItem('id');

    if (this.id !== null) {
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          // Actualiza users con los datos del usuario
          this.users = JSON.parse(localStorage.getItem('user') || '{}');
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.init_orders();
  }

  init_orders(){
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
   if(this.token)
   this._saleService.get_order(this.users.id,this.token).subscribe(
    (response) => {
      console.log(response);
      this.orders = response;
      this.load_data = false
    },
    (error) => {
      console.log(error);
    });
  }

 
}
