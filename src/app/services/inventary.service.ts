import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {
  public url: string;;

  constructor(private _http: HttpClient,){
      this.url = GLOBAL.url;
    }
        //Servicio para mi Entidad Inventary
        
        // Servicio para listar todos los inventarios
        list_inventary(id:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Inventory/'+id, {headers: headers});
        }

        // Servicio para obtener un inventario por id
        get_inventary(id:any,product:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.get(this.url + '/Inventory/product/'+id+'?productId='+product, {headers: headers});
        }

        // Servicio para crear un inventario
        create_inventory(data:any, token: string): Observable<any> {
          let headers = new HttpHeaders({'Authorization': token});
          const formData = new FormData();
          formData.append('amount', data.amount);
          formData.append('supplier', data.supplier);
          formData.append('productId', data.productId);
          return this._http.post(this.url + '/Inventory', formData, {headers: headers});
        }

        // Servicio para actualizar un inventario
        update_inventory(id:any,data:any,token: string): Observable<any> {
          let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
          return this._http.put(this.url + '/Inventory/'+id, data, {headers: headers});
        }
}
