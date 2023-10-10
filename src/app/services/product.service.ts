import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { IProduct } from '../Entities/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProducService {

  public url: string;;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
      }
            //Servicio para mi Entidad Product

            // Servicio para listar todos los productos
            list_products(token: string): Observable<any> {
                let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
                return this._http.get(this.url + '/products', {headers: headers});
            }

            // Servicio para listar todos los productos publicos
            list_products_public(filtro:any): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json'});
              return this._http.get(this.url + '/products/public'+filtro, {headers: headers});
             }

            // Servicio para listar todos los productos publicos
            list_products_public_home(): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json'});
              return this._http.get(this.url + '/products/public', {headers: headers});
            }

            // Servicio para crear un producto
            create_product(data:any,file: File, token: string): Observable<any> {
              let headers = new HttpHeaders({'Authorization': token});
              const formData = new FormData();
              formData.append('title', data.title);
              formData.append('description', data.description);
              formData.append('price', data.price);
              formData.append('category', data.category.toString());
              formData.append('content', data.content);
              formData.append('stock',data.stock.toString());
              formData.append('ImageFile', file);
              formData.append('inventory.supplier',data.inventory.supplier.toString());
              formData.append('category.titles',data.category.titles.toString());
            
              return this._http.post(this.url + '/products', formData, {headers: headers});
            }

            // Servicio para obtener un producto por id
            get_product(id:IProduct,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.get(this.url + '/products/'+id, {headers: headers});
            }

            // Servicio para obtener un producto publico por id
            get_product_public(id:any): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json'});
              return this._http.get(this.url + '/products/public/'+id, {headers: headers});
            }

            // Servicio para actualizar un producto
            updateProduct(id: any, data: any, token: string): Observable<any> {
              let headers = new HttpHeaders({ 'Authorization': token });
            
              // Si se proporciona una imagen nueva, crea un FormData para enviar la imagen
              if (data.frontpage) {
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('content', data.content);
                formData.append('stock', data.stock.toString());
                formData.append('ImageFile', data.frontpage);
                formData.append('frontpage', data.frontpage);
                formData.append('category.titles', data.category);
            
                return this._http.put(this.url + '/products/' + id, formData, { headers: headers });
              } else {
                // Si no se proporciona una imagen nueva, envía los datos sin imagen
                return this._http.put(this.url + '/products/' + id, data, { headers: headers });
              }
             }
            
              // Servicio para eliminar un producto
             delete_product(id:IProduct,token: string): Observable<any> {
              let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
              return this._http.delete(this.url + '/products/'+id, {headers: headers});
             }

              // Servicio para listar todos las categorias
              list_category(): Observable<any> {
                let headers = new HttpHeaders({'Content-Type': 'application/json'});
                return this._http.get(this.url + '/Category/public', {headers: headers});
              }
    }