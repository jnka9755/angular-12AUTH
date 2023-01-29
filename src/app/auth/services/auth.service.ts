import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthResponse, User, UserRequest } from '../interfaces/auth-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }


  login(email: string, password: string){
    
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    
    return this.http.post<AuthResponse>( url, body ).pipe(
      tap( ({ok, token}) => {
        if(ok)
          sessionStorage.setItem('TKN', token!);
      }),
      map( valid  => valid.ok),
      catchError( ex => of (ex.error.msg))
    );
    
  }

  validateToken(): Observable<boolean> {
    
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', sessionStorage.getItem('TKN') || '');

    return this.http.get<AuthResponse>(url , { headers }).pipe(
      map( response => {
        sessionStorage.setItem('TKN', response.token!);
        this._user = {
          name: response.name!,
          uid: response.uid!,
          email: response.email!
        }
        return response.ok
      }),
      catchError(ex => of(false))
    );
  }

  logout() {
    sessionStorage.removeItem('TKN');
  }

  createUser(user: UserRequest) {

    const url = `${this.baseUrl}/auth/create-user`;
    
    return this.http.post<AuthResponse>( url, user ).pipe(
      tap( ({ok, token }) => {
        if( ok)
          sessionStorage.setItem('TKN', token!);
      }),
      map( valid  => valid.ok),
      catchError( ex => of (ex.error.msg))
    );
  }
}
