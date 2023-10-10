import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { ICliente } from '../Entities/ICliente';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
      }
 
      // Métodos de la Entidad User 

      // Servicio para obtener todos los usuarios
      list_users(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User', {headers: headers});
      }

      // Servicio para obtener un usuario con rol de administrador
      get_user_admin(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User/admin/'+id, {headers: headers});
      }

      // Servicio para obtener un usuario con rol de cliente
      get_user(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User/'+id, {headers: headers});
      }

      // Servicio para obtener un usuario con rol de cliente
      get_user_public(id:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.get(this.url + '/User/'+id, {headers: headers});
      }

      // Servicio para crear un usuario con rol en General
      create_user(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/User',data, {headers: headers});
      }

      // Servicio para actualizar un usuario con rol en General
      update_user(id:any,data:ICliente): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.put(this.url + '/User/'+id,data, {headers: headers});
      }

      // Servicio para actualizar un usuario con rol Admin 
      delete_user(id:ICliente,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/User/'+id, {headers: headers});
      }

      // Servicio para crear dirección de un usuario con rol cliente
      create_address(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Address',data, {headers: headers});
      }
}
