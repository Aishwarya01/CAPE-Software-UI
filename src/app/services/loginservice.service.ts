import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public token: String = '';
  apiUrl_v2 = environment.apiUrl_v2;

  constructor(private http: HttpClient) {

  }

  public login(email: String, password: String): Observable<any> {
    return this.http.post<any>(this.apiUrl_v2 + '/authenticate', { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(userData.users));
          this.token = userData.token
          return userData;
        }));
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
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
}