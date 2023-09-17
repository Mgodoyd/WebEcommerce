import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { IProduct } from '../Entities/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProducService {

  public url: string;;

    constructor(private _http: HttpClient,
      private _router: Router){
        this.url = GLOBAL.url;
      }

            list_products(token: string): Observable<any> {
                let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
                return this._http.get(this.url + '/products', {headers: headers});
            }
            
            create_product(data: IProduct, file: any, token: string): Observable<any> {
                let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
                const formData = new FormData();
                formData.append('frontpage', file); // Adjuntar la imagen
            
                return this._http.post(this.url + '/products',data, {headers: headers});
            }
    }