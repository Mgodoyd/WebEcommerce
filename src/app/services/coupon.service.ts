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

      list_coupons(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Coupon', {headers: headers});
      }

      get_coupon(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Coupon/'+id, {headers: headers});
      }
      create_coupon(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Coupon',data, {headers: headers});
      }

      update_coupon(id:any,data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.put(this.url + '/Coupon/'+id,data, {headers: headers});
      }

      delete_couon(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/Coupon/'+id, {headers: headers});
      }
}
