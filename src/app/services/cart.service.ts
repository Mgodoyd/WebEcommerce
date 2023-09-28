import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public url: string;;

  constructor(private _http: HttpClient,
    private _router: Router){
      this.url = GLOBAL.url;
    }

      create_cart(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Cart',data, {headers: headers});
      }

      get_cart(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Cart/user/'+id, {headers: headers});
      }

      delete_cart(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/Cart/'+id, {headers: headers});
      }
}
