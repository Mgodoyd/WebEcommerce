import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-orders',
  templateUrl: './detalle-orders.component.html',
  styleUrls: ['./detalle-orders.component.scss']
})
export class DetalleOrdersComponent implements OnInit {
  public id: any;
  public userData: any;
  public users: any = null;
  public token;
  public orders: any = {
    address: {},
    nsale: [],
  };
  public products : any = {};
  public load_data= true; 

  constructor(
    private _userService: UserService,
    private _loginService : LoginService,
    private _saleService: SalesService,
    private _route: ActivatedRoute
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
  
  received_order(id:any){

      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Confirmas de Recibido el pedido!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4dbd74',
        cancelButtonColor: '#f5365c',
        confirmButtonText: 'Si, recibido!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data: any;
          data = this.orders
          data.state = 'Entregado'
      
          if(this.token)
          this._saleService.send_order(id,data,this.token).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            });
        }
      })
      
    }

    cancel_order(id:any){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡De Cancelar el pedido!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4dbd74',
        cancelButtonColor: '#f5365c',
        confirmButtonText: 'Si, cancelar!'
      }).then((result) => {
        if (result.isConfirmed) {
          let data: any;
          data = this.orders
          data.state = 'Cancelado'
      
          if(this.token)
          this._saleService.send_order(id,data,this.token).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            });
        }
      })
    }
}
