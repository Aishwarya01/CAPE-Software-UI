import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { LoginResponse } from './LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginBuyMeterService {

  apiurl=environment.apiUrl_Payment;
  public token: string = '';
  public refToken: string = '';
  public userName: String = '';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  apiUrl_v2 = environment.apiUrl_v2;


  constructor(private http: HttpClient) { }

  public Signin(email: String, password: String): Observable<any> {
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

  Signout(){
    let refreshToken = this.refToken;
    let username = this.userName;
    this.http.post<any>(this.apiurl + '/logout', { refreshToken,username },{ responseType: 'text' as 'json' })
    .subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    })
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.token = '';
    // localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    // sessionStorage.removeItem('expiresAt');
  }

  isUserLoggedInBuyMeter() {
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


  forgetPassword(email: string): Observable<any>{
   return this.http.get<any>(this.apiUrl_v2 + '/forgotPassword'+'/' + email,{ responseType: 'text' as 'json' })
  }

    changePassword(authenticationRequest : any): Observable<any>{
      return this.http.put<any>(this.apiurl +'/createPassword',authenticationRequest,{responseType: 'text' as 'json' })
    }

     changePasswordProfile(authenticationRequest : any){
      return this.http.put<any>(this.apiurl + '/changePassword',authenticationRequest, { responseType: 'text' as 'json' })
    }
}
