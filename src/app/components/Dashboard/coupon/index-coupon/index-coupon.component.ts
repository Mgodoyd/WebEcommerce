import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-index-coupon',
  templateUrl: './index-coupon.component.html',
  styleUrls: ['./index-coupon.component.scss'],
})
export class IndexCouponComponent implements OnInit {
  public coupon: Array<any> = [];

  public page = 1;
  public pageSize = 6;

  public token;
  public load_data = true;

  public filtro = '';
  public noResultados = false;

  constructor(
    private _loginSerivce: LoginService,
    private _couponService: CouponService
  ) {
    this.token = this._loginSerivce.getToken();
  }

  ngOnInit(): void {
    this.listCoupon();
  }

  //Método para filtrar los resultados
  filtrar(): void {
    if (this.filtro) {
      const filtroLowerCase = this.filtro.toLowerCase();
      const resultadosFiltrados = this.coupon.filter((cupon) =>
        cupon.code.toLowerCase().includes(filtroLowerCase)
      );

      if (resultadosFiltrados.length === 0) {
        this.noResultados = true;
      } else {
        this.noResultados = false;
      }

      this.coupon = resultadosFiltrados;
    } else {
      this.listCoupon();
      this.noResultados = false; // Asegúrate de restablecer esta variable cuando no haya filtro
    }
  }

  //Método para listar los cupones
  listCoupon() {
    if (this.token) {
      this._couponService.list_coupons(this.token).subscribe(
        (response) => {
          this.coupon = response;
          console.log(response);
          this.load_data = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Server error.',
        icon: 'error',
      });
    }
  }

  closeModal(id:any){
    $('#delete-' + id).modal('hide');
  }
  //Método para eliminar un cupon
  eliminar(id: any) {
    if (this.token !== null && this.token !== undefined) {
      this._couponService.delete_couon(id, this.token).subscribe(
        (response) => {
          console.log(response);

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
            text: 'Coupon successfully removed.',
          });


          $('#delete-' + id).modal('hide');
          $('.model-backdrop').hide();

          this.listCoupon();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Server Error.',
      });
    }
  }
}
