import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url: string;;

  constructor(private _http: HttpClient,
    private _router: Router){
      this.url = GLOBAL.url;
    }

    get_config(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Config/'+2, {headers: headers});
    }

    list_categorys(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Category', {headers: headers});
    }
    create_category(data:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.post(this.url + '/Category',data, {headers: headers});
    }

}
