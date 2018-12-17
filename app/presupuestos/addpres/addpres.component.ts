import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService  } from '../../servicios/presupuestos.service';
import { ProveedoresService  } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup; // objeto de la clase FormGroup que hemos importado
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  proveedores: any[] = [];
  
  constructor(private pf: FormBuilder, 
              private presupuestoService: PresupuestosService,
              private proveedoresService: ProveedoresService) {

              console.log('**************constructor de addpres.component.ts');
              this.proveedoresService.getProveedores().subscribe(proveedores => {
                  for (const id$ in proveedores){
                    const p = proveedores[id$];
                    p.id$ = id$; // IMPORTANTÍSIMO EL $ SI NO NO FUNCIONA Y NO RECONOCE EL ID
                    this.proveedores.push(proveedores[id$]);
                    console.log(proveedores[id$].id$ + '-->' + proveedores[id$].concepto); // mostramos el concepto de cada ítem
                  }
                });

                this.presupuestoForm = new FormGroup({
                  proveedor: new FormControl('proveedor'),
                  fecha: new FormControl('fecha'),
                  concepto: new FormControl('concepto'),
                  base: new FormControl('base'),
                  tipo: new FormControl('tipo'),
                  iva: new FormControl('iva'),
                  total: new FormControl('total')
                });
          }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)] ],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: this.iva,
      total: this.total
    });

    this.onChanges();
  }

  onChanges(): void{
    this.presupuestoForm.valueChanges.subscribe(valor=> {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base *  this.tipo);
    });
  }

  onSubmit(){
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto)
          .subscribe(newpres => { 
          })
    this.presupuestoForm.reset();
  }

  savePresupuesto(){
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    }
    return savePresupuesto;
  }

}
