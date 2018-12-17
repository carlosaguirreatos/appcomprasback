import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'appCompras';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDoe8Nmqh1HmLItnqaUEwqRMj-OXE-6pR8",
      authDomain: "comprasapp-54177.firebaseapp.com",
      databaseURL: "https://comprasapp-54177.firebaseio.com",
      projectId: "comprasapp-54177",
      storageBucket: "comprasapp-54177.appspot.com",
      messagingSenderId: "790059739396"
    })
  }
}
