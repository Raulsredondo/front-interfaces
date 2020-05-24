import { Component, OnInit, HostBinding } from '@angular/core';
import {ProdService} from '../../services/prod.service'
import {NavbarService} from '../../services/navbar.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  productos: any = [];
lineafactura: any = [];
  
  constructor(public nav:NavbarService,private prodService: ProdService) { }

  ngOnInit() {
    this.nav.show();
this.getProductos();
  }

getProductos(){
  this.prodService.getProductos().subscribe(
    res => {
      this.productos = res;
      this.lineafactura = res;
    },
    err => console.log(err)
  )
}
deleteProducto(id: string){
  this.prodService.deleteProducto(id).subscribe(
    res => {
           console.log(res)
           this.getProductos();
    },
    err => console.log(err)
  )
}

descargarPDF(){
  var doc = new jsPDF();
    var imgData = ''
    doc.setFont('times');
    doc.setFontType('italic');
    doc.setFontSize(20);
    doc.text(35,25,'                       LISTADO DE PRODUCTOS')
  var col = ["NOMBRE","PROVEEDOR.","PRECIO x UNIDAD","DESCRIPCION"];
  var rows = [];
    this.lineafactura.forEach(element =>{
      var temp = [element.nombre,element.proveedor,element.precio,element.descripcion];
      rows.push(temp);
    }); 
    doc.page = 1; // use this as a counter.
    doc.setFontType('italic');
    doc.setFontSize(12);
    doc.autoTable(col, rows,{ startY: 50,
    styles:{
      font: 'italic'
    } })


var str = "Página " + doc.page;
        doc.setFontSize(10);// optional
        doc.text(str, 100, doc.internal.pageSize.height - 10);//key is the inte
    doc.save('Test.pdf');
  }
}

