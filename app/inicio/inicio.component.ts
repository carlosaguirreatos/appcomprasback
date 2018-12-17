import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService) { 
    console.log('**********************constructor de inicio.component.ts');
  }

  ngOnInit() {
  }

  isAuth(){
    return this.autenticacionService.isAuthenticated();
  }

}
