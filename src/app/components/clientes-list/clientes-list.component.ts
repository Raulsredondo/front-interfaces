import { Component, OnInit, HostBinding } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {NavbarService} from '../../services/navbar.service';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  clientes: any = [];

  
  constructor(public nav: NavbarService,private clientService: ClientService) { }

  ngOnInit() {
    this.nav.show();
this.getClientes();
  }

getClientes(){
  this.clientService.getClientes().subscribe(
    res => {
      this.clientes = res;
    },
    err => console.log(err)
  )
}
deleteCliente(id: string){
  this.clientService.deleteCliente(id).subscribe(
    res => {
           console.log(res)
           this.getClientes();
    },
    err => console.log(err)
  )
}


}


