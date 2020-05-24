import { Component, OnInit, HostBinding } from '@angular/core';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProvService } from '../../services/prov.service';
import {Router,ActivatedRoute} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
@Component({
  selector: 'app-prov-form',
  templateUrl: './prov-form.component.html',
  styleUrls: ['./prov-form.component.css']
})
export class ProvFormComponent implements OnInit {
  @HostBinding('class') classes = 'row'

  proveedor: Proveedor = {
    nombre: '',
    created_at: new Date(),
  };

    edit: boolean = false;

    constructor(public nav: NavbarService,private provService: ProvService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nav.show();
  const params =  this.activatedRoute.snapshot.params;
  if(params.id){
    this.provService.getProveedor(params.id)
      .subscribe(
        res => {
          console.log(res)
          this.proveedor = res;
          this.edit = true;
        },
        err => console.error(err)
      )
  }
  console.log(params)
  }
  
  back() {
    this.router.navigate(['/proveedores']);
  }

saveNewProveedor(){
  this.proveedor.id = Math.floor(Math.random() * (500 - 0)) + 0;
  this.provService.saveProveedor(this.proveedor)
  .subscribe(
    res=> {
      console.log(res);
      this.router.navigate(['/proveedores'])
    },
    err => console.error(err)
  )
}

  updateProveedor(){
    delete this.proveedor.created_at;
    this.provService.updateProveedor(this.proveedor.id, this.proveedor)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/proveedores'])
        },
        err => console.log(err)
      )
  }

}
