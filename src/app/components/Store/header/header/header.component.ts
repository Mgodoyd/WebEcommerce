import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public token;
  public id;
  public userData:any;
  public users: any = null;
  public categories : any = {}
  public op_cart = false;

  constructor(
    private _login_cliente: LoginService,
    private _userService : UserService,
    private _configService : ConfigService
  ) { 
    
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  
  logout() {
    this._login_cliente.logout();
  }
 

  ngOnInit(): void {
    this._configService.list_categorys_public().subscribe(
      (data) => {
        console.log(data);
        this.categories = data;
      }
      );

    if (this.id !== null) {
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.userData = response;
          console.log(this.userData);
          localStorage.setItem('user', JSON.stringify(this.userData));
          if (localStorage.getItem('user')) {
            this.users = JSON.parse(localStorage.getItem('user') || '{}');
            console.log(this.users);
          } else {
            this.users = ''; 
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  op_modalcart(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

}
