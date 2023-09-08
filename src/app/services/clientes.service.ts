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

   list_clientes(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/Client', {headers: headers});
  }
}
