import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor ( private http: HttpClient) { }
  
  login (username: String ,password: String) {
    return this.http.post<any>(`/loginsuccess`, { username: username, password: password })
    .pipe(map(user => {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
    }));
}
  }



