import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public token;
  public users: any = null;
  public id:any;

  constructor(private authService: LoginService,
    private _userService : UserService,
    private _saleService : SalesService){
    this.token = this.authService.getToken();
  }
 
  ngOnInit(): void {
  
    this.id = localStorage.getItem('id');
    if (this.id !== null) {
      this._userService.get_user_public(this.id).subscribe(
        (response) => {
          console.log(response);
          this.users = response;
          console.log(this.users);
         
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  logout() {
    this.authService.logout();
  }

}
