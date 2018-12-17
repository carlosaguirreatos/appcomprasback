import { Component, OnInit , ViewChild} from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService  } from '../../servicios/proveedores.service';

//import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

 // @ViewChild('formpro') formpro: NgForm;
  proveedorForm: FormGroup; // objeto de la clase FormGroup que hemos importado
  proveedor: any;
  
  provincias: string[] = [ 'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz',
       'Barcelona','Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba',
       'La Coruña','Cuenca','Gerona','Granada','Guadalajara', 'Guipúzcoa','Huelva','Huesca',
       'IslasBaleares','Jaén','León','Lérida','Lugo','Madrid', 'Málaga','Murcia','Navarra','Orense',
       'Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria',
       'Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya',
       'Zamora','Zaragoza'];
  
  constructor(private pf: FormBuilder, 
    private proveedorService: ProveedoresService) {
    console.log('**********************constructor de addprovee.component.ts');
   // para que no dé error por formGroup undefined al cargar la plantilla
    this.proveedorForm = new FormGroup({
      nombre: new FormControl('nombre'),
      cif: new FormControl('cif'),
      direccion: new FormControl('direccion'),
      cp: new FormControl('cp'),
      localidad: new FormControl('localidad'),
      provincia: new FormControl('provincia'),
      telefono: new FormControl('telefono'),
      email: new FormControl('email'),
      contacto: new FormControl('contacto')
    });
    /* this.proveedor = {
       nombre: '',
       cif: '',
       direccion: '',
       cp: '',
       localidad: '',
       provincia: '',
       telefono: null,
       email: '',
       contacto: ''
     }   */
     console.log('proveedorForm es de tipo: ' + typeof this.proveedorForm);
   }

  ngOnInit() {
    
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(10)] ],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required]
    });
    console.log('pf es de tipo: ' + typeof this.pf);

  }

  onSubmit(){
   /* this.proveedor.nombre = this.formpro.value.nombre;
    this.proveedor.cif = this.formpro.value.cif;
    this.proveedor.direccion = this.formpro.value.direccion;
    this.proveedor.cp = this.formpro.value.cp;
    this.proveedor.localidad = this.formpro.value.localidad;
    this.proveedor.provincia = this.formpro.value.provincia;
    this.proveedor.telefono = this.formpro.value.telefono;
    this.proveedor.email = this.formpro.value.email;
    this.proveedor.contacto = this.formpro.value.contacto;*/
    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedor(this.proveedor)
          .subscribe(newpres => { 
          })
    this.proveedorForm.reset();
  }

  saveProveedor(){
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    }
    return saveProveedor;
  }

}
