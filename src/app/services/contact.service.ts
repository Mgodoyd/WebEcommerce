import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url: string;;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
      }
         //Servicio para mi Entidad Contact

         // Servicio para crear un Contact
        create_contact(data:any): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json'});
          return this._http.post(this.url + '/Contact',data, {headers: headers});
        }

        // Servicio para listar todos los Contacts
        get_contact(token:any): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Contact', {headers: headers});
        }

        // Servicio para actualizar un Contact
        update_contact(data:any, id:any,token:any): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.put(this.url + '/Contact/' + id,data, {headers: headers});
        }
}
