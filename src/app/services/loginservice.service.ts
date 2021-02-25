import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


const httpoption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public login(userName: String, password: String): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/authenticate', { userName, password }, httpoption)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
  }
}