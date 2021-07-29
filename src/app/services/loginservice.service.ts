import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  TOKEN_KEY = 'auth-token';
  public token: String = '';

  constructor(private http: HttpClient,
    private router: Router,) {

  }

  public login(email: String, password: String): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/authenticate', { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(userData.users));
          localStorage.setItem('currentUser', JSON.stringify(userData.users));

          this.token = userData.token
          return userData;
        }));
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TOKEN_KEY, token);

  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.TOKEN_KEY);
    // localStorage.removeItem('rememberMe');

    this.token = '';
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
    return this.http.get<User>(this.apiUrl + '/retrieveUserInformation'+'/' + email, { responseType: 'text' as 'json' } )
  }

  // autoLogin() {
  //   const accessTokenObj = localStorage.getItem(this.TOKEN_KEY);
  //   const rememberMe = localStorage.getItem('rememberMe');
    
  //   console.log(accessTokenObj);
  //    if(accessTokenObj && rememberMe == 'Yes') {
  //     this.router.navigate(['/home']);
  //   }
  // }
} 