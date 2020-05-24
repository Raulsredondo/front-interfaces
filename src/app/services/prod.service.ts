import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../models/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getProductos(){
    return this.http.get(`${this.API_URI}/productos`);
  }

  getProducto(id: string){
    return this.http.get(`${this.API_URI}/productos/${id}`)
  }

  deleteProducto(id: string){
    return this.http.delete(`${this.API_URI}/productos/${id}`)
  }

  saveProducto(producto: Producto){
    return this.http.post(`${this.API_URI}/productos`, producto);
  }

  // id en este caso puede ser string o number
  updateProducto( id: string|number ,updatedProducto: Producto): Observable<Producto>{
    return this.http.put(`${this.API_URI}/productos/${id}`, updatedProducto);
  }
}
