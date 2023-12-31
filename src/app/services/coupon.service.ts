import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public url: string;;

    constructor(private _http: HttpClient,){
        this.url = GLOBAL.url;
      }

      //Servicio para mi Entidad Coupon

      // Servicio para listar todos los Coupons
      list_coupons(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Coupon', {headers: headers});
      }

      // Servicio para obtener un Coupon por id
      get_coupon(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Coupon/'+id, {headers: headers});
      }

      // Servicio para validar un cupon
      get_coupon_validate(tokens:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Coupon/validate/'+tokens, {headers: headers});
      } 

      // Servicio para crear un Coupon
      create_coupon(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Coupon',data, {headers: headers});
      }

      // Servicio para actualizar un Coupon
      update_coupon(id:any,data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.put(this.url + '/Coupon/'+id,data, {headers: headers});
      }

      // Servicio para eliminar un Coupon
      delete_couon(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/Coupon/'+id, {headers: headers});
      }
}
