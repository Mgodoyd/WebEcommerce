import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private authService: LoginService){

  }
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  
  logout() {
    this.authService.logout();
  }
}
