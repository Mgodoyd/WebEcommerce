import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public url: string;;

  constructor(private _http: HttpClient){
      this.url = GLOBAL.url;
    }

      //Servicio para mi Entidad Cart

      // Servicio para crear un Cart
      create_cart(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Cart',data, {headers: headers});
      }

      // Servicio para obtener un Cart por id
      get_cart(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Cart/user/'+id, {headers: headers});
      }

      // Servicio para eliminar un Cart
      delete_cart(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/Cart/'+id, {headers: headers});
      }
}
