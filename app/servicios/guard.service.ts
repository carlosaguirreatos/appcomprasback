import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AutenticacionService} from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate{    //implementa CanActivate porque es una interfaz

  constructor(private autenticacionService: AutenticacionService) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      return this.autenticacionService.isAuthenticated();
  }
}

