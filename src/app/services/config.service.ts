import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url: string;;

  constructor(private _http: HttpClient,){
      this.url = GLOBAL.url;
    }

            //Servicio para mi Entidad Config

            // Servicio para obtener un Config por id
            get_config(token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.get(this.url + '/Config/'+5, {headers: headers});
            }

            // Servicio para actualizar un Config
            update_config(data: any, token: string): Observable<any> {
              let headers = new HttpHeaders({ 'Authorization': token });

              if(data.logo){
              const formData = new FormData();
              formData.append('ImageFile', data.logo);
            //  formData.append('logo', data.logo);
              formData.append('title', data.title);
              formData.append('serie', data.serie);
              formData.append('correlative', data.correlative);
              
                return this._http.put(this.url + '/Config/' + 5, formData, { headers: headers });
              }else{
                return this._http.put(this.url + '/Config/' + 5, data, { headers: headers });
              }
            }
            
            //Servicio para listar todos las categorias
            list_categorys(token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.get(this.url + '/Category', {headers: headers});
            }

            //Servicio para listar todos las categorias publicas
            list_categorys_public(): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json'});
              return this._http.get(this.url + '/Category/public', {headers: headers});
            }

            // Servicio para crear una categoria
            create_category(data:any,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.post(this.url + '/Category',data, {headers: headers});
            }

            // Servicio para eliminar una categoria
            delete_category(id:any,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.delete(this.url + '/Category/'+id, {headers: headers});
            }

}
