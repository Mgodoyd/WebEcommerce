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
      return this._http.get(this.url + '/Config/'+5, {headers: headers});
    }

    update_config(data: any, token: string): Observable<any> {
      let headers = new HttpHeaders({ 'Authorization': token });
      const formData = new FormData();
      
      // Aquí adjunta el archivo con el nombre "Image" en el formulario
      formData.append('ImageFile', data.logo);
      formData.append('title', data.title);
      formData.append('serie', data.serie);
      formData.append('correlative', data.correlative);
      
      return this._http.put(this.url + '/Config/' + 5, formData, { headers: headers });
    }
    

    list_categorys(token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.get(this.url + '/Category', {headers: headers});
    }
    create_category(data:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.post(this.url + '/Category',data, {headers: headers});
    }

    delete_category(id:any,token: string): Observable<any> {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this._http.delete(this.url + '/Category/'+id, {headers: headers});
    }

}
