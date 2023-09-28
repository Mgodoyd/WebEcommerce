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

  create_address(data:any,token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.post(this.url + '/Address',data, {headers: headers});
  }
}
