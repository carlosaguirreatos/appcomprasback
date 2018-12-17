import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any[] = [];

  constructor(private presupuestosService: PresupuestosService,
              private router: Router,
              private activatedRouter: ActivatedRoute)  { 
    console.log('***********constructor de presupuestos.component.ts');
    this.presupuestosService.getPresupuestos()
      .subscribe(presupuestos => {
        for (const id$ in presupuestos){
          const p = presupuestos[id$];
          p.id$ = id$; // IMPORTANTÍSIMO EL $ SI NO NO FUNCIONA Y NO RECONOCE EL ID
          this.presupuestos.push(presupuestos[id$]);
          console.log(presupuestos[id$].id$ + '-->' + presupuestos[id$].concepto); // mostramos el concepto de cada ítem
        }
      });
  }

  ngOnInit() {
  }

  eliminarPresupuesto(id$){
    console.log('***********eliminarPresupuesto() de presupuestos.component.ts');
    console.log('-----------llamando a delPresupuesto() importado de presupuestos.service.ts desde  eliminarPresupuesto() en  presupuestos.component.ts');
    this.presupuestosService.delPresupuesto(id$)
      .subscribe( res => {
        console.log(res);
        this.presupuestos = [];
        this.presupuestosService.getPresupuestos()
          .subscribe(presupuestos => {
            
            for (const id$ in presupuestos){
              const p = presupuestos[id$];
              p.id$ = id$; // IMPORTANTÍSIMO EL $ SI NO NO FUNCIONA Y NO RECONOCE EL ID
              this.presupuestos.push(presupuestos[id$]);
              console.log(presupuestos[id$].id$ + '-->' + presupuestos[id$].concepto); // mostramos el concepto de cada ítem
            }

          });
      })
  }
}
