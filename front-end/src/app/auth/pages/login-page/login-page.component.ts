import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  usuario!: FormGroup;//nuevo
  private token: string = '';

  errorauth: boolean = false;
  private authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.crearformulario();
  }
  ngOnInit() {
  }
  validateEmail(control: any) {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailPattern.test(control.value) && control.value.endsWith('.com')) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }
  get correoNovalid() {
    return this.usuario.get('email')?.invalid && this.usuario.get('email')?.touched
  }
  get contrasenaNovalid() {
    return this.usuario.get('password')?.invalid && this.usuario.get('password')?.touched
  }
  crearformulario() {
    this.usuario = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.validateEmail]],
      password: ['', [Validators.required, Validators.maxLength(35)]]
    });
  }
  //funcion submit del boton iniciar sesion
  login() {
    if (this.usuario.invalid) {
      return Object.values(this.usuario.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      const { email, password } = this.usuario.value;
      this.authService.login(email, password)
        .subscribe(success => {
          this.token = success.toString();
          this.router.navigate(['/'])
        }, err => {
          this.errorauth = true;
        }
        )
    }
  }
  // funcion para cerrar popup de error al inicio de sesion
  cambiarEstado() {
    this.errorauth = false;
    this.usuario.reset();
  }
}
