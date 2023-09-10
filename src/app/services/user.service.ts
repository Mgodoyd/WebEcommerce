import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { ICliente } from '../Entities/ICliente';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public url: string;;

    constructor(private _http: HttpClient,
      private _router: Router){
        this.url = GLOBAL.url;
      }

      list_clientes(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Client', {headers: headers});
      }

      create_clientes(data:ICliente,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Client',data, {headers: headers});
      }
      
      list_admins(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Admin', {headers: headers});
      }
      
}
