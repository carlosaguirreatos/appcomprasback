import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';
import { AngularFireList } from 'angularfire2/database';

import { Archivo } from './../file.modal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: Observable<any[]>;

  constructor(private loadfileService: LoadfileService ) {
    console.log('**********************constructor de contratos.component.ts');
   }

  ngOnInit() {
    this.uploads = this.loadfileService.getUploads();
  }

}
