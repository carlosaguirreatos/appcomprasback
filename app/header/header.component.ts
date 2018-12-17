import { Component, OnInit } from '@angular/core';
import { AutenticacionService} from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuth(){ //SE COMPRUEBA EN LA PLANTILLA HEADER.COMPONENT.HTML
   // console.log('Estamos en isAuth() y el estado es: ' + this.autenticacionService.isAuthenticated().valueOf() );
  // console.log('isAuth() de header.component.ts'); 
   return this.autenticacionService.isAuthenticated();
  }

  onLogout(){
    console.log('onLogout()');
      this.autenticacionService.logout();    
       this.router.navigate(['/inicio']); 

  }

}
