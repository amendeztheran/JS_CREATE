import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  person!: FormGroup;
  authError: boolean = false;
  authGood: boolean = false;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder,) {//Redireccionar a página
    this.crearformulario();
  }

  validateEmail(control: any) {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailPattern.test(control.value) && control.value.endsWith('.com')) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }
  get tip_docNovalid() {
    return this.person.get('tip_doc')?.invalid && this.person.get('tip_doc')?.touched
  }
  get num_docNovalid() {
    return this.person.get('num_doc')?.invalid && this.person.get('num_doc')?.touched
  }
  get nombreNovalid() {
    return this.person.get('nombre')?.invalid && this.person.get('nombre')?.touched
  }
  get apellidoNovalid() {
    return this.person.get('apellido')?.invalid && this.person.get('apellido')?.touched
  }
  get correoNovalid() {
    return this.person.get('correo')?.invalid && this.person.get('correo')?.touched
  }
  get contrasenaNovalid() {
    return this.person.get('contrasena')?.invalid && this.person.get('contrasena')?.touched
  }
  get passConfNovalid() {
    return this.person.get('passConf')?.invalid && this.person.get('passConf')?.touched
  }
  crearformulario() {
    this.person = this.fb.group({
      tip_doc: ['', Validators.required],
      num_doc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateEmail]],
      role: [2],
      contrasena: ['', [Validators.required, Validators.maxLength(35), Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)]],
      passConf: ['', [Validators.required, this.validarConfirmacion('contrasena')]]
    });
  }
  //Funcion para validar contraseña
  validarConfirmacion(campo: string): ValidatorFn {
    return (control: AbstractControl): {
      [key: string]: any
    } | null => {
      const campoAComparar = control.root.get(campo);
      if (campoAComparar && control.value !== campoAComparar.value) {
        return { 'noCoincide': true }
      }
      return null;
    };
  }
  //funcion submit del boton registrar
  registro() {
    let usuario: User;
    if (this.person.invalid) {
      return Object.values(this.person.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      usuario = {
        "type_doc": this.person.value.tip_doc,
        "doc_number": this.person.value.num_doc,
        "name": this.person.value.nombre,
        "last_name": this.person.value.apellido,
        "email": this.person.value.correo,
        "password": this.person.value.contrasena,
        "id_role": this.person.value.role
      }
      //llamando servicio para insertar regitro en la BD
      this.authService.register(usuario).subscribe(success => {
        this.person.reset();
        //Redireccionar a página
        this.authGood = true;
      }, err => {
        this.authError = true;
      })
    }
  }
  cambiarEstado() {
    this.authError = false;
    this.authGood = false;
    this.person.reset();
  }
}
