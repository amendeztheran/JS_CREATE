import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable para nombre en el inicio de sesion
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private idUser: string = '';
  private username: string = '';
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  constructor() {
    this.obtenerUsuario();
  }
  login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    const urlLogin = `${this.baseUrl}/api/auth/login`;
    const user = { email, password };
    const body = { user };
    return this.http.post<LoginResponse>(urlLogin, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', JSON.stringify(user));
          this.isLoggedInSubject.next(true);
          this.obtenerUsuario();
        }),
        map(() => true)
      )
  };
  obtenerUsuario() {
    if (localStorage.length === 0) {
      this.username = '';
      this.idUser= '';
      this.isLoggedInSubject.next(false)
    } else {
      let usuario = localStorage.getItem('usuario')
      if (usuario !== null) {
        this.isLoggedInSubject.next(true)
        let usuariojson = JSON.parse(usuario);
        this.username = usuariojson.name;
        this.idUser = usuariojson.id_user;
      } else {
        this.username = '';
      }
    }
  }

  Logout() {
    // logica cerrar sesion
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }
  get getUsername() {
    return this.username;
  }

  getUserId(){
    return this.idUser;
  }

  register(user: User): Observable<User> {
    const urlRegister = `${this.baseUrl}/api/auth/register`;
    const body = { user };
    return this.http.post<User>(urlRegister, body)
      .pipe(
        map(() => user),
      )
  }
}
