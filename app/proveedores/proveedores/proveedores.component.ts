import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  campoBusqueda: FormControl;
  busqueda: string;

  proveedores: any[] = [];
  cargando = false;
  resultados = false;
  noresultados = false;

  //mensaje: string;
  //proveedores: any;

  constructor(private proveedoresService: ProveedoresService) { 
    console.log('**********************constructor de proveedores.component.ts');
    // this.proveedoresService.getProveedores()
    //   .subscribe(proveedores => {
    //   for (const id$ in proveedores){
    //     const p = proveedores[id$];
    //     p.id$ = id$; 
    //     this.proveedores.push(proveedores[id$]);
    //     console.log(proveedores[id$].id$ + '-->' + proveedores[id$].concepto); 
    //   }
    //   this.cargando = false;
    //   console.log('cargando es de tipo: ' + typeof this.cargando);
    // });
   
  }   

  ngOnInit() {
    //this.mensaje = this.proveedoresService.getProveedores();
    //this.proveedores = this.proveedoresService.getProveedores();
    this.campoBusqueda = new FormControl();
    this.campoBusqueda.valueChanges
        .subscribe(term => {
          this.busqueda = term;
          this.cargando = true;
          console.clear();
          /*console.log('--------------------------------');
          console.log('iresultados: ' + this.resultados);
          console.log('inoresultados: ' + this.noresultados);*/
          this.noresultados = false;
          this.resultados = false;
          if( this.busqueda.length !== 0){ // Si estamos buscando algo
            this.proveedoresService.getProveedoresShearch(this.busqueda)
                .subscribe(proveedores =>{
                  this.proveedores = []; // para que se vacíe en cada búsqueda
                  for (const id$ in proveedores){
                    const p = proveedores[id$];
                    p.id$ = id$; 
                    this.proveedores.push(proveedores[id$]);
                    console.log('*****');
                    console.log(proveedores[id$].id$ + '-->' + proveedores[id$].nombre); 
                    console.log('length: ' + this.proveedores.length);
                    console.log('*****');
                  }
                  //&&  this.busqueda.length >=1)
                  if( this.proveedores.length < 1) { //si NO encuentra nada
                        this.noresultados = true;
                      }
                  else  { //si encuentra algo
                    this.noresultados = false;
                    this.resultados = true;
                  }
                })
            this.cargando = false;
                
          }
          else { //si no hay nada tecleado en el campo...
            this.proveedores = [];
            this.cargando = false;
            this.resultados = false;
            this.noresultados = true;
          }
          console.log('--------------------------------');
          console.log('fresultados: ' + this.resultados);
          console.log('fnoresultados: ' + this.noresultados);
        });
  }

}
