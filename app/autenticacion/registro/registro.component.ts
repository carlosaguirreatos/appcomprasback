import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  userdata: any; 

  erroresForm = {
    'email': '',
    'password': ''
  }

  mensajesValidacion = {
    'email' : {
      'required': 'Email obligatorio',
      'email': 'Introduzca un email correcto'
    },
    'password': {
      'required': 'Password obligatorio',
      'pattern': 'El password debe contener al menos un múmero y una letra',
      'minlength': 'El password debe contener al menos 6 caracteres'

    }
  }

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      'email' : ['', [
        Validators.required,
         Validators.email
        ]],
      'password' : ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    })

    this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit(){
    console.log('-----------onSubmit() de resgistro.component.ts');
    this.userdata = this.saveUserdata();
    this.autenticacionService.registroUsuario(this.userdata);
    this.router.navigate(['/inicio']);
  }


  saveUserdata(){
    console.log('-----------saveUserdata() de resgistro.component.ts');
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value
    }
    return saveUserdata;
  }

  // método que gestiona las validacione
  onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
    for (const field in this.erroresForm) {
      
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
         }
       }
     }
   }



}
