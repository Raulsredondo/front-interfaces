import { Component, OnInit, HostBinding } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProdService } from '../../services/prod.service';
import { ProvService } from '../../services/prov.service';
import {Router,ActivatedRoute} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.css']
})
export class ProdFormComponent implements OnInit {

  @HostBinding('class') classes = 'row'

  producto: Producto = {
    id: 0,
    nombre: '',
    proveedor: '',
    image: '',
    created_at: new Date(),
    descripcion: ''
  };


  proveedores: any = [];
    edit: boolean = false;

    constructor(public nav: NavbarService,private prodService: ProdService,private provService: ProvService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nav.show();
    this.getProveedores();
  const params =  this.activatedRoute.snapshot.params;
  if(params.id){
    this.prodService.getProducto(params.id)
      .subscribe(
        res => {
          console.log(res)
          this.producto = res;
          this.edit = true;
        },
        err => console.error(err)
      )
  }
  console.log(params)
  }
  back() {
    this.router.navigate(['/productos']);
  }

  prueba(){
    
    var xd =(<HTMLInputElement>document.getElementById("inputProveedores")).value;
   
    (<HTMLInputElement>document.getElementById("inputProveedores2")).value = xd
  }
  getProveedores(){
    this.provService.getProveedores().subscribe(
      res => {
        this.proveedores = res;
      },
      err => console.log(err)
    )
  }
saveNewProducto(){
  this.producto.id = Math.floor(Math.random() * (500 - 0)) + 0;
  this.producto.proveedor = (<HTMLInputElement>document.getElementById("inputProveedores2")).value;
  console.log(this.producto);
  this.prodService.saveProducto(this.producto)
  .subscribe(
    res=> {
      console.log(res);
      this.router.navigate(['/productos'])
    },
    err => console.error(err)
  )
}

  updateProducto(){
    delete this.producto.created_at;
    this.producto.proveedor = (<HTMLInputElement>document.getElementById("inputProveedores2")).value;
    this.prodService.updateProducto(this.producto.id, this.producto)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/productos'])
        },
        err => console.log(err)
      )
  }

}

