import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor ( private http: HttpClient) { }
  
  login (email: String ,password: String) {
    return this.http.post<any>(`/loginsuccess`, { email: email, password: password })
    .pipe(map(email => {
        if (email && email.token) {
            localStorage.setItem('currentUser', JSON.stringify(email));
        }

        return email;
    }));
}
  }



