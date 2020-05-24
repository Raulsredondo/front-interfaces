import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presupuesto } from '../models/Presupuesto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  
  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getPresupuestos(){
    return this.http.get(`${this.API_URI}/presupuestos`);
  }

  getPresupuesto(id: string){
    return this.http.get(`${this.API_URI}/presupuestos/${id}`)
  }

  deletePresupuesto(id: string){
    return this.http.delete(`${this.API_URI}/presupuestos/${id}`)
  }

  savePresupuesto(presupuesto: Presupuesto){
    return this.http.post(`${this.API_URI}/presupuestos`, presupuesto);
  }

  // id en este caso puede ser string o number
  updatePresupuesto( id: string|number ,updatedPresupuesto: Presupuesto): Observable<Presupuesto>{
    return this.http.put(`${this.API_URI}/presupuestos/${id}`, updatedPresupuesto);
  }
}
