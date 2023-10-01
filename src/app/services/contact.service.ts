import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url: string;;

    constructor(private _http: HttpClient,
      private _router: Router){
        this.url = GLOBAL.url;
      }
 

      create_contact(data:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post(this.url + '/Contact',data, {headers: headers});
      }

      get_contact(token:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Contact', {headers: headers});
      }

      update_contact(data:any, id:any,token:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.put(this.url + '/Contact/' + id,data, {headers: headers});
      }
}
