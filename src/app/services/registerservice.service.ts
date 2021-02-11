import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  constructor ( private http: HttpClient) { }
  
  public  register (user :User): Observable<any> {
    return this.http.post<any>("https://localhost:8080/register", user)
  }
}
