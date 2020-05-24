import { Component, OnInit, HostBinding } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {ProvService} from '../../services/prov.service'
@Component({
  selector: 'app-prov-list',
  templateUrl: './prov-list.component.html',
  styleUrls: ['./prov-list.component.css']
})
export class ProvListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  proveedores: any = [];

  
  constructor(public nav: NavbarService,private provService: ProvService) { }

  ngOnInit() {
    this.nav.show();
this.getProveedores();
  }

getProveedores(){
  this.provService.getProveedores().subscribe(
    res => {
      this.proveedores = res;
    },
    err => console.log(err)
  )

  console.log(this.proveedores);
}
deleteProveedor(id: string){
  console.log(id);
  this.provService.deleteProveedor(id).subscribe(
    res => {
           console.log(res)
           this.getProveedores();
    },
    err => console.log(err)
  )
}


}
