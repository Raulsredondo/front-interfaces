import { Component, OnInit, HostBinding } from '@angular/core';
import { Presupuesto } from 'src/app/models/Presupuesto';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { ProdpresService } from 'src/app/services/prodpres.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from 'src/app/models/Client';
import { ProductoPresupuesto } from '../../models/ProductoPresupuesto';
import { ProdService } from 'src/app/services/prod.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NavbarService } from '../../services/navbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuestos-form',
  templateUrl: './presupuestos-form.component.html',
  styleUrls: ['./presupuestos-form.component.css']
})
export class PresupuestosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row'


  alert2: string;
  imgData: string = "../../../assets/logo_size.jpg";
  prueba: number;
  //
  filterPost: any = '';
  mydate = new Date();
  //Array de Productos
  arrayProductos: ProductoPresupuesto = {
    id: 0,
    nombre: '',
    precio: 0,
    cantidad: 0,
    id_presupuesto: this.mydate.getMilliseconds(),
    precio_total: 0

  };
  
  lineafactura: any = [{
    id: 0,
    nombre: '',
    precio: 0,
    cantidad: 0,
    precio_total: 0,
    id_presupuesto: this.mydate.getMilliseconds()
  }];

  //
  subtotal: number = 0;
  iva: number = 21;
  total: number = 0;


  // Array de Objetos de Clientes
  clientesObject: any = [];
  selectedCliente = this.clientesObject[1];
  //  Array de Objetos de Productos.
  productosObject: any = [];
  selectedProducto = this.productosObject[1];
  //

  prodpres: ProductoPresupuesto = {
    id: 0,
    nombre: '',
    precio: 0,
    cantidad: 0,
    precio_total: 0,
    id_presupuesto: this.mydate.getMilliseconds()

  };


  // Modelo pre-fabricado
  presupuesto: Presupuesto = {
    id: 0,
    nombre_cliente: '',
    apellido_cliente: '',
    created_at: new Date(),
    direccion: '',
    dni: '',
    correo: '',
    precio_total: 0
  };

  productos: any = [];
  clientes: any = [];
  edit: boolean = false;
  idpresupuestoedit: any;
  // MyDate para guardar los presupuestosID como los milisegundos.

  milisegundos: any;

  constructor(public nav: NavbarService, private prodpresService: ProdpresService, private prodService: ProdService, private clientService: ClientService, private presupuestoService: PresupuestoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nav.show();
    this.milisegundos = this.mydate.getMilliseconds();
    console.log("Milisegundos GENERADO: " + this.milisegundos)
    //Borra la 1º Linea de factura, que siempre está vacia
    this.lineafactura.pop();
    // Se trae a los clientes de la BD para poder rellenar los select
    this.getClientes();
    // Se trae a los productos de la BD para poder rellenar los select
    this.getProductos();
    //
    (<HTMLInputElement>document.getElementById("iva")).value = '' + this.iva;
    //
    const params = this.activatedRoute.snapshot.params;
    this.idpresupuestoedit = params.id;
    console.log('CONSOLE LOG DEL THIS.IDPRESUPUESTOEDIT ' + this.idpresupuestoedit)
    if (params.id) {
      this.presupuestoService.getPresupuesto(params.id)
        .subscribe(
          res => {
            console.log(res)
            this.presupuesto = res;
            this.edit = true;
          },
          err => console.error(err)
        )
      console.log('ID PRESUP: ' + params.id)
      this.prodpresService.getProdpre(params.id).subscribe(
        res => {
          console.log(res)
          this.lineafactura = res;
          this.calculosubtotal();
          this.calculoiva();
          this.edit = true;
        },
        err => console.log(err)
      )


    }
    console.log(params)
  }

  RecogerSelect(cliente: Client) {
    console.log(cliente);

    this.selectedCliente = cliente;


    (<HTMLInputElement>document.getElementById("inputNombreCliente")).value = cliente.nombre;
    (<HTMLInputElement>document.getElementById("inputApellidoCliente")).value = cliente.apellido;
    (<HTMLInputElement>document.getElementById("inputDNICliente")).value = cliente.dni;
    (<HTMLInputElement>document.getElementById("inputTelefonoCliente")).value = '' + cliente.telefono;
    (<HTMLInputElement>document.getElementById("inputCorreoCliente")).value = cliente.correo;
    (<HTMLInputElement>document.getElementById("inputDireccionCliente")).value = cliente.direccion;


  }

  probando(productoPresupuesto: ProductoPresupuesto) {
    this.selectedProducto = productoPresupuesto;

    this.alert2 = '<div class="alert alert-success" role="alert"><strong>Well done!</strong> You successfully read this important alert message.</div>';

    this.prueba = parseFloat((<HTMLInputElement>document.getElementById(`${productoPresupuesto.nombre}`)).value);
    console.log('CANTIDA DER PRODUCTO ' + this.prueba)
    console.log("Este es el Producto que se ha añadido: " + productoPresupuesto.nombre);

    if (this.edit == true) {
      this.lineafactura.push({
        nombre: productoPresupuesto.nombre,
        precio: productoPresupuesto.precio,
        cantidad: this.prueba,
        precio_total: productoPresupuesto.precio * this.prueba,
        id_presupuesto: this.idpresupuestoedit
      }
      );
    } else {
      this.lineafactura.push({
        nombre: productoPresupuesto.nombre,
        precio: productoPresupuesto.precio,
        cantidad: this.prueba,
        precio_total: productoPresupuesto.precio * this.prueba,
        id_presupuesto: this.milisegundos
      }
      );
    }


    let timerInterval
    Swal.fire({
      title: productoPresupuesto.nombre,
      html: 'ha sido añadido correctamente',
      position: 'top',
      toast: true,
      timer: 2500,
      background: '#80CBC4',
      
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })


    this.calculosubtotal();
    this.calculoiva();



    console.log(this.lineafactura);
  }



  calculoslineaventa(producto: ProductoPresupuesto, cantidad: number) {
    console.log(cantidad)

    producto.cantidad = parseFloat((<HTMLInputElement>document.getElementById(`${producto.nombre}`)).value);

    console.log(producto.cantidad);
    producto.precio_total = producto.precio * producto.cantidad;
    console.log(producto.precio_total)
    for (const i in this.lineafactura) {
      if (this.lineafactura[i].nombre == producto.nombre) {

        this.lineafactura[i].precio_total = producto.precio_total;
        console.log('PRECIO TOTAL: ' + this.lineafactura[i].precio_total);

      }
      console.log(producto);
    }
    this.calculosubtotal();
    this.calculoiva();
  }

  saveNewPresupuesto() {

    delete this.presupuesto.id;
    delete this.lineafactura.id_presupuesto;

    console.log('MILISEGUNDOS: ' + this.milisegundos);
    this.presupuesto.id = this.milisegundos;
    this.lineafactura.id_presupuesto = this.milisegundos;
    console.log('EL PUTO ID PRESUPUESTO DE LA LINEAFACTURA ' + this.lineafactura.id_presupuesto)

    for (const i in this.lineafactura) {


      this.prodpresService.saveProdpres(this.lineafactura[i])
        .subscribe(
          res => {
            console.log(res);

          },
          err => console.error(err)
        )


    }

    this.presupuesto.nombre_cliente = (<HTMLInputElement>document.getElementById("inputNombreCliente")).value;
    this.presupuesto.apellido_cliente = (<HTMLInputElement>document.getElementById("inputApellidoCliente")).value;
    this.presupuesto.correo = (<HTMLInputElement>document.getElementById("inputCorreoCliente")).value;
    this.presupuesto.direccion = (<HTMLInputElement>document.getElementById("inputDireccionCliente")).value;
    this.presupuesto.dni = (<HTMLInputElement>document.getElementById("inputDNICliente")).value;
    this.presupuesto.telefono = parseFloat((<HTMLInputElement>document.getElementById("inputTelefonoCliente")).value);
    this.presupuesto.precio_total = parseFloat((<HTMLInputElement>document.getElementById("total")).value);

    this.presupuestoService.savePresupuesto(this.presupuesto)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/presupuestos'])
        },
        err => console.error(err)
      )
  }

  updatePresupuesto() {
    delete this.presupuesto.created_at;


    this.lineafactura.id_presupuesto = this.idpresupuestoedit;
    for (const i in this.lineafactura) {

      this.prodpresService.saveProdpres(this.lineafactura[i])
        .subscribe(
          res => {
            console.log(res);

          },
          err => console.error(err)
        )


      this.prodpresService.updateProdpres(this.lineafactura[i].id, this.lineafactura[i])
        .subscribe(
          res => {
            console.log(res);

          },
          err => console.error(err)
        )


    }

    this.presupuesto.precio_total = parseFloat((<HTMLInputElement>document.getElementById("total")).value);
    this.presupuestoService.updatePresupuesto(this.presupuesto.id, this.presupuesto)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/presupuestos'])
        },
        err => console.log(err)
      )
  }

  getClientes() {
    this.clientService.getClientes().subscribe(
      res => {
        this.clientes = res;
      },
      err => console.log(err)
    )
  }



  getProductos() {
    this.prodService.getProductos().subscribe(
      res => {
        this.productos = res;
      },
      err => console.log(err)
    )
  }


  calculosubtotal() {
    console.log("SUB TOTAL")
    var sum = 0;
    this.subtotal = 0;
    for (const i in this.lineafactura) {
      console.log(this.lineafactura[i].precio_total);
      sum = sum + parseInt(this.subtotal + this.lineafactura[i].precio_total);
    }
    this.subtotal = sum;
    (<HTMLInputElement>document.getElementById("subtotal")).value = '' + this.subtotal;
    console.log("CALCULO SUB TOTAL: " + this.subtotal);
  }

  calculoiva() {
    this.iva = parseFloat((<HTMLInputElement>document.getElementById('iva')).value);
    this.total = (this.subtotal / this.iva) + this.subtotal;
    (<HTMLInputElement>document.getElementById('total')).value = '' + this.total.toFixed(2);
    console.log("CALCULO IVA: " + this.total.toFixed(2));
  }

  removeLanguague(producto: ProductoPresupuesto, index) {
    this.lineafactura.splice(index, 1);
    this.calculosubtotal();
    this.calculoiva();
    console.log(this.lineafactura);
    this.prodpresService.deleteProdpres(producto.id).subscribe(
      res => {
        console.log(res)

      },
      err => console.log(err)
    )



  }


  descargarPDF() {
    var doc = new jsPDF();
    var imgData = ''
    var col = ["NOMBRE ARTICULO", "PRECIO X UNIDAD.", "CANTIDAD", "PRECIO TOTAL"];
    var rows = [];
    this.lineafactura.forEach(element => {
      var temp = [element.nombre, element.precio, element.cantidad, element.precio_total];
      rows.push(temp);
    });
    doc.page = 1; // use this as a counter.
    var totalPages = 10; // define total amount of pages
    doc.setFont('times');
    doc.setFontType('italic');
    doc.setFontSize(20);
    doc.text(35, 25, '                          Presupuesto Nº: ' + (<HTMLInputElement>document.getElementById('inputIDPresupuesto')).value);
    doc.setFont('times');
    doc.setFontType('italic');
    doc.setFontSize(12);
    doc.autoTable(col, rows, {
      startY: 120,
      styles: {
        font: 'italic'
      }
    })
    doc.text(10, 50, 'DATOS DEL CLIENTE');
    doc.text(10, 62, 'Nombre: ' + (<HTMLInputElement>document.getElementById('inputNombreCliente')).value);
    doc.text(10, 67, 'Apellido: ' + (<HTMLInputElement>document.getElementById('inputApellidoCliente')).value);
    doc.text(10, 72, 'DNI: ' + (<HTMLInputElement>document.getElementById('inputDNICliente')).value);
    doc.text(10, 77, 'Teléfono: ' + (<HTMLInputElement>document.getElementById('inputTelefonoCliente')).value);
    doc.text(10, 82, 'Correo: ' + (<HTMLInputElement>document.getElementById('inputCorreoCliente')).value);
    doc.text(10, 87, 'Direccion: ' + (<HTMLInputElement>document.getElementById('inputDireccionCliente')).value);


    doc.text(145, 80, '976854232');
    doc.text(140, 90, 'C/Sevilla Nº26 - Sevilla');

    doc.addImage(this.imgData, 'PNG', 140, 40, 30, 30);


    var str2 = 'Subtotal: ' + (<HTMLInputElement>document.getElementById('subtotal')).value + ' €';
    var str3 = 'IVA %: ' + (<HTMLInputElement>document.getElementById('iva')).value;
    var str4 = 'Total: ' + (<HTMLInputElement>document.getElementById('total')).value + ' €';

    doc.text(str2, 140, doc.internal.pageSize.height - 50);//key is the inte
    doc.text(str3, 140, doc.internal.pageSize.height - 45);
    doc.text(str4, 140, doc.internal.pageSize.height - 40);

    var str = "Página " + doc.page;
    doc.setFontSize(10);// optional
    doc.text(str, 100, doc.internal.pageSize.height - 10);//key is the inte
    doc.save('Test.pdf');
    console.log(this.lineafactura)
  }


}

