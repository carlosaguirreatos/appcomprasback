import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';
import * as _ from 'lodash';
import { Archivo } from '../file.modal';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Archivo;

  loading = false;


  constructor(public loadfileService: LoadfileService) {
    console.log('**********************constructor de upload.component.ts');
   }

  ngOnInit() {
  }

  detectFiles(event){ //cuando seleccionamos un archivo y se presenta al lado del botón 
    console.log('----------------upload.component.ts detectFiles()'); 
    this.selectedFiles = event.target.files;    
  }

  uploadSingle(){ // pulsando en Subir Archivo
    console.log('----------------upload.component.ts uploadSingle()'); 
    const file = this.selectedFiles.item(0);
    console.log('File es de tipo: ' + typeof file);   
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadfileService.pushUpload(this.currentUpload);
  }
}
