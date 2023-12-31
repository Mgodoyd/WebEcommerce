import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
})
export class CreateCouponComponent implements OnInit {
  public coupon = {
    type: '',
    code: '',
    value: '',
    limit: '',
  };
  public load_btn = false;
  public token;
  constructor(
    private _loginService: LoginService,
    private _couponService: CouponService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit() {}

  // Funcion para crear un cupon
  registro(registroForm: NgForm) {
    if (registroForm.valid) {
      console.log(this.coupon);
      this.load_btn = true;
      if (this.token)
        this._couponService.create_coupon(this.coupon, this.token).subscribe(
          (response) => {
            console.log(response);
            this.load_btn = false;
            Swal.fire({
              icon: 'success',
              title: 'Coupon creado!',
              text: 'The coupon was created correctly',
            });
            registroForm.reset();
            setTimeout(() => {
              this._router.navigate(['/index/coupon']);
            }, 1000);
          },
          (error) => {
            console.log(error);
            this.load_btn = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'All fields are required!',
            });
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
    }
  }
}
