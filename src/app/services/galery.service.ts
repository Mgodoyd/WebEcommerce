import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleryService {

  public url: string;;

  constructor(private _http: HttpClient){
      this.url = GLOBAL.url;
    }
        //Servicio para mi Entidad Galery
        
        // Servicio para listar todos los Galerys
      list_galery(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.get(this.url + '/Galery/'+id, {headers: headers});
      }

      // Servicio para crear un Galery
      create_galery(data:any, token: string): Observable<any> {
        let headers = new HttpHeaders({'Authorization': token});
        const formData = new FormData();
        formData.append('ImageFile', data.galery);
        formData.append('productId', data.productId);
        return this._http.post(this.url + '/Galery', formData, {headers: headers});
      }

      // Servicio para eliminar un Galery
      delete_galery(id:any,token: string): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
        return this._http.delete(this.url + '/Galery/'+id, {headers: headers});
      }
}
