import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { ICliente } from '../Entities/ICliente';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;;

    constructor(private _http: HttpClient,
      private _router: Router){
        this.url = GLOBAL.url;
      }
 
      list_users(token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User', {headers: headers});
      }

      get_user_admin(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User/admin/'+id, {headers: headers});
      }
      get_user(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/User/'+id, {headers: headers});
      }

      get_user_public(id:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.get(this.url + '/User/'+id, {headers: headers});
      }
      create_user(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/User',data, {headers: headers});
      }

      update_user(id:any,data:ICliente): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.put(this.url + '/User/'+id,data, {headers: headers});
      }
      delete_user(id:ICliente,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/User/'+id, {headers: headers});
      }
      
      create_address(data:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.post(this.url + '/Address',data, {headers: headers});
      }
}
