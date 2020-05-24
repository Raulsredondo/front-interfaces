import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoPresupuesto } from '../models/ProductoPresupuesto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdpresService {

  
  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getProdpres(){
    return this.http.get(`${this.API_URI}/prodpres`);
  }

  getProdpre(id: string){
    return this.http.get(`${this.API_URI}/prodpres/${id}`)
  }

  deleteProdpres(id: string|number){
    return this.http.delete(`${this.API_URI}/prodpres/${id}`)
  }

  saveProdpres(presupuesto: ProductoPresupuesto){
    return this.http.post(`${this.API_URI}/prodpres`, presupuesto);
  }

  // id en este caso puede ser string o number
  updateProdpres( id: string|number ,updatedPresupuesto: ProductoPresupuesto): Observable<ProductoPresupuesto>{
    return this.http.put(`${this.API_URI}/prodpres/${id}`, updatedPresupuesto);
  }
}
