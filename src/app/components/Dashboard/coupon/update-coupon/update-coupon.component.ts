import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.scss']
})
export class UpdateCouponComponent implements OnInit{
  
    
  public coupon = {
    type: '',
    code: '',
    value: '',
    limit: '',
  };
  public load_btn = false;
  public token;
  public id: any;
  constructor(private _loginService: LoginService,
    private _couponService: CouponService,
    private _router: Router,
    private _route: ActivatedRoute, ) {
    this.token= this._loginService.getToken();
   }

    ngOnInit(): void {
      this._route.params.subscribe(params => {
        this.id = params['id'];
        if (this.token) {
          this._couponService.get_coupon(this.id, this.token).subscribe(
            (couponResponse: any) => {
              if (couponResponse) {
                this.coupon = couponResponse;
                console.log(this.coupon);
              } else {
                // Manejar el caso de respuesta indefinida
                console.error('El cupón no pudo ser cargado.');
              }
            },
            error => {
              // Manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario
              console.error('Error al cargar el cupón:', error);
            }
          );
        }
      });
    
    }

  actualizar(actualizarForm:NgForm){
    if(actualizarForm.valid){
      console.log(actualizarForm.value)
      this.load_btn=true;
      if(this.token)
      this._couponService.update_coupon(this.id,this.coupon,this.token).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Coupon actualizado con éxito.',
          });
          this.load_btn=false;
          this._router.navigate(['/index/coupon']);
        },
        error => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Erro al registrar el coupon.',
          });
        }
      );
     }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Formulario no Valido',
        });
  
     }
    }

}
