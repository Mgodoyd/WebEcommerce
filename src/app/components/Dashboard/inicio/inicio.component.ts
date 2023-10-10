import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SalesService } from 'src/app/services/sales.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  public token;
  public myChart: Chart | undefined;
  public orderData: { state: string; total: number }[] = [];
  public order = {
    totalVentas: 0,
  };
  public order_ = {
    totalVentas: 0,
    totalCancelado: 0,
  };
  public orders = {
    totalVentas: 0,
  };
  public orders3 = {
    totalVentasCompletado: 0,
  };

  public resto: any;
  constructor(
    private authService: LoginService,
    private _saleService: SalesService
  ) {
    this.token = this.authService.getToken();
  }

  ngOnInit() {
    this.init_data();
    this.getAllSale();
    this.get_total_vendido();
    this.get_total_sales();
    this.get_total();
  }

  //Método para obtener todas las ventas en cantidad y estado
  getAllSale() {
    if (this.token) {
      this._saleService.get_sales(this.token).subscribe(
        (response: any[]) => {
          console.log(response);
          this.orderData = response.map((order: any) => ({
            state: order.state,
            total: order.total,
          }));
          console.log(this.orderData);
          // Calcula el recuento de órdenes por estado
          const orderCounts: { [key: string]: number } = {};
          this.orderData.forEach((order) => {
            if (order.state in orderCounts) {
              orderCounts[order.state]++;
            } else {
              orderCounts[order.state] = 1;
            }
          });

          this.renderChart(orderCounts);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Método para obtener todas las ventas
  init_data() {
    if (this.token) {
      this._saleService.get_total_sales(this.token).subscribe(
        (response) => {
          console.log(response);
          this.orders3 = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Método para renderizar el gráfico
  renderChart(orderCounts: { [key: string]: number }) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (canvas !== null) {
      const ctx = canvas.getContext('2d');
      if (ctx !== null) {
        const estados = [
          ...new Set(this.orderData.map((order) => order.state)),
        ];
        const totales = Object.values(orderCounts);

        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: estados,
            datasets: [
              {
                label: 'Orders by State',
                data: totales,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }

  //Método para obtener el  total de ventas
  get_total_vendido() {
    if (this.token)
      this._saleService.get_total_sales(this.token).subscribe(
        (response) => {
          console.log(response);
          this.order = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Método para obtener el monto total de ventas venidas
  get_total_sales() {
    if (this.token)
      this._saleService.get_total_vendido(this.token).subscribe(
        (response) => {
          console.log(response);
          this.order_ = response;
          console.log(this.order_);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Método para obtener el monto total de ventas finalizadas estado Entregado
  get_total() {
    if (this.token)
      this._saleService.get_total_sales_final(this.token).subscribe(
        (response) => {
          console.log(response);
          this.orders = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
