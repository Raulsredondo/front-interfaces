import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client} from '../models/Client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get(`${this.API_URI}/clientes`);
  }

  getCliente(id: string){
    return this.http.get(`${this.API_URI}/clientes/${id}`)
  }

  deleteCliente(id: string){
    return this.http.delete(`${this.API_URI}/clientes/${id}`)
  }

  saveCliente(cliente: Client){
    return this.http.post(`${this.API_URI}/clientes`, cliente);
  }

  // id en este caso puede ser string o number
  updateCliente( id: string|number ,updatedCliente: Client): Observable<Client>{
    return this.http.put(`${this.API_URI}/clientes/${id}`, updatedCliente);
  }
}
