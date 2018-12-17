import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router,
              private activatedRouter: ActivatedRoute) { }

  registroUsuario(userdata){
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        console.log(error);
      })
  }

  inicioSesion(userdata){
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
            .then( response => {
              console.log('Inicia sesión con email: ' + response.user.email);
              this.router.navigate(['/inicio'])
            })
            .catch(
              error => {
                console.log(error);
              }
            )
  }

  isAuthenticated(){
    const user = firebase.auth().currentUser;
   
    if(user){ 
     // console.log('Usuario autenticado'); 
      
      return true;
    }
    else {
      //console.log('Usuario NO autenticado');
      return false;
    }
  }

  logout(){
    firebase.auth().signOut();
      console.log('Cerrando sesión');       
  }
}
