import { Component, OnInit, HostBinding } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import {NavbarService} from '../../services/navbar.service';
@Component({
  selector: 'app-presupuestos-list',
  templateUrl: './presupuestos-list.component.html',
  styleUrls: ['./presupuestos-list.component.css']
})
export class PresupuestosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  presupuestos: any = [];

  
  constructor(public nav: NavbarService,private presupuestoService: PresupuestoService) { }

  ngOnInit() {
    this.nav.show();
this.getPresupuestos();
  }

getPresupuestos(){
  this.presupuestoService.getPresupuestos().subscribe(
    res => {
      this.presupuestos = res;
    },
    err => console.log(err)
  )
}
deletePresupuesto(id: string){
  this.presupuestoService.deletePresupuesto(id).subscribe(
    res => {
           console.log(res)
           this.getPresupuestos();
    },
    err => console.log(err)
  )
}


}



