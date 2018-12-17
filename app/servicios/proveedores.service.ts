import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  /*
  proveedores: any = [
    { 
      nombre: 'Telefónica', 
      cif: 'B12345678', 
      direccion: 'Paseo de la Castellana, 100', 
      cp: '28.010', 
      localidad: 'Madrid', 
      provincia: 'Madrid', 
      telefono: 911111111, 
      email: 'info@telefonica.com', 
      contacto: 'Juan Pérez'
    },
    { 
      nombre: 'Iberdrola', 
      cif: 'B87654321', 
      direccion: 'Príncipe de Vergara, 200', 
      cp: '28.015', 
      localidad: 'Madrid', 
      provincia: 'Madrid', 
      telefono: 922222222, 
      email: 'info@iberdrola.com',
      contacto: 'Laura Martínez'
    }
  ];*/

 

  /*getProveedores(){
    //return 'Mensaje desde el Servicio';
    return this.proveedores;
  }*/

  provURL = 'https://comprasapp-54177.firebaseio.com/proveedores.json';
  proURL = 'https://comprasapp-54177.firebaseio.com/proveedor';


  constructor(private http: Http) { }

  postProveedor( proveedor: any) {
    console.log('********** Poveedors.service.ts  / postProveedor(): para crear un proveedor');
    const newpres = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.provURL, newpres, {headers})
      .map( res => {
        console.log(res.json());
        return res.json();
        })
  }

  getProveedores() {
    console.log('********** proveedores.service.ts  / getProveedores(): para recuperar todos los proveedores');
    return this.http.get( this.provURL )
      .map( res => res.json());
    }

  getProveedor ( id$: string ) {
    console.log('********** proveedores.service.ts  / getProveedor(): para recuperar un proveedor por su id');
    const url = `${ this.proURL }/${ id$ }.json`;
    return this.http.get( url )
      .map( res => res.json());
    }

  putProveedor( proveedor: any, id$: string) {
    console.log('********** proveedors.service.ts  / putProveedor(): para actualizar un proveedor por su id');
    const newpre = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${ this.proURL }/${ id$ }.json`;

    return this.http.put( url, newpre, {headers})
      .map( res => {
        console.log(res.json());
        return res.json();
        })
  }

  delproveedor(id$: string){
    console.log('********** proveedors.service.ts  / delproveedor(): para borrar un proveedor por su id');
    console.log('Eliminando el proveedor de id: ' + id$);
    const url = `${ this.proURL }/${ id$ }.json`;
    return this.http.delete(url)
      .map( res => res.json() );      
  }

  getProveedoresShearch(busqueda: string){
    const url = `${ this.provURL }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    
    return this.http.get(url)
      .map (res => res.json());
  }
}
