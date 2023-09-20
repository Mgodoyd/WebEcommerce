import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {
  public url: string;;

  constructor(private _http: HttpClient,
    private _router: Router){
      this.url = GLOBAL.url;
    }
    
        list_inventary(id:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Inventory/'+id, {headers: headers});
        }
        get_inventary(id:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Inventory/'+id, {headers: headers});
        }
        create_inventory(data:any, token: string): Observable<any> {
          let headers = new HttpHeaders({'Authorization': token});
          const formData = new FormData();
          formData.append('amount', data.amount);
          formData.append('supplier', data.supplier);
          return this._http.post(this.url + '/Inventory', formData, {headers: headers});
        }
        update_inventory(id:any,data:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.put(this.url + '/Inventory/'+id, data, {headers: headers});
        }
}
