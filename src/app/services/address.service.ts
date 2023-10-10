import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public url: string;
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

          //Servicio para mi Entidad Address

          // Servicio para crear un Address
          create_address(data:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.post(this.url + '/Address',data, {headers: headers});
          }

          // Servicio para listar todos los Address de un usuario por id
          get_addresss_user(id:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.get(this.url + '/Address/User/'+id, {headers: headers});
          }

          // Servicio para obtener un Address por id
          get_address(id:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.get(this.url + '/Address/'+id, {headers: headers});
          }

          // Servicio para obtener la direccion principal de un usuario por id
          get_address_main(id:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.get(this.url + '/Address/address/'+id, {headers: headers});
          }

          // Servicio para actualizar un Address
          update_address(id:any,data:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.put(this.url + '/Address/'+id,data, {headers: headers});
          }

          // Servicio para eliminar un Address
          delete_address(id:any,token: string): Observable<any> {
            let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
            return this._http.delete(this.url + '/Address/'+id, {headers: headers});
          }
}
