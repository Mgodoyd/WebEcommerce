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
            
            create_product(data:any,file: File, token: string): Observable<any> {
              let headers = new HttpHeaders({'Authorization': token});
              const formData = new FormData();
              formData.append('title', data.title);
              formData.append('description', data.description);
              formData.append('price', data.price);
              formData.append('category', data.category.toString());
              formData.append('state', data.state.toString());
              formData.append('content', data.content);
              formData.append('stock',data.stock.toString());
              formData.append('ImageFile', file);
           //   formData.append('inventory.amount',data.inventory.amount.toString());
              formData.append('inventory.supplier',data.inventory.supplier.toString());
            
              return this._http.post(this.url + '/products', formData, {headers: headers});
            }

            get_product(id:IProduct,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.get(this.url + '/products/'+id, {headers: headers});
            }

            update_product(id:IProduct,data:any,token: string): Observable<any> {
              if(data.frontpage){
                let headers = new HttpHeaders({'Authorization': token});
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('category', data.category.toString());
                formData.append('state', data.state.toString());
                formData.append('content', data.content);
                formData.append('stock',data.stock.toString());
                formData.append('ImageFile', data.frontpage);

                console.log(formData.getAll('ImageFile'));
              
                return this._http.put(this.url + '/products/'+id, formData, {headers: headers});
              }else{
                let headers = new HttpHeaders({'Authorization': token});
                return this._http.put(this.url + '/products/'+id, data, {headers: headers});
              }
            }
            
            delete_product(id:IProduct,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.delete(this.url + '/products/'+id, {headers: headers});
            }

            list_category(): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json'});
              return this._http.get(this.url + '/Category/public', {headers: headers});
          }
    }