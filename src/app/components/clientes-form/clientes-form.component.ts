import { Component, OnInit, HostBinding } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  @HostBinding('class') classes = 'row'

  cliente: Client = {
    id: 0,
    nombre: '',
    apellido: '',
    image: '',
    created_at: new Date(),
    direccion: '',
    dni: '',
    correo: ''
  };

    edit: boolean = false;

    constructor(public nav:NavbarService,private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nav.show();
  const params =  this.activatedRoute.snapshot.params;
  if(params.id){
    this.clientService.getCliente(params.id)
      .subscribe(
        res => {
          console.log(res)
          this.cliente = res;
          this.edit = true;
        },
        err => console.error(err)
      )
  }
  console.log(params)
  }

saveNewCliente(){
 
  delete this.cliente.id;
  this.cliente.id = Math.floor(Math.random() * (500 - 0)) + 0;
  this.clientService.saveCliente(this.cliente)
  .subscribe(
    res=> {
      console.log(res);
      this.router.navigate(['/clientes'])
    },
    err => console.error(err)
  )
}

back() {
  this.router.navigate(['/clientes']);
}

  updateCliente(){
    delete this.cliente.created_at;
    this.clientService.updateCliente(this.cliente.id, this.cliente)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/clientes'])
        },
        err => console.log(err)
      )
  }

}

