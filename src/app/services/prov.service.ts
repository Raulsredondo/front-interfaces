import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Proveedor} from '../models/Proveedor';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProvService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getProveedores(){
    return this.http.get(`${this.API_URI}/proveedores`);
  }

  getProveedor(id: string){
    return this.http.get(`${this.API_URI}/proveedores/${id}`)
  }

  deleteProveedor(id: string){
    return this.http.delete(`${this.API_URI}/proveedores/${id}`)
  }

  saveProveedor(proveedor: Proveedor){
    return this.http.post(`${this.API_URI}/proveedores`, proveedor);
  }

  // id en este caso puede ser string o number
  updateProveedor( id: string|number ,updatedProveedor: Proveedor): Observable<Proveedor>{
    return this.http.put(`${this.API_URI}/proveedores/${id}`, updatedProveedor);
  }
}
