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

        // Servicio de mi Entidad Ventas

        // Servicio para crear una venta
        create_sale(data:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.post(this.url + '/Sale',data, {headers: headers});
        }

        // Servicio para obtener una venta por id de usuario
        get_order(id:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale/user/'+id, {headers: headers});
        }

        // Servicio para obtener una venta por id 
        get_order_detail(id:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale/'+id, {headers: headers});
        }

        // Servicio para obtener todas las ventas
        get_sales(token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale', {headers: headers});
        }

        // Servicio para obtener todas las ventas        
        get_total_sales(token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale/totalVentas', {headers: headers});
        }

        // Servicio para obtener total monto vendido
        get_total_vendido(token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale/totalVendido', {headers: headers});
        }

        // Servicio para obtener una venta 
        get_Sale(token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale', {headers: headers});
        }

        // Servicio para obtener todas la ventas sin importar el estado
        get_total_sales_final(token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Sale/total', {headers: headers});
        }

        // Servicio para obtener todas la ventas cuando el estado es Entregado
        send_order(id:any,data:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.put(this.url + '/Sale/'+id,data, {headers: headers});
        }
}
