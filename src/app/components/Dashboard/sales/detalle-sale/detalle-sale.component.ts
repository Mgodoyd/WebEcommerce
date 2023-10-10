import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-sale',
  templateUrl: './detalle-sale.component.html',
  styleUrls: ['./detalle-sale.component.scss'],
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
  public products: any = [];
  public load_data = true;

  constructor(
    private _loginService: LoginService,
    private _saleService: SalesService,
    private _route: ActivatedRoute
  ) {
    this.token = this._loginService.getToken();
  }
  ngOnInit(): void {
    this.get_order_detail();
  }

  //Método para obtener el detalle de la orden
  get_order_detail() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.token) {
      this._saleService.get_order_detail(this.id, this.token).subscribe(
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

  //Método para enviar el pedido
  enviar_pedido(id: any) {
    Swal.fire({
      title: '¿Confirma el pago del pedido?',
      text: 'El pedido será enviado al cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó, ahora puede enviar el pedido y cambiar el estado
        let data: any;
        data = this.orders;
        data.state = 'En Tránsito';

        if (this.token) {
          this._saleService.send_order(id, data, this.token).subscribe(
            (response) => {
              console.log(response);
              this.get_order_detail();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                text: 'Order sent!',
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    });
  }
}
