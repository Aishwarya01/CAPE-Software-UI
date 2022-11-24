import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './LoginResponse';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  
  apiUrl = environment.apiUrl_v2;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public token: String = '';
  public refToken: String = '';
  public userName: String = '';
  apiUrl_v2 = environment.apiUrl_v2;
  
  
  constructor(private http: HttpClient) {

  }

  public login(email: String, password: String): Observable<any> {
    return this.http.post<any>(this.apiUrl_v2 + '/authenticate', { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(userData.register));
          this.token = userData.token
          this.refToken = userData.refreshToken
          this.userName = email;
          sessionStorage.setItem('token', JSON.stringify(this.token));
          sessionStorage.setItem('refreshToken', JSON.stringify(this.refToken));
          
          return userData;
        }));
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.token = '';
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('expiresAt');
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  retrieveUserInformation(email: String): Observable<any>{
    return this.http.get<User>(this.apiUrl_v2 + '/retrieveUserInformation'+'/' + email, { responseType: 'text' as 'json' } )
  }

  public refreshTokenF() {
    let refreshToken = this.refToken;
    let username = this.userName;
    return this.http.post<LoginResponse>(this.apiUrl_v2 + '/refreshToken', { refreshToken, username })
      .pipe(tap(data => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expiresAt');

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('expiresAt', data.expiresAt);
        this.token = data.token;
        return data;
      }));
}



}