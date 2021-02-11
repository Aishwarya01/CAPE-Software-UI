import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  apiUrl = environment.apiUrl
  constructor ( private http: HttpClient) { }
  
  public login(user :User): Observable<any> {
    return this.http.post<any>('apiUrl/autheticate', user)
  }
}