import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public url: string;
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

    create_sale(data:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.post(this.url + '/Sale',data, {headers: headers});
    }

    get_order(id:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale/user/'+id, {headers: headers});
    }

    get_order_detail(id:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale/'+id, {headers: headers});
    }

    get_sales(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale', {headers: headers});
    }
    
    get_total_sales(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale/totalVentas', {headers: headers});
    }

    get_total_vendido(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale/totalVendido', {headers: headers});
    }

    get_Sale(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale', {headers: headers});
    }

    get_total_sales_final(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Sale/total', {headers: headers});
    }
}
