import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit{
  
  public token;
  public id:any;
  public config : any ={};
  public title_cat='';
  public icon_cat='';
  public category:any= {};

  constructor(private _loginService: LoginService,
    private _configService: ConfigService,) { 
   this.token = this._loginService.getToken();
  }


  ngOnInit(): void {
    this.listConfig();
    this.listCategorys();
  }

  listConfig() {
    if (this.token) {
      this._configService.get_config(this.token).subscribe(
        response => {
          console.log(response);
          this.config = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  listCategorys() {
    if (this.token) {
      this._configService.list_categorys(this.token).subscribe(
        response => {
          console.log(response);
          this.category = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  registro(){
      if(this.token){
      this._configService.create_category(this.category,this.token).subscribe(
        response => {
          console.log(response);
          this.listCategorys();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Category registrada con éxito.',
          });
        },
        error => {
          console.log(error);
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios!',
      })
    }
  
  }
}
